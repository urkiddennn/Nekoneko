import { RateLimiter, MINUTE, HOUR } from "@convex-dev/rate-limiter";
import { components } from "./_generated/api";

export const rateLimiter = new RateLimiter(components.rateLimiter, {
    // One global / singleton rate limit for signups
    signup: { kind: "fixed window", rate: 5, period: 5 * MINUTE },
    // Failed logins attempt limit
    failedLogins: { kind: "token bucket", rate: 5, period: HOUR, capacity: 5 },
});
