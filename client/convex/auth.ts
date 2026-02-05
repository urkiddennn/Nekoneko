import { action, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { rateLimiter } from "./rateLimiter";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { getJwtSecret, validatePassword, validateEmail } from "./utils";

const JWT_SECRET = getJwtSecret();

export const getUserByEmail = internalQuery({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();
    },
});

export const createUser = internalMutation({
    args: { email: v.string(), password: v.string(), name: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.insert("users", {
            email: args.email,
            password: args.password,
            name: args.name,
        });
    },
});

export const signup: ReturnType<typeof action> = action({
    args: { email: v.string(), password: v.string(), name: v.string() },
    handler: async (ctx, args) => {
        await rateLimiter.limit(ctx, "signup", { key: args.email });

        // Validate email format
        const emailValidation = validateEmail(args.email);
        if (!emailValidation.valid) {
            throw new Error(emailValidation.error);
        }

        // Validate password strength
        const passwordValidation = validatePassword(args.password);
        if (!passwordValidation.valid) {
            throw new Error(passwordValidation.error);
        }

        const existing = await ctx.runQuery(internal.auth.getUserByEmail, { email: args.email });
        if (existing) throw new Error("Unable to create account. Please try a different email.");

        const hashedPassword = await bcrypt.hash(args.password, 10);

        const userId = await ctx.runMutation(internal.auth.createUser, {
            email: args.email,
            password: hashedPassword,
            name: args.name,
        });

        const token = await new SignJWT({ userId })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("2h")
            .sign(JWT_SECRET);

        return {
            token,
            user: { _id: userId, email: args.email, name: args.name }
        };
    },
});

export const login: ReturnType<typeof action> = action({
    args: { email: v.string(), password: v.string() },
    handler: async (ctx, args) => {
        await rateLimiter.limit(ctx, "failedLogins", { key: args.email });

        const user = await ctx.runQuery(internal.auth.getUserByEmail, { email: args.email });

        if (!user) throw new Error("Invalid credentials");

        const isValid = await bcrypt.compare(args.password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        const token = await new SignJWT({ userId: user._id })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("2h")
            .sign(JWT_SECRET);

        return {
            token,
            user: { _id: user._id, email: user.email, name: user.name }
        };
    },
});

