import { defineTable } from "convex/server";
import { v } from "convex/values";

export const analytics = defineTable({
    projectId: v.id("projects"),
    type: v.string(),
    timestamp: v.number(),
}).index("by_project", ["projectId"]);
