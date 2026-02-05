/**
 * Centralized authentication utilities for secure token and user management
 */

const TOKEN_KEY = 'neko_token';
const USER_KEY = 'neko_user';

export interface User {
    _id: string;
    email: string;
    name: string;
}

export interface AuthData {
    token: string;
    user: User;
}

/**
 * Securely store authentication data
 */
export function setAuthData(data: AuthData): void {
    try {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    } catch (error) {
        console.error('Failed to store auth data:', error);
        throw new Error('Unable to save authentication data');
    }
}

/**
 * Retrieve stored token
 */
export function getToken(): string | null {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
        console.error('Failed to retrieve token:', error);
        return null;
    }
}

/**
 * Retrieve stored user data
 */
export function getUser(): User | null {
    try {
        const userStr = localStorage.getItem(USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
        console.error('Failed to retrieve user data:', error);
        return null;
    }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    const token = getToken();
    const user = getUser();

    if (!token || !user) {
        return false;
    }

    // Check if token is expired
    if (isTokenExpired(token)) {
        clearAuthData();
        return false;
    }

    return true;
}

/**
 * Decode JWT token and check expiration
 */
export function isTokenExpired(token: string): boolean {
    try {
        const payload = parseJwt(token);
        if (!payload.exp) {
            return false; // No expiration set
        }

        const now = Math.floor(Date.now() / 1000);
        return payload.exp < now;
    } catch (error) {
        console.error('Failed to parse token:', error);
        return true; // Treat invalid tokens as expired
    }
}

/**
 * Parse JWT token (client-side only, for expiration check)
 */
function parseJwt(token: string): any {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        throw new Error('Invalid token format');
    }
}

/**
 * Get time until token expires (in seconds)
 */
export function getTokenExpiresIn(token: string): number | null {
    try {
        const payload = parseJwt(token);
        if (!payload.exp) {
            return null;
        }

        const now = Math.floor(Date.now() / 1000);
        return Math.max(0, payload.exp - now);
    } catch (error) {
        return null;
    }
}

/**
 * Centralized logout function - ensures complete session cleanup
 */
export function clearAuthData(): void {
    try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    } catch (error) {
        console.error('Failed to clear auth data:', error);
    }
}

/**
 * Logout and redirect to login page
 */
export function logout(navigate: (path: string) => void): void {
    clearAuthData();
    navigate('/login');
}
