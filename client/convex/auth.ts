// auth.ts

import {
  action,
  internalMutation,
  internalQuery,
  query,
} from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { rateLimiter } from "./rateLimiter";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { getJwtSecret, validatePassword, validateEmail } from "./utils";
import { jwtVerify } from "jose";
import { resend } from "./resend";

import GitHub from "@auth/core/providers/github";
import { Email } from "@convex-dev/auth/providers/Email";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

const JWT_SECRET = getJwtSecret();

// 1. Initialize Auth
export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || process.env.AUTH_CLIENT_ID,
      clientSecret:
        process.env.AUTH_GITHUB_SECRET || process.env.AUTH_CLIENT_SECRET,
      authorization: { params: { prompt: "select_account" } },
    }),
    Email({
      id: "resend",
      // @ts-ignore
      async sendVerificationRequest({ identifier: to, token: code }: any, ctx: any) {
        // Log ctx to confirm it has runMutation
        // console.log("sendVerificationRequest ctx keys:", ctx ? Object.keys(ctx) : "ctx is null");
        await resend.sendEmail(ctx, {
          to,
          subject: "Verification Code",
          html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
      <h2 style="color: #333; text-align: center;">Verify your account</h2>
      <p style="color: #666; font-size: 16px; line-height: 1.5;">
        Thanks for joining <strong>NekoNeko</strong>! Please use the following code to complete your verification:
      </p>
      <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #000;">${code}</span>
      </div>
      <p style="color: #999; font-size: 12px; text-align: center;">
        This code will expire in 10 minutes. If you didn't request this, you can safely ignore this email.
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="color: #aaa; font-size: 11px; text-align: center;">
        &copy; 2026 NekoNeko Space
      </p>
    </div>
  `,
          from: "verification@mail.nekoneko.space",
        });
      },
      // Generate a 6-digit numeric code
      generateVerificationToken: async () => {
        const buffer = new Uint32Array(1);
        crypto.getRandomValues(buffer);
        return (buffer[0] % 900000 + 100000).toString();
      },
      // Keep profile callback for existing email flow if needed, but signup uses custom flow now
      async profile(params: any) {
        return {
          email: params.email as string,
          name: params.name as string,
          password: params.password ? await bcrypt.hash(params.password as string, 10) : undefined,
        };
      },
    }),
    // Use bcrypt for Password provider
    Password({
      id: "password",
      profile(params: any) {
        return {
          email: params.email as string,
          name: params.name as string,
        };
      },
      // @ts-ignore
      crypto: {
        hashSecret: async (password: string) => bcrypt.hashSync(password, 10),
        verifySecret: async (password: string, hash: string) => bcrypt.compareSync(password, hash),
      },
      // Email verification is handled manually in signup action
    }),
  ],
});

// 2. Custom Auth Actions
export const signup: ReturnType<typeof action> = action({
  args: { email: v.string(), password: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "signup", { key: args.email });

    const normalizedEmail = args.email.trim().toLowerCase();

    // Validate email format
    const emailValidation = validateEmail(normalizedEmail);
    if (!emailValidation.valid) {
      throw new Error(emailValidation.error);
    }

    // Validate password strength
    const passwordValidation = validatePassword(args.password);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.error);
    }

    const existing = await ctx.runQuery(internal.auth.getUserByEmail, {
      email: normalizedEmail,
    });
    if (existing)
      throw new Error("Unable to create account. Please try a different email.");

    const hashedPassword = await bcrypt.hash(args.password, 10);
    const buffer = new Uint32Array(1);
    crypto.getRandomValues(buffer);
    const otp = (buffer[0] % 900000 + 100000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await ctx.runMutation(internal.auth.createUnverifiedUser, {
      email: normalizedEmail,
      name: args.name,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await resend.sendEmail(ctx, {
      to: normalizedEmail,
      subject: "Verification Code",
      html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
  <h2 style="color: #333; text-align: center;">Verify your account</h2>
  <p style="color: #666; font-size: 16px; line-height: 1.5;">
    Thanks for joining <strong>NekoNeko</strong>! Please use the following code to complete your verification:
  </p>
  <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
    <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #000;">${otp}</span>
  </div>
  <p style="color: #999; font-size: 12px; text-align: center;">
    This code will expire in 10 minutes. If you didn't request this, you can safely ignore this email.
  </p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
  <p style="color: #aaa; font-size: 11px; text-align: center;">
    &copy; 2026 NekoNeko Space
  </p>
</div>
`,
      from: "verification@mail.nekoneko.space",
    });

    return { success: true };
  },
});

