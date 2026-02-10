import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { verifyUser } from "./auth";

export const sendFeedback = mutation({
    args: {
        token: v.optional(v.string()),
        message: v.string(),
        type: v.union(v.literal("problem"), v.literal("rating")),
        rating: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const userId = await verifyUser(ctx, args.token);

        if (args.message.trim().length === 0) {
            throw new Error("Feedback message cannot be empty");
        }

        if (args.type === "rating" && (args.rating === undefined || args.rating < 1 || args.rating > 5)) {
            throw new Error("Rating is required and must be between 1 and 5 for rating feedback");
        }

        return await ctx.db.insert("feedback", {
            userId,
            message: args.message,
            type: args.type,
            rating: args.rating,
            timestamp: Date.now(),
        });
    },
});
