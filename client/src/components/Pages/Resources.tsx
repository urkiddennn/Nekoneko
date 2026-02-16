import React, { useState, useMemo } from "react";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import {
  ChevronDown,
  Sparkles,
  Search,
  Filter,
  X,
  Heart,
  Download,
  Copy,
  Check,
  Users,
} from "lucide-react";
import { SEO } from "../../components/SEO";
import { SCHEMAS } from "../../data/schemas";
import { renderSection } from "../../components/SectionRenderer";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ProCTA from "../ProCta";

const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"library" | "community">(
    "library",
  );
  const [activeFilters, setActiveFilters] = useState({
    pricing: "All",
    type: "All",
    sort: "Popular",
  });
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Community resources from Convex
  const communityResources = useQuery(
    api.communityResources.list,
    activeTab === "community" ? {} : "skip",
  );
  const likeMutation = useMutation(api.communityResources.like);
  const downloadMutation = useMutation(
    api.communityResources.incrementDownloads,
  );

  // Flatten SCHEMAS into actual variants/items (Library tab)
  const resources = useMemo(() => {
    const items: any[] = [];
    (SCHEMAS as any[]).forEach((schema) => {
      const label = schema.label || schema.type || "Component";
      const category = schema.category || "General";

      if (schema.variants && Array.isArray(schema.variants)) {
        schema.variants.forEach((variant: any) => {
          // Create a clean section object for preview
          const section = {
            ...variant.example,
            styles: {
              ...(variant.example?.styles || {}),
              padding: "py-0",
              maxWidth: "none",
              width: "100%",
              minHeight:
                variant.example?.type === "navigation" ? "120px" : "500px",
            },
          };

          items.push({
            title: variant.name || label,
            type: label,
            category: category,
            pricing:
              variant.tag === "Premium" || category === "Premium"
                ? "Premium"
                : "Free",
            section: section,
            schemaType: schema.type,
          });
        });
      } else if (schema.example) {
        const section = {
          ...schema.example,
          styles: {
            ...(schema.example?.styles || {}),
            padding: "py-0",
            maxWidth: "none",
            width: "100%",
            minHeight: "500px",
          },
        };
        items.push({
          title: label,
          type: label,
          category: category,
          pricing: category === "Premium" ? "Premium" : "Free",
          section: section,
          schemaType: schema.type,
        });
      }
    });
    return items;
  }, []);

  // Filter logic for Library tab
  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPricing =
        activeFilters.pricing === "All" ||
        item.pricing === activeFilters.pricing;
      const matchesType =
        activeFilters.type === "All" || item.type === activeFilters.type;
      return matchesSearch && matchesPricing && matchesType;
    });
  }, [resources, searchQuery, activeFilters]);

  // Filter logic for Community tab
  const filteredCommunity = useMemo(() => {
    if (!communityResources) return [];
    return communityResources.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.componentType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
        activeFilters.type === "All" ||
        item.componentType === activeFilters.type;
      return matchesSearch && matchesType;
    });
  }, [communityResources, searchQuery, activeFilters]);

  const resourceTypes = useMemo(() => {
    if (activeTab === "community" && communityResources) {
      return [
        "All",
        ...Array.from(new Set(communityResources.map((r) => r.componentType))),
      ];
    }
    return ["All", ...Array.from(new Set(resources.map((r) => r.type)))];
  }, [resources, communityResources, activeTab]);

  const currentItems =
    activeTab === "library" ? filteredResources : filteredCommunity;
  const visibleResources = useMemo(() => {
    return currentItems.slice(0, visibleCount);
  }, [currentItems, visibleCount]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const handleCopySection = async (resource: any) => {
    const sectionJson = JSON.stringify(resource.sectionConfig, null, 2);
    await navigator.clipboard.writeText(sectionJson);
    setCopiedId(resource._id);
    try {
      await downloadMutation({ resourceId: resource._id });
    } catch {
      /* user might not be logged in */
    }
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLike = async (resourceId: any) => {
    try {
      await likeMutation({ resourceId });
    } catch {
      /* user might not be logged in */
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white font-sans selection:bg-white/10 selection:text-white">
      <SEO
        title="Resources"
        description="Explore the Nekoneko component library. Discover actual components, variants, and design systems."
      />
      <NavigationBar />
      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                Library <span className="text-gray-500">& Resources</span>
              </h1>
              <p className="max-w-2xl text-gray-400 font-medium text-lg leading-relaxed">
                Explore{" "}
                {activeTab === "library"
                  ? resources.length
                  : communityResources?.length || 0}{" "}
                {activeTab === "library"
                  ? "handcrafted components"
                  : "community-published sections"}{" "}
                ready for your next project.
              </p>
            </div>

            {/* Search Bar - Modern Style */}
            <div className="relative w-full md:w-96 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(12);
                }}
                className="w-full bg-[#161616] border border-white/[0.08] rounded-xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-600 shadow-2xl shadow-black/50"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setVisibleCount(12);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Tab Toggle */}
          <div className="flex items-center gap-1 mb-8 bg-[#161616] border border-white/[0.08] rounded-xl p-1 w-fit">
            <button
              onClick={() => {
                setActiveTab("library");
                setVisibleCount(12);
                setActiveFilters({
                  pricing: "All",
                  type: "All",
                  sort: "Popular",
                });
              }}
              className={`px-6 py-3 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === "library" ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}
            >
              Library
            </button>
            <button
              onClick={() => {
                setActiveTab("community");
                setVisibleCount(12);
                setActiveFilters({
                  pricing: "All",
                  type: "All",
                  sort: "Popular",
                });
              }}
              className={`px-6 py-3 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === "community" ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}
            >
              <Users size={14} />
              Community
            </button>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-white/[0.06] pb-8">
            <div className="flex items-center gap-3">
              {/* Pricing Dropdown (Library only) */}
              {activeTab === "library" && (
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsPricingOpen(!isPricingOpen);
                      setIsTypeOpen(false);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#161616] border border-white/[0.08] rounded-full text-[10px] font-black uppercase tracking-widest hover:border-white/20 transition-all group"
                  >
                    <span className="text-gray-400 group-hover:text-white transition-colors">
                      Pricing:
                    </span>
                    <span>{activeFilters.pricing}</span>
                    <ChevronDown
                      size={14}
                      className={`text-gray-500 group-hover:text-white transition-transform ${isPricingOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isPricingOpen && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-[#161616] border border-white/[0.08] rounded-xl overflow-hidden z-20 shadow-2xl">
                      {["All", "Free", "Premium"].map((p) => (
                        <button
                          key={p}
                          onClick={() => {
                            setActiveFilters({ ...activeFilters, pricing: p });
                            setIsPricingOpen(false);
                            setVisibleCount(12);
                          }}
                          className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors ${activeFilters.pricing === p ? "text-indigo-400" : "text-gray-400"}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Type Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsTypeOpen(!isTypeOpen);
                    setIsPricingOpen(false);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#161616] border border-white/[0.08] rounded-full text-[10px] font-black uppercase tracking-widest hover:border-white/20 transition-all group"
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    Type:
                  </span>
                  <span className="max-w-[100px] truncate">
                    {activeFilters.type}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-gray-500 group-hover:text-white transition-transform ${isTypeOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isTypeOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 max-h-80 overflow-y-auto bg-[#161616] border border-white/[0.08] rounded-xl z-20 shadow-2xl">
                    {resourceTypes.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setActiveFilters({ ...activeFilters, type: t });
                          setIsTypeOpen(false);
                          setVisibleCount(12);
                        }}
                        className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors ${activeFilters.type === t ? "text-indigo-400" : "text-gray-400"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-gray-500 tracking-widest uppercase">
                {currentItems.length} Results
              </span>
              <div className="flex items-center gap-2 px-5 py-2.5 bg-[#161616] border border-white/[0.08] rounded-full text-[10px] font-black uppercase tracking-widest hover:border-white/20 transition-all cursor-pointer group">
                <Filter
                  size={14}
                  className="text-gray-500 group-hover:text-white transition-colors"
                />
                <span>Sort: {activeFilters.sort}</span>
              </div>
            </div>
          </div>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-12">
            {activeTab === "library" &&
              visibleResources.map((resource: any, idx: number) => (
                <div key={idx} className="group space-y-4 flex flex-col">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#0d0d0d] border border-white/[0.04] group-hover:border-white/[0.12] transition-all relative cursor-pointer ring-1 ring-white/5 active:scale-[0.98]">
                    {/* Live Preview Container */}
                    <div className="absolute inset-0 scale-[0.5] origin-top-left w-[200%] h-[200%] pointer-events-none opacity-70 group-hover:opacity-100 group-hover:scale-[0.51] transition-all duration-700">
                      {renderSection(resource.section, idx, true)}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />

                    {/* Overlay for Premium tag */}
                    {resource.pricing === "Premium" && (
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-lg border border-white/[0.1] flex items-center gap-2">
                        <Sparkles size={11} className="text-indigo-400" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">
                          Elite
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1.5 px-1">
                    <h3 className="font-bold text-lg tracking-tight group-hover:text-white transition-colors line-clamp-1">
                      {resource.title}
                    </h3>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400/80">
                        {resource.type}
                      </span>
                      <span className="h-0.5 w-0.5 rounded-full bg-white/20" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                        {resource.pricing}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            {activeTab === "community" &&
              visibleResources.map((resource: any, idx: number) => {
                const previewSection = {
                  ...resource.sectionConfig,
                  styles: {
                    ...(resource.sectionConfig?.styles || {}),
                    padding: "py-0",
                    maxWidth: "none",
                    width: "100%",
                    minHeight: "500px",
                  },
                };

                return (
                  <div
                    key={resource._id || idx}
                    className="group space-y-4 flex flex-col"
                  >
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#0d0d0d] border border-white/[0.04] group-hover:border-white/[0.12] transition-all relative cursor-pointer ring-1 ring-white/5 active:scale-[0.98]">
                      {/* Live Preview Container */}
                      <div className="absolute inset-0 scale-[0.5] origin-top-left w-[200%] h-[200%] pointer-events-none opacity-70 group-hover:opacity-100 group-hover:scale-[0.51] transition-all duration-700">
                        {renderSection(previewSection, idx, true)}
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />

                      {/* Action Buttons Overlay */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(resource._id);
                          }}
                          className="p-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/[0.1] hover:border-white/30 transition-all"
                          title="Like"
                        >
                          <Heart size={14} className="text-white" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopySection(resource);
                          }}
                          className="flex items-center gap-1.5 px-3 py-2 bg-white text-black rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                          title="Copy section JSON to clipboard"
                        >
                          {copiedId === resource._id ? (
                            <>
                              <Check size={12} /> Copied
                            </>
                          ) : (
                            <>
                              <Copy size={12} /> Use
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5 px-1">
                      <h3 className="font-bold text-lg tracking-tight group-hover:text-white transition-colors line-clamp-1">
                        {resource.title}
                      </h3>
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400/80">
                          {resource.componentType}
                        </span>
                        <span className="h-0.5 w-0.5 rounded-full bg-white/20" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                          by {resource.authorName}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 pt-1">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                          <Heart size={11} /> {resource.likes}
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                          <Download size={11} /> {resource.downloads}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Community Empty State */}
          {activeTab === "community" &&
            communityResources &&
            communityResources.length === 0 && (
              <div className="py-32 text-center border border-dashed border-white/[0.06] rounded-3xl">
                <div className="w-16 h-16 bg-[#161616] border border-white/[0.08] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users size={24} className="text-gray-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  No community resources yet
                </h3>
                <p className="text-gray-500 font-medium">
                  Be the first to publish a section from the Editor!
                </p>
              </div>
            )}

          {/* Community Loading State */}
          {activeTab === "community" && !communityResources && (
            <div className="py-32 text-center">
              <div className="w-8 h-8 border-2 border-white/[0.08] border-t-white rounded-full animate-spin mx-auto" />
            </div>
          )}

          {/* Show More Button */}
          {currentItems.length > visibleCount && (
            <div className="mt-16 text-center">
              <button
                onClick={handleShowMore}
                className="px-8 py-4 bg-[#161616] border border-white/[0.08] rounded-xl text-xs font-black uppercase tracking-widest hover:border-white/20 transition-all active:scale-95"
              >
                Show More Components
              </button>
            </div>
          )}

          {/* No Results Fallback */}
          {currentItems.length === 0 && activeTab === "library" && (
            <div className="py-32 text-center border border-dashed border-white/[0.06] rounded-3xl">
              <div className="w-16 h-16 bg-[#161616] border border-white/[0.08] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search size={24} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">No components found</h3>
              <p className="text-gray-500 font-medium">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          )}

          {/* Pro CTA - Flat Style */}
          <ProCTA />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
