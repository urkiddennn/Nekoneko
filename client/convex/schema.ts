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
        site_settings: v.object({
            name: v.string(),
            theme: v.object({
                primary: v.string(),
                secondary: v.optional(v.string()),
                background: v.optional(v.string()),
                text: v.optional(v.string()),
                darkMode: v.optional(v.boolean()),
                font: v.optional(v.string()),
                showThemeToggle: v.optional(v.boolean()),
            }),
            appearance: v.optional(v.any()),
            logo: v.optional(v.string()),
            favicon: v.optional(v.string()),
            layout: v.optional(v.object({
                padding: v.optional(v.string()),
                paddingTop: v.optional(v.string()),
                paddingBottom: v.optional(v.string()),
                paddingLeft: v.optional(v.string()),
                paddingRight: v.optional(v.string()),
                margin: v.optional(v.string()),
                marginTop: v.optional(v.string()),
                marginBottom: v.optional(v.string()),
                marginLeft: v.optional(v.string()),
                marginRight: v.optional(v.string()),
            })),
            seo: v.optional(v.object({
                title: v.optional(v.string()),
                description: v.optional(v.string()),
            })),
        }),
        sections: v.array(v.object({
            id: v.string(),
            type: v.string(),
            props: v.any(), // Component-specific props
            styles: v.optional(v.any()),
            order: v.optional(v.number()),
        })),
    }).index("by_slug", ["slug"]).index("by_user", ["userId"]),

    analytics: defineTable({
        projectId: v.id("projects"),
        type: v.string(),
        timestamp: v.number(),
    }).index("by_project", ["projectId"]),
});
