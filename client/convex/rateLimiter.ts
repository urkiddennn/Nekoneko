import { RateLimiter, MINUTE, HOUR } from "@convex-dev/rate-limiter";
import { components } from "./_generated/api";

export const rateLimiter = new RateLimiter(components.rateLimiter, {
  // Tightened signup rate limit to prevent spam
  signup: {
    kind: "fixed window",
    rate: 3,
    period: 10 * MINUTE,
  },
  // Failed logins with stricter limits
  failedLogins: {
    kind: "token bucket",
    rate: 5,
    period: HOUR,
    capacity: 5,
  },
});
