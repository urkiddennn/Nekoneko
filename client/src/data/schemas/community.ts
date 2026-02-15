export const community = {
    type: "community",
    category: "Guides",
    description: "Share and discover sections in the Community Marketplace.",
    documentation: {
        sections: [
            {
                title: "What is the Community Marketplace?",
                content: "The Community Marketplace lets Nekoneko users share their custom-built sections with others. Think of it as an open library where you can browse, like, and import sections created by the community — no coding required.\n\nYou can access it from the Resources page by switching to the 'Community' tab."
            },
            {
                title: "Publishing a Section",
                content: "You can publish any section from your site to the community:\n\n1. Open your project in the Editor.\n2. Click the 'Publish' button (purple, in the top toolbar).\n3. Select which section you want to share from the dropdown.\n4. Add a title, description (optional), and tags (optional, comma-separated).\n5. Click 'Publish to Community'.\n\nYour section's full JSON configuration is saved to the community library, including all props, styles, and variant settings. Other users will see a live preview of your section."
            },
            {
                title: "Importing a Section",
                content: "To use a community section in your own site:\n\n1. Go to the Resources page.\n2. Switch to the 'Community' tab.\n3. Browse or filter sections by component type.\n4. Click 'Add to My Site' on any section you like.\n5. The section's JSON is copied to your clipboard.\n6. Go to your Editor, and paste the JSON into your sections array.\n\nThe imported section uses the exact same format as your existing sections, so it works immediately."
            },
            {
                title: "Community Section JSON Format",
                content: "Published sections use the standard Nekoneko section format. Here's an example of what gets shared:",
                code: `{
  "id": "community_hero_001",
  "type": "hero",
  "props": {
    "heading": "Build Something Amazing",
    "subheading": "A stunning glassmorphism hero section",
    "variant": "glassmorphism",
    "ctaText": "Get Started",
    "ctaLink": "#"
  },
  "styles": {
    "padding": "py-32",
    "backgroundColor": "bg-gradient-to-br from-indigo-950 to-black"
  }
}`
            },
            {
                title: "Liking & Discovery",
                content: "Each community section shows:\n\n• Author Name — Who created and published the section.\n• Like Count — Click the heart to like a section. Popular sections rise to the top.\n• Download Count — How many times the section has been imported.\n• Live Preview — A scaled preview showing exactly how the section looks.\n\nUse the component type filter to narrow down sections to specific types (Hero, Features, CTA, etc.)."
            },
            {
                title: "Removing Your Sections",
                content: "You can remove sections you've published. Only the original author can delete a section. Your author identity is tied to your Nekoneko account."
            }
        ]
    }
};
