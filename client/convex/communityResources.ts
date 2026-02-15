import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { verifyUser } from "./auth";

/**
 * Publish a section to the community marketplace.
 */
export const publish = mutation({
    args: {
        token: v.optional(v.string()),
        title: v.string(),
        description: v.optional(v.string()),
        componentType: v.string(),
        sectionConfig: v.object({
            id: v.string(),
            type: v.string(),
            props: v.any(),
            styles: v.optional(v.any()),
            order: v.optional(v.number()),
        }),
        tags: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        const userId = await verifyUser(ctx, args.token);

        if (!args.title || args.title.trim().length === 0) {
            throw new Error("Title is required");
        }
        if (args.title.trim().length > 100) {
            throw new Error("Title must be 100 characters or less");
        }

        // Get the author's name from users table
        const user = await ctx.db.get(userId) as any;
        const authorName = user?.name || user?.email || "Anonymous";

        return await ctx.db.insert("community_resources", {
            authorId: userId,
            authorName,
            title: args.title.trim(),
            description: args.description?.trim() || undefined,
            componentType: args.componentType,
            sectionConfig: args.sectionConfig,
            tags: args.tags,
            likes: 0,
            downloads: 0,
            createdAt: Date.now(),
        });
    },
});

/**
 * List community resources, optionally filtered by component type.
 */
export const list = query({
    args: {
        componentType: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        if (args.componentType) {
            return await ctx.db
                .query("community_resources")
                .withIndex("by_type", (q) => q.eq("componentType", args.componentType!))
                .order("desc")
                .collect();
        }
        return await ctx.db
            .query("community_resources")
            .withIndex("by_created")
            .order("desc")
            .collect();
    },
});

/**
 * Like a community resource.
 */
export const like = mutation({
    args: {
        token: v.optional(v.string()),
        resourceId: v.id("community_resources"),
    },
    handler: async (ctx, args) => {
        await verifyUser(ctx, args.token);

        const resource = await ctx.db.get(args.resourceId);
        if (!resource) throw new Error("Resource not found");

        await ctx.db.patch(args.resourceId, {
            likes: resource.likes + 1,
        });
    },
});

/**
 * Increment download count when a user imports a section.
 */
export const incrementDownloads = mutation({
    args: {
        token: v.optional(v.string()),
        resourceId: v.id("community_resources"),
    },
    handler: async (ctx, args) => {
        await verifyUser(ctx, args.token);

        const resource = await ctx.db.get(args.resourceId);
        if (!resource) throw new Error("Resource not found");

        await ctx.db.patch(args.resourceId, {
            downloads: resource.downloads + 1,
        });
    },
});

/**
 * Remove a published community resource (author only).
 */
export const remove = mutation({
    args: {
        token: v.optional(v.string()),
        resourceId: v.id("community_resources"),
    },
    handler: async (ctx, args) => {
        const userId = await verifyUser(ctx, args.token);

        const resource = await ctx.db.get(args.resourceId);
        if (!resource) throw new Error("Resource not found");
        if (resource.authorId !== userId) {
            throw new Error("You can only delete your own resources");
        }

        await ctx.db.delete(args.resourceId);
    },
});
