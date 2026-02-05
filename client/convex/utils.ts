import { jwtVerify } from "jose";

// Enforce JWT_SECRET in all environments - no weak defaults
if (!process.env.JWT_SECRET) {
    throw new Error("CRITICAL: JWT_SECRET environment variable must be set!");
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifyUser(token: string | undefined) {
    if (!token) throw new Error("Authentication required");
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload.userId as any;
    } catch (e) {
        throw new Error("Invalid or expired session");
    }
}

export function getJwtSecret() {
    return JWT_SECRET;
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
    if (password.length < 8) {
        return { valid: false, error: "Password must be at least 8 characters long" };
    }
    if (!/[A-Z]/.test(password)) {
        return { valid: false, error: "Password must contain at least one uppercase letter" };
    }
    if (!/[a-z]/.test(password)) {
        return { valid: false, error: "Password must contain at least one lowercase letter" };
    }
    if (!/[0-9]/.test(password)) {
        return { valid: false, error: "Password must contain at least one number" };
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return { valid: false, error: "Password must contain at least one special character" };
    }
    return { valid: true };
}

export function validateEmail(email: string): { valid: boolean; error?: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, error: "Invalid email format" };
    }
    return { valid: true };
}
