import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { rateLimiter } from "./rateLimiter";

export const signup = mutation({
    args: { email: v.string(), password: v.string(), name: v.string() },
    handler: async (ctx, args) => {
        await rateLimiter.limit(ctx, "signup", { key: args.email });

        const existing = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();
        if (existing) throw new Error("User already exists");
        return await ctx.db.insert("users", {
            email: args.email,
            password: args.password,
            name: args.name,
        });
    },
});

export const login = mutation({
    args: { email: v.string(), password: v.string() },
    handler: async (ctx, args) => {
        await rateLimiter.limit(ctx, "failedLogins", { key: args.email });

        const user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();
        if (!user || user.password !== args.password) {
            throw new Error("Invalid credentials");
        }
        return user;
    },
});

