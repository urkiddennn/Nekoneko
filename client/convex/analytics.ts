import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { verifyUser } from "./auth";

export const recordView = mutation({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        await ctx.db.insert("analytics", {
            projectId: args.projectId,
            type: "view",
            timestamp: Date.now(),
        });
    },
});

export const getStats = query({
    args: { token: v.optional(v.string()), projectId: v.id("projects") },
    handler: async (ctx, args) => {
        const userId = await verifyUser(ctx, args.token);
        const project = await ctx.db.get(args.projectId);

        if (!project || project.userId !== userId) {
            throw new Error("Unauthorized");
        }
        const now = Date.now();
        const oneDayAgo = now - 24 * 60 * 60 * 1000;
        const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

        const allViews = await ctx.db
            .query("analytics")
            .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
            .collect();

        const last24h = allViews.filter(v => v.timestamp > oneDayAgo).length;
        const last7d = allViews.filter(v => v.timestamp > sevenDaysAgo).length;

        // Use calendar days for a more predictable chart
        const startOfToday = new Date().setHours(0, 0, 0, 0);
        const dayMs = 24 * 60 * 60 * 1000;

        const dailyViews = Array.from({ length: 7 }, (_, i) => {
            const dayStart = startOfToday - (6 - i) * dayMs;
            const dayEnd = dayStart + dayMs;
            // For the last bucket (today), include everything up to now
            const actualEnd = i === 6 ? Date.now() + 1000 : dayEnd;
            return allViews.filter(v => v.timestamp >= dayStart && v.timestamp < actualEnd).length;
        });

        return {
            total: allViews.length,
            last24h,
            last7d,
            dailyViews,
        };
    },
});
