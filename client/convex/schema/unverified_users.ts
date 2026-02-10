import { defineTable } from "convex/server";
import { v } from "convex/values";

export const unverified_users = defineTable({
    email: v.string(),
    name: v.string(),
    password: v.string(),
    otp: v.string(),
    otpExpires: v.number(),
}).index("by_email", ["email"]).index("by_otp_expires", ["otpExpires"]);
