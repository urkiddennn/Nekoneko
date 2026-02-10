import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { users } from "./schema/users";
import { projects } from "./schema/projects";
import { analytics } from "./schema/analytics";
import { unverified_users } from "./schema/unverified_users";
import { feedback } from "./schema/feedback";

export default defineSchema({
    ...authTables,
    users,
    projects,
    analytics,
    unverified_users,
    feedback,
});
