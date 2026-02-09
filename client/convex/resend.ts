import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";

export const resend: Resend = new Resend(components.resend, {
  testMode: false, // Set to false to send to real emails
});
