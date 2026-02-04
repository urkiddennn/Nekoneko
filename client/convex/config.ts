import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getProject = query({
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
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
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("projects")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .collect();
    },
});

export const createProject = mutation({
    args: {
        userId: v.id("users"),
        name: v.string(),
        slug: v.string(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("projects")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
        if (existing) throw new Error("Slug already taken");

        return await ctx.db.insert("projects", {
            userId: args.userId,
            name: args.name,
            slug: args.slug,
            site_settings: { name: args.name, theme: { primary: "#6366f1" } },
            sections: [],
        });
    },
});

export const saveProjectConfig = mutation({
    args: {
        projectId: v.id("projects"),
        site_settings: v.any(),
        sections: v.array(v.any()),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.projectId, {
            site_settings: args.site_settings,
            sections: args.sections,
        });
    },
});
