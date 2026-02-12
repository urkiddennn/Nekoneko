import { defineTable } from "convex/server";
import { v } from "convex/values";
// If the user is not yet verified, it will make a cron job that will delete the unverified_users
export const unverified_users = defineTable({
  email: v.string(),
  name: v.string(),
  password: v.string(),
  otp: v.string(),
  otpExpires: v.number(),
})
  .index("by_email", ["email"])
  .index("by_otp_expires", ["otpExpires"]);
