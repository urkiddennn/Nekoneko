import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        email: v.string(),
        password: v.string(),
        name: v.string(),
    }).index("by_email", ["email"]),

    projects: defineTable({
        userId: v.id("users"),
        name: v.string(),
        slug: v.string(),
        site_settings: v.any(),
        sections: v.array(v.any()),
    }).index("by_slug", ["slug"]).index("by_user", ["userId"]),

    analytics: defineTable({
        projectId: v.id("projects"),
        type: v.string(),
        timestamp: v.number(),
    }).index("by_project", ["projectId"]),
});
