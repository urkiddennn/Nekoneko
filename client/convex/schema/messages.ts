import { defineTable } from "convex/server";
import { v } from "convex/values";

export const messages = defineTable({
    projectId: v.id("projects"),
    senderEmail: v.string(),
    content: v.string(),
    timestamp: v.number(),
    status: v.union(v.literal("unread"), v.literal("read")),
    type: v.optional(v.union(v.literal("subscription"), v.literal("contact"))),
    archived: v.optional(v.boolean()),
}).index("by_project", ["projectId"]);
