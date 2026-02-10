import { defineTable } from "convex/server";
import { v } from "convex/values";

export const feedback = defineTable({
    userId: v.id("users"),
    message: v.string(),
    type: v.union(v.literal("problem"), v.literal("rating"), v.literal("suggestion")),
    rating: v.optional(v.number()),
    timestamp: v.number(),
}).index("by_user", ["userId"]);
