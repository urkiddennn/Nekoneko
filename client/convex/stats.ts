import { query } from "./_generated/server";
import { v } from "convex/values";
import { verifyUser } from "./auth";

export const getUserStats = query({
    args: { token: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const userId = await verifyUser(ctx, args.token);

        // 1. Calculate Storage Usage
        const assets = await ctx.db
            .query("assets")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .collect();
        const totalStorageBytes = assets.reduce((sum, asset) => sum + asset.size, 0);

        // 2. Count Analytics Events
        const projects = await ctx.db
            .query("projects")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .collect();

        let totalAnalyticsCount = 0;
        for (const project of projects) {
            const count = await ctx.db
                .query("analytics")
                .withIndex("by_project", (q) => q.eq("projectId", project._id))
                .collect();
            totalAnalyticsCount += count.length;
        }

        return {
            storage: {
                used: totalStorageBytes,
                limit: 40 * 1024 * 1024, // 40MB in bytes
            },
            analytics: {
                used: totalAnalyticsCount,
                limit: 10000, // 10K
            },
            siteEngine: {
                used: 27000, // Simulated
                limit: 1000000, // 1M
            }
        };
    },
});
