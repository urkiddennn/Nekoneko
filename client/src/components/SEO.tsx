import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogType?: string;
    ogImage?: string;
    twitterHandle?: string;
}

export const SEO = ({
    title,
    description,
    canonical,
    ogType = "website",
    ogImage,
    twitterHandle = "@nekoneko",
}: SEOProps) => {
    const siteTitle = title ? `${title} | Nekoneko` : "Nekoneko - Build and Deploy Premium Websites Instantly";
    const siteDescription = description || "Nekoneko is the ultimate platform for building modern, premium websites with ease.";
    const url = window.location.href;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            {ogImage && <meta property="og:image" content={ogImage} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={siteDescription} />
            {ogImage && <meta name="twitter:image" content={ogImage} />}
            <meta name="twitter:site" content={twitterHandle} />
        </Helmet>
    );
};
