import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Mutation to handle newsletter subscriptions.
 * Also records the subscription as a message for the user.
 */
export const subscribeNow = mutation({
  args: {
    projectId: v.id("projects"),
    subscriberEmail: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.subscriberEmail.includes("@")) {
      throw new Error("Invalid email address");
    }

    const timestamp = Date.now();

    // 1. Record the subscription
    await ctx.db.insert("subscribe", {
      projectId: args.projectId,
      subscriberEmail: args.subscriberEmail,
      timestamp,
      newLetterSend: true,
    });

    // 2. Also record it as a message so it appears in the user's "messages" interface
    await ctx.db.insert("messages", {
      projectId: args.projectId,
      senderEmail: args.subscriberEmail,
      content: `New subscription request from: ${args.subscriberEmail}`,
      timestamp,
      status: "unread",
      type: "subscription",
    });

    return { success: true };
  },
});

export const getSubscriberCount = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    // Count how many entries in 'subscribe' table for this project
    const count = await ctx.db
      .query("subscribe")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();

    return count.length;
  },
});

