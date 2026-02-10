import { defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export const users = defineTable({
    ...authTables.users.validator.fields,
    password: v.optional(v.string()),
}).index("email", ["email"]);
