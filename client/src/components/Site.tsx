import React, { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useSite } from "../context/useSite";
import SectionRenderer from "./SectionRenderer";
import ThemeToggle from "./library/ThemeToggle";
import { SEO } from "./SEO";

const Site: React.FC = () => {
  const { siteConfig, loading, projectId } = useSite();
  /* BENTO DEMO CONFIGURATION */
  const BENTO_DEMO = [
    {
      id: "bento-layout",
      type: "layout",
      props: {
        variant: "bento",
        items: [
          {
            type: "hero",
            props: {
              heading: "ClOura.",
              subheading: "",
              variant: "bento",
              ctaButtons: [
                { label: "Signup", url: "#", variant: "primary" },
                { label: "Documentation", url: "#", variant: "outline" }
              ]
            }
          },
          {
            type: "features",
            props: {
              title: "",
              variant: "bento",
              items: [
                { title: "Fast", description: "At Vercel, we've developed Geist, a typeface specifically designed for developers and designers." },
                { title: "Fast", description: "At Vercel, we've developed Geist, a typeface specifically designed for developers and designers." },
                { title: "Fast", description: "At Vercel, we've developed Geist, a typeface specifically designed for developers and designers." }
              ],
              columns: 3
            }
          },
          {
            type: "integrations",
            props: {
              intro: "ALTERNATIVE TO",
              heading: "You don't need multiple API",
              subheading: "You don't have to reinvent your stack to get great video. We're compatible with your favorite languages and frameworks.",
              accentLabel: "Use on your favorite frameworks",
              variant: "bento",
              items: []
            }
          },
          {
            type: "cta",
            props: {
              title: "",
              buttonText: "START USING OURA NOW",
              variant: "bento"
            }
          },
          {
            type: "footer",
            props: {
              logo: "ClOura.",
              variant: "bento",
              links: [
                { label: "Overview", url: "#" },
                { label: "Specs", url: "#" },
                { label: "Pricing", url: "#" }
              ],
              copyright: "@ 2025"
            }
          }
        ]
      }
    }
  ];
  /* CLOURA DEMO CONFIGURATION */
  const CLOURA_DEMO = [
    {
      id: "cloura-layout",
      type: "layout",
      props: {
        variant: "bento",
        items: [
          {
            type: "navigation",
            props: {
              variant: "bento",
              links: [
                { label: "Features", url: "#features" },
                { label: "Network", url: "#network" },
                { label: "Pricing", url: "#pricing" },
                { label: "Docs", url: "#docs" }
              ],
              showResumeButton: true,
              styles: {
                buttonBackgroundColor: "#FF6B00"
              }
            }
          },
          {
            type: "hero",
            props: {
              heading: "Cloura.",
              subheading: "The next-generation CDN for modern applications. Faster than Cloudflare, simpler than Mux.",
              variant: "bento",
              ctaButtons: [
                { label: "Start for Free", url: "#signup", variant: "primary" },
                { label: "Compare Performance", url: "#compare", variant: "outline" }
              ]
            }
          },
          {
            type: "integrations",
            props: {
              intro: "BETTER ALTERNATIVE TO",
              heading: "Unified Edge Network",
              subheading: "Replace your fragmented stack with a single, high-performance edge network. Drop-in compatible with standard protocols.",
              accentLabel: "Integrate with your favorite frameworks",
              variant: "bento",
              alternativeLogos: [
                { label: "Cloudflare", icon: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg" },
                { label: "Mux", icon: "https://avatars.githubusercontent.com/u/26061633?s=200&v=4" },
                { label: "Cloudinary", icon: "https://res.cloudinary.com/demo/image/upload/v1709400000/cloudinary_logo_blue_white_bg.svg" }
              ],
              items: [
                { label: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                { label: "Vue", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
                { label: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
                { label: "Svelte", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" }
              ]
            }
          },
          {
            type: "features",
            props: {
              title: "",
              variant: "bento",
              items: [
                { title: "Instant Purge", description: "Invalidate content across our global network in under 150ms." },
                { title: "Image Opt", description: "Automatic format conversion and compression at the edge." },
                { title: "Video Stream", description: "Adaptive bitrate streaming without the complexity of Mux." }
              ],
              columns: 3
            }
          },
          {
            type: "faq",
            props: {
              title: "Frequent Questions",
              description: "Everything you need to know about the product and billing.",
              variant: "bento",
              items: [
                {
                  question: "How does the global edge network work?",
                  answer: "We automatically route user requests to the nearest edge node from our 300+ locations worldwide, ensuring the lowest possible latency."
                },
                {
                  question: "Can I migrate from Cloudflare or AWS?",
                  answer: "Yes! We are drop-in compatible with S3-compatible storage and standard CDN protocols. Migration usually takes less than an hour."
                },
                {
                  question: "What happens if I exceed my bandwidth limit?",
                  answer: "We don't hard-cap your traffic. You'll be billed for overage at a standard rate, or we can upgrade you to a custom enterprise plan."
                },
                {
                  question: "Do you support video streaming?",
                  answer: "Absolutely. Our specialized video edge handles adaptive bitrate streaming, transcoding, and delivery better than general-purpose CDNs."
                }
              ]
            }
          },
          {
            type: "cta",
            props: {
              title: "",
              buttonText: "DEPLOY TO CLOURA",
              variant: "bento"
            }
          },
          {
            type: "footer",
            props: {
              logo: "Cloura.",
              variant: "bento",
              links: [
                { label: "Status", url: "#" },
                { label: "API", url: "#" },
                { label: "Legal", url: "#" }
              ],
              copyright: "@ 2025 Cloura Network Inc."
            }
          }
        ]
      }
    }
  ];

  const recordView = useMutation(api.analytics.recordView);

  // Use demo config if present
  let sections = siteConfig.sections;
  if (window.location.search.includes('demo=bento')) {
    sections = BENTO_DEMO;
  } else if (window.location.search.includes('demo=cloura')) {
    sections = CLOURA_DEMO;
  }

  const isDark = siteConfig.site_settings.theme?.darkMode;
  const showToggle = siteConfig.site_settings.theme?.showThemeToggle;

  useEffect(() => {
    if (!loading && projectId) {
      recordView({ projectId: projectId as any });
    }
  }, [loading, projectId]);

  // Apply dark class to body for global styles if needed, 
  // though here we apply it to the main container.
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-end pb-5 transition-colors">
        <div className="flex items-center gap-2 opacity-20 dark:text-white">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase">
            Powered by
          </span>
          <span className="text-sm font-black tracking-tighter">nekoneko</span>
        </div>
      </div>
    );
  }

  const font = siteConfig.site_settings.theme?.font || "Inter";
  const layout = siteConfig.site_settings.layout || {};

  const formatSpacing = (val: string | undefined) => {
    if (!val) return undefined;
    return /^\d+$/.test(val) ? `${val}px` : val;
  };

  return (
    <div
      className={`min-h-screen antialiased flex flex-col justify-between transition-colors ${isDark ? 'dark bg-slate-950 text-white' : 'bg-white text-slate-900'}`}
      style={{
        fontFamily: font,
        paddingTop: formatSpacing(layout.paddingTop),
        paddingRight: formatSpacing(layout.paddingRight),
        paddingBottom: formatSpacing(layout.paddingBottom),
        paddingLeft: formatSpacing(layout.paddingLeft),
        marginTop: formatSpacing(layout.marginTop),
        marginRight: formatSpacing(layout.marginRight),
        marginBottom: formatSpacing(layout.marginBottom),
        marginLeft: formatSpacing(layout.marginLeft),
      }}
    >
      <SEO
        title={siteConfig.site_settings.seo?.title || siteConfig.site_settings.name}
        description={siteConfig.site_settings.seo?.description}
      />
      <main className="w-full">
        <SectionRenderer sections={sections} />
      </main>

      {showToggle && <ThemeToggle variant="floating" />}

      <footer className="py-1 flex justify-center bg-slate-950">
        <div className="flex items-center gap-2 opacity-20 hover:opacity-100 transition-opacity cursor-default text-white">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase">
            Powered by
          </span>
          <span className="text-sm font-black tracking-tighter">nekoneko</span>
        </div>
      </footer>
    </div>
  );
};

export default Site;
