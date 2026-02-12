import { v } from "convex/values";
import { defineTable } from "convex/server";

export const assets = defineTable({
    userId: v.id("users"),
    storageId: v.id("_storage"),
    name: v.string(),
    type: v.string(),
    size: v.number(),
}).index("by_user", ["userId"]);