export const verifySignup: ReturnType<typeof action> = action({
  args: { email: v.string(), otp: v.string() },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    const result = await ctx.runMutation(internal.auth.confirmSignup, {
      email,
      otp: args.otp
    });
    return { userId: result };
  }
});

export const login: ReturnType<typeof action> = action({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "failedLogins", { key: args.email });

    const user = await ctx.runQuery(internal.auth.getUserByEmail, {
      email: args.email,
    });

    // Timing attack mitigation: always compare password
    const dummyHash = "$2a$10$abcdefghijklmnopqrstuvwxyz0123456789"; // Invalid dummy hash
    const hashToCompare = user?.password || dummyHash;

    const isValid = await bcrypt.compare(args.password, hashToCompare);

    if (!user || !user.password || !isValid) throw new Error("Invalid credentials");

    const token = await new SignJWT({ userId: user._id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(JWT_SECRET);

    return {
      token,
      user: { _id: user._id, email: user.email, name: user.name },
    };
  },
});

// 3. User Management
export const getUserByEmail = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const getUserById = internalQuery({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createUnverifiedUser = internalMutation({
  args: { email: v.string(), name: v.string(), password: v.string(), otp: v.string(), otpExpires: v.number() },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("unverified_users").withIndex("by_email", q => q.eq("email", args.email)).first();
    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        password: args.password,
        otp: args.otp,
        otpExpires: args.otpExpires
      });
      return existing._id;
    }
    return await ctx.db.insert("unverified_users", args);
  }
});

export const confirmSignup = internalMutation({
  args: { email: v.string(), otp: v.string() },
  handler: async (ctx, args) => {
    const unverified = await ctx.db.query("unverified_users").withIndex("by_email", q => q.eq("email", args.email)).first();
    if (!unverified) throw new Error("Invalid email or expired request");

    if (unverified.otp !== args.otp) throw new Error("Invalid verification code");
    if (Date.now() > unverified.otpExpires) throw new Error("Verification code expired");

    // Create user in main table
    const newUserId = await ctx.db.insert("users", {
      email: unverified.email,
      name: unverified.name,
      password: unverified.password,
      // Initialize other fields as needed by your schema/library defaults?
      emailVerificationTime: Date.now(),
    });

    // Create account in authAccounts for Convex Auth
    await ctx.db.insert("authAccounts", {
      provider: "password",
      providerAccountId: unverified.email,
      userId: newUserId,
      secret: unverified.password,
    });

    // Delete unverified record
    await ctx.db.delete(unverified._id);

    return newUserId;
  }
});


export const updateUserInternal = internalMutation({
  args: { userId: v.id("users"), name: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      name: args.name,
    });
  },
});

export const updateUser: ReturnType<typeof action> = action({
  args: { token: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    const userId = await verifyUser(ctx, args.token);
    if (!userId) throw new Error("Unauthorized");

    await ctx.runMutation(internal.auth.updateUserInternal, {
      userId,
      name: args.name,
    });

    const user = await ctx.runQuery(internal.auth.getUserById, { id: userId });
    if (!user) throw new Error("User not found");

    return {
      _id: user._id,
      email: user.email,
      name: user.name,
    };
  },
});

export async function verifyUser(
  ctx: any,
  token: string | undefined,
): Promise<any> {
  const userId = await auth.getUserId(ctx);
  if (userId !== null) {
    return userId;
  }

  if (!token || token === "skip") throw new Error("Authentication required");
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.userId as any;
  } catch (e) {
    throw new Error("Invalid or expired session");
  }
}

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const cleanupUnverifiedUsers = internalMutation({
  args: {},
  handler: async (ctx) => {
    const expired = await ctx.db
      .query("unverified_users")
      .withIndex("by_otp_expires", (q) => q.lt("otpExpires", Date.now()))
      .collect();

    for (const record of expired) {
      await ctx.db.delete(record._id);
    }
  },
});
