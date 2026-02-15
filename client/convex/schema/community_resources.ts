import { defineTable } from "convex/server";
import { v } from "convex/values";

export const community_resources = defineTable({
    authorId: v.id("users"),
    authorName: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    componentType: v.string(),
    sectionConfig: v.object({
        id: v.string(),
        type: v.string(),
        props: v.any(),
        styles: v.optional(v.any()),
        order: v.optional(v.number()),
    }),
    tags: v.optional(v.array(v.string())),
    likes: v.number(),
    downloads: v.number(),
    createdAt: v.number(),
}).index("by_author", ["authorId"])
    .index("by_type", ["componentType"])
    .index("by_created", ["createdAt"]);
