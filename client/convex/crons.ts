import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();
// This act as cron jobs for deleting unverified users
crons.interval(
  "cleanup unverified users",
  { hours: 1 },
  internal.auth.cleanupUnverifiedUsers,
);

export default crons;
