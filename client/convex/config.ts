import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { verifyUser } from "./utils";

export const getProject = query({
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const checkSlugAvailable = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        if (!args.slug) return true;
        const existing = await ctx.db
            .query("projects")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
        return existing === null;
    },
});

export const getProjectBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("projects")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
    },
});

export const listProjects = query({
    args: { token: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const userId = await verifyUser(ctx, args.token);
        return await ctx.db
            .query("projects")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .collect();
    },
});

export const createProject = mutation({
    args: {
        token: v.optional(v.string()),
        name: v.string(),
        slug: v.string(),
        site_settings: v.optional(v.any()),
        sections: v.optional(v.array(v.any())),
    },
    handler: async (ctx, args) => {
        const userId = await verifyUser(ctx, args.token);

        const existing = await ctx.db
            .query("projects")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
        if (existing) throw new Error("Slug already taken");

        return await ctx.db.insert("projects", {
            userId,
            name: args.name,
            slug: args.slug,
            site_settings: args.site_settings ?? { name: args.name, theme: { primary: "#6366f1" } },
            sections: args.sections ?? [],
        });
    },
});

export const saveProjectConfig = mutation({
    args: {
        token: v.optional(v.string()),
        projectId: v.id("projects"),
        site_settings: v.any(),
        sections: v.array(v.any()),
    },
    handler: async (ctx, args) => {
        const userId = await verifyUser(ctx, args.token);
        const project = await ctx.db.get(args.projectId);

        if (!project || project.userId !== userId) {
            throw new Error("Unauthorized: You do not own this project");
        }

        await ctx.db.patch(args.projectId, {
            site_settings: args.site_settings,
            sections: args.sections,
        });
    },
});

export const deleteProject = mutation({
    args: {
        token: v.optional(v.string()),
        id: v.id("projects")
    },
    handler: async (ctx, args) => {
        const userId = await verifyUser(ctx, args.token);
        const project = await ctx.db.get(args.id);

        if (!project || project.userId !== userId) {
            throw new Error("Unauthorized: You do not own this project");
        }

        await ctx.db.delete(args.id);
    },
});
