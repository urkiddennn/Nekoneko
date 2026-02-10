import { defineTable } from "convex/server";
import { v } from "convex/values";

export const messages = defineTable({
    projectId: v.id("projects"),
    senderEmail: v.string(),
    content: v.string(),
    timestamp: v.number(),
    status: v.union(v.literal("unread"), v.literal("read")),
    archived: v.optional(v.boolean()),
}).index("by_project", ["projectId"]);
