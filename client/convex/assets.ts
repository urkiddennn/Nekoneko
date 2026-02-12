import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { verifyUser } from "./auth";

export const generateUploadUrl = mutation({
    args: { token: v.optional(v.string()) },
    handler: async (ctx, args) => {
        await verifyUser(ctx, args.token);
        return await ctx.storage.generateUploadUrl();
    },
});

export const saveAsset = mutation({
    args: {
        token: v.optional(v.string()),
        storageId: v.id("_storage"),
        name: v.string(),
        type: v.string(),
        size: v.number(),
    },
    handler: async (ctx, args) => {
        const userId = await verifyUser(ctx, args.token);
        const assetId = await ctx.db.insert("assets", {
            userId,
            storageId: args.storageId,
            name: args.name,
            type: args.type,
            size: args.size,
        });

        const url = await ctx.storage.getUrl(args.storageId);
        return { assetId, url };
    },
});

export const listAssets = query({
    args: { token: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const userId = await verifyUser(ctx, args.token);
        const assets = await ctx.db
            .query("assets")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .order("desc")
            .collect();

        return Promise.all(
            assets.map(async (asset) => ({
                ...asset,
                url: await ctx.storage.getUrl(asset.storageId),
            }))
        );
    },
});

export const deleteAsset = mutation({
    args: {
        token: v.optional(v.string()),
        id: v.id("assets"),
    },
    handler: async (ctx, args) => {
        const userId = await verifyUser(ctx, args.token);
        const asset = await ctx.db.get(args.id);

        if (!asset || asset.userId !== userId) {
            throw new Error("Unauthorized");
        }

        await ctx.storage.delete(asset.storageId);
        await ctx.db.delete(args.id);
    },
});
