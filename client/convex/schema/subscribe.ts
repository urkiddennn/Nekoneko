import { defineTable } from "convex/server";
import { v } from "convex/values";

export const subscribe = defineTable({
    projectId: v.id("projects"),
    subscriberEmail: v.string(),
    timestamp: v.number(),
    newLetterSend: v.optional(v.boolean()),
}).index("by_project", ["projectId", "subscriberEmail"]);
