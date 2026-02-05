import { v } from "convex/values";

/**
 * Strict schema definitions for site settings
 */
export const themeSchema = v.object({
    primary: v.string(),
    secondary: v.optional(v.string()),
    background: v.optional(v.string()),
    text: v.optional(v.string()),
    darkMode: v.optional(v.boolean()),
    font: v.optional(v.string()),
    showThemeToggle: v.optional(v.boolean()),
});

export const appearanceSchema = v.object({
    padding: v.optional(v.object({
        top: v.optional(v.string()),
        bottom: v.optional(v.string()),
        left: v.optional(v.string()),
        right: v.optional(v.string()),
    })),
    margin: v.optional(v.object({
        top: v.optional(v.string()),
        bottom: v.optional(v.string()),
        left: v.optional(v.string()),
        right: v.optional(v.string()),
    })),
    backgroundColor: v.optional(v.string()),
    textColor: v.optional(v.string()),
});

export const siteSettingsSchema = v.object({
    name: v.string(),
    theme: themeSchema,
    appearance: v.optional(appearanceSchema),
    logo: v.optional(v.string()),
    favicon: v.optional(v.string()),
    layout: v.optional(v.object({
        padding: v.optional(v.string()),
        paddingTop: v.optional(v.string()),
        paddingBottom: v.optional(v.string()),
        paddingLeft: v.optional(v.string()),
        paddingRight: v.optional(v.string()),
        margin: v.optional(v.string()),
        marginTop: v.optional(v.string()),
        marginBottom: v.optional(v.string()),
        marginLeft: v.optional(v.string()),
        marginRight: v.optional(v.string()),
    })),
    seo: v.optional(v.object({
        title: v.optional(v.string()),
        description: v.optional(v.string()),
    })),
});

/**
 * Schema for individual section components
 */
export const sectionSchema = v.object({
    id: v.string(),
    type: v.string(),
    props: v.any(), // Component-specific props - could be further refined per component type
    order: v.optional(v.number()),
});

/**
 * Validation helpers
 */
export function validateSiteSettings(settings: any): boolean {
    if (!settings || typeof settings !== 'object') return false;
    if (!settings.name || typeof settings.name !== 'string') return false;
    if (!settings.theme || typeof settings.theme !== 'object') return false;
    if (!settings.theme.primary || typeof settings.theme.primary !== 'string') return false;
    return true;
}

export function validateSection(section: any): boolean {
    if (!section || typeof section !== 'object') return false;
    if (!section.id || typeof section.id !== 'string') return false;
    if (!section.type || typeof section.type !== 'string') return false;
    if (!section.props || typeof section.props !== 'object') return false;
    return true;
}

/**
 * Sanitization helpers
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
    if (typeof input !== 'string') return '';
    return input.slice(0, maxLength).trim();
}

export function sanitizeUrl(url: string): string {
    if (typeof url !== 'string') return '';
    // Basic URL validation - only allow http/https
    try {
        const parsed = new URL(url);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            return '';
        }
        return url;
    } catch {
        return '';
    }
}

export function sanitizeHexColor(color: string): string {
    if (typeof color !== 'string') return '#000000';
    // Validate hex color format
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(color) ? color : '#000000';
}
