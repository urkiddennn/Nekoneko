import { z } from 'zod';

export const ThemeSchema = z.object({
    primary: z.string(),
    font: z.string(),
    darkMode: z.boolean(),
});

export const SEOSchema = z.object({
    title: z.string(),
    description: z.string(),
});

export const LayoutSettingsSchema = z.object({
    padding: z.string().optional(),
    margin: z.string().optional(),
});

export const SiteSettingsSchema = z.object({
    name: z.string(),
    favicon: z.string(),
    theme: ThemeSchema,
    layout: LayoutSettingsSchema.optional(),
    seo: SEOSchema,
});

export const StyleSchema = z.object({
    padding: z.string().optional(),
    margin: z.string().optional(),
    backgroundColor: z.string().optional(),
    maxWidth: z.string().optional(),
    borderRadius: z.string().optional(),
    textAlign: z.enum(['left', 'center', 'right']).optional(),
});

export const SectionSchema = z.object({
    id: z.string(),
    type: z.string(),
    props: z.record(z.string(), z.any()),
    styles: StyleSchema.optional(),
});

export const SiteConfigSchema = z.object({
    site_settings: SiteSettingsSchema,
    sections: z.array(SectionSchema),
});

export type SiteSettings = z.infer<typeof SiteSettingsSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
