import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { verifyUser } from "./auth";

/**
 * Mutation for visitors to send messages through the ConnectWithMe component.
 */
export const sendMessage = mutation({
    args: {
        projectId: v.id("projects"),
        senderEmail: v.string(),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        if (!args.senderEmail.includes("@")) {
            throw new Error("Invalid email address");
        }
        if (args.content.trim().length < 5) {
            throw new Error("Message is too short");
        }

        return await ctx.db.insert("messages", {
            projectId: args.projectId,
            senderEmail: args.senderEmail,
            content: args.content,
            timestamp: Date.now(),
            status: "unread",
        });
    },
});

/**
 * Query for site owners to list messages received for their projects.
 */
export const listMessages = query({
    args: {
        token: v.optional(v.string()),
        projectId: v.optional(v.id("projects")),
    },
    handler: async (ctx, args) => {
        const userId = await verifyUser(ctx, args.token);

        // If a specific projectId is provided, verify ownership first
        if (args.projectId) {
            const projectId = args.projectId;
            const project = await ctx.db.get(projectId);
            if (!project || project.userId !== userId) {
                throw new Error("Unauthorized: You do not own this project");
            }
            return await ctx.db
                .query("messages")
                .withIndex("by_project", (q) => q.eq("projectId", projectId))
                .order("desc")
                .collect();
        }

        // Otherwise, fetch all projects for the user and collect messages
        const projects = await ctx.db
            .query("projects")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .collect();

        const projectIds = projects.map((p) => p._id);

        // Convex doesn't support 'in' queries easily yet, so we fetch messages 
        // and filter or do multiple queries. For simplicity and performace 
        // with small numbers of projects, we'll fetch all and filter in memory 
        // or just return all messages for these specific projects.

        // Actually, let's just fetch messages for projects the user owns.
        const allMessages = await ctx.db
            .query("messages")
            .order("desc")
            .collect();

        return allMessages.filter(m => projectIds.includes(m.projectId));
    },
});

export const markAsRead = mutation({
    args: {
        token: v.optional(v.string()),
        messageId: v.id("messages"),
    },
    handler: async (ctx, args) => {
        const userId = await verifyUser(ctx, args.token);
        const message = await ctx.db.get(args.messageId);
        if (!message) throw new Error("Message not found");

        const project = await ctx.db.get(message.projectId);
        if (!project || project.userId !== userId) {
            throw new Error("Unauthorized");
        }

        await ctx.db.patch(args.messageId, { status: "read" });
    },
});
