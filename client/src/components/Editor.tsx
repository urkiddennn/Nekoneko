import React, { useState, useEffect } from "react";
import { useSite } from "../context/useSite";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Globe,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  ArrowLeft,
  Save,
  Check,
} from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SectionRenderer from "./SectionRenderer";
import IframePreview from "./IframePreview";

import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import {
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
} from "@codemirror/view";
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";

import { vscodeDark } from "@uiw/codemirror-themes-all";
import { CORE_EXTENSIONS } from "../extensions/registry";
import ThemeToggle from "./library/ThemeToggle";


function myCompletions(context: CompletionContext) {
  let word = context.matchBefore(/\w*/);
  if (!word || (word.from == word.to && !context.explicit)) return null;
  return {
    from: word.from,
    options: [
      { label: "site_settings", type: "keyword", info: "Global configuration" },
      { label: "sections", type: "keyword", info: "List of page modules" },
      { label: "id", type: "property" },
      { label: "type", type: "property" },
      { label: "props", type: "property" },
    ],
  };
}



const Editor: React.FC = () => {
  const { siteConfig, setSiteConfig, saveConfig, loading, projectSlug } =
    useSite();
  const navigate = useNavigate();

  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [editorTheme, setEditorTheme] = useState<any>(vscodeDark);
  const [activeThemeId, setActiveThemeId] = useState<string>("vscodeDark");
  const [viewportWidth, setViewportWidth] = useState<number | "full">("full");
  const [activeExtensionId, setActiveExtensionId] = useState<string>("appearance");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activeExtension = CORE_EXTENSIONS.find(ext => ext.id === activeExtensionId) || CORE_EXTENSIONS[0];

  const toggleExtension = (id: string) => {
    if (activeExtensionId === id) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setActiveExtensionId(id);
      setIsSidebarOpen(true);
    }
  };

  useEffect(() => {
    if (!loading) {
      const currentJson = JSON.stringify(siteConfig, null, 2);
      setJsonInput((prev) => {
        // Only update if the actual content changed (ignoring whitespace differences is hard,
        // but at least we can check if stringified versions match)
        try {
          if (JSON.stringify(JSON.parse(prev)) === JSON.stringify(siteConfig)) {
            return prev;
          }
        } catch (e) { }
        return currentJson;
      });
    }
  }, [loading, siteConfig]);

  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleJsonChange = (val: string) => {
    setJsonInput(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      try {
        const parsed = JSON.parse(val);
        if (parsed.site_settings && Array.isArray(parsed.sections)) {
          setSiteConfig(parsed);
          setError(null);
        } else {
          setError("Missing 'site_settings' or 'sections' array.");
        }
      } catch (e: any) {
        setError(`Invalid JSON: ${e.message}`);
      }
    }, 300);
  };

  const handleThemeChange = (themeId: string, themeObj: any) => {
    setEditorTheme(themeObj);
    setActiveThemeId(themeId);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [showSaveFeedback, setShowSaveFeedback] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveConfig();
      setShowSaveFeedback(true);
      setTimeout(() => setShowSaveFeedback(false), 2000);
    } finally {
      setTimeout(() => setIsSaving(false), 500);
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setError("Invalid JSON");
    }
  };

  // handle keysdown like eg.. CTRL+S to save the project
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
      if (e.shiftKey && e.altKey && e.key === "f") {
        e.preventDefault();
        handleFormat();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jsonInput]);

  const contentStyle = React.useMemo(() => ({
    fontFamily: siteConfig.site_settings?.theme?.font || "Inter",
    paddingTop: siteConfig.site_settings?.layout?.paddingTop
      ? /^\d+$/.test(siteConfig.site_settings.layout.paddingTop)
        ? `${siteConfig.site_settings.layout.paddingTop}px`
        : siteConfig.site_settings.layout.paddingTop
      : undefined,
    paddingRight: siteConfig.site_settings?.layout?.paddingRight
      ? /^\d+$/.test(siteConfig.site_settings.layout.paddingRight)
        ? `${siteConfig.site_settings.layout.paddingRight}px`
        : siteConfig.site_settings.layout.paddingRight
      : undefined,
    paddingBottom: siteConfig.site_settings?.layout?.paddingBottom
      ? /^\d+$/.test(siteConfig.site_settings.layout.paddingBottom)
        ? `${siteConfig.site_settings.layout.paddingBottom}px`
        : siteConfig.site_settings.layout.paddingBottom
      : undefined,
    paddingLeft: siteConfig.site_settings?.layout?.paddingLeft
      ? /^\d+$/.test(siteConfig.site_settings.layout.paddingLeft)
        ? `${siteConfig.site_settings.layout.paddingLeft}px`
        : siteConfig.site_settings.layout.paddingLeft
      : undefined,
    marginTop: siteConfig.site_settings?.layout?.marginTop
      ? /^\d+$/.test(siteConfig.site_settings.layout.marginTop)
        ? `${siteConfig.site_settings.layout.marginTop}px`
        : siteConfig.site_settings.layout.marginTop
      : undefined,
    marginRight: siteConfig.site_settings?.layout?.marginRight
      ? /^\d+$/.test(siteConfig.site_settings.layout.marginRight)
        ? `${siteConfig.site_settings.layout.marginRight}px`
        : siteConfig.site_settings.layout.marginRight
      : undefined,
    marginBottom: siteConfig.site_settings?.layout?.marginBottom
      ? /^\d+$/.test(siteConfig.site_settings.layout.marginBottom)
        ? `${siteConfig.site_settings.layout.marginBottom}px`
        : siteConfig.site_settings.layout.marginBottom
      : undefined,
    marginLeft: siteConfig.site_settings?.layout?.marginLeft
      ? /^\d+$/.test(siteConfig.site_settings.layout.marginLeft)
        ? `${siteConfig.site_settings.layout.marginLeft}px`
        : siteConfig.site_settings.layout.marginLeft
      : undefined,
  }), [siteConfig.site_settings?.theme?.font, siteConfig.site_settings?.layout]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0b0b0b] font-sans overflow-hidden">
        <div className="flex flex-col items-center gap-10">
          <div className="relative">
            <div className="font-black text-3xl tracking-tighter animate-pulse duration-[2000ms] select-none text-white">
              nekoneko
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full animate-in slide-in-from-left-full duration-1000 iteration-infinite" />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
              LOADING_WORKSPACE
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#0b0b0b] text-white font-sans overflow-hidden">
      {/* Header */}
      <div className="h-14 border-b border-white/[0.04] flex items-center justify-between px-4 bg-[#0b0b0b] shrink-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-500 hover:text-white transition-colors p-1"
            title="Back to Dashboard"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="font-black tracking-tighter text-lg select-none mr-4 text-white">
            nekoneko
          </div>

          {/* Actions Group - Moved to Left */}
          <div className="flex gap-2 items-center border-l border-white/[0.04] pl-4 h-8">
            <button
              onClick={handleFormat}
              className="px-3 py-1.5 rounded border border-white/[0.08] hover:bg-white/[0.04] text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 text-gray-400"
              title="Format JSON (Shift+Alt+F)"
            >
              <Sparkles size={14} />
              Format
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-4 py-1.5 rounded bg-white hover:bg-gray-200 text-black text-xs font-bold transition-all active:scale-95 flex items-center gap-2 min-w-[80px] justify-center ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
              title="Save Project (Ctrl+S)"
            >
              {isSaving ? (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              ) : showSaveFeedback ? (
                <Check size={14} />
              ) : (
                <Save size={14} />
              )}
              {isSaving ? "Saving..." : showSaveFeedback ? "Saved!" : "Save"}
            </button>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-500 max-w-[200px] truncate">
          {siteConfig.site_settings?.name || "Untitled Project"}
        </div>

        <div className="flex items-center gap-4">
          {!isSaving && projectSlug && (
            <button
              onClick={() => {
                const protocol = window.location.protocol;
                const host = window.location.host;
                const newUrl = `${protocol}//${projectSlug}.${host}`;
                window.open(newUrl, "_blank");
              }}
              className="px-3 py-1.5 rounded border hover:bg-white/[0.04] text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 text-white border-white/[0.08] bg-white/[0.02]"
            >
              <Globe size={14} />
              View Live
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Side Nav (Activity Bar) */}
        <div className="w-14 border-r border-white/[0.04] bg-[#0b0b0b] flex flex-col items-center py-6 gap-6 shrink-0 z-30">
          {CORE_EXTENSIONS.map((ext) => {
            const Icon = ext.icon;
            const isActive = activeExtensionId === ext.id;
            return (
              <div key={ext.id} className="relative group">
                {isActive && isSidebarOpen && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-white rounded-r-full" />
                )}
                <button
                  onClick={() => toggleExtension(ext.id)}
                  className={`p-2 rounded transition-all active:scale-90 ${isActive && isSidebarOpen
                    ? "bg-white text-black shadow-lg shadow-white/5"
                    : "text-gray-500 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  title={ext.name}
                >
                  <Icon size={20} />
                </button>
              </div>
            );
          })}

          <div className="mt-auto pb-4">
            <a
              href="/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded transition-colors text-gray-500 hover:text-white cursor-pointer"
              title="Component Docs"
            >
              <BookOpen size={20} />
            </a>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden relative">
          <PanelGroup direction="horizontal">
            <Panel defaultSize={isSidebarOpen ? 30 : 40} minSize={25}>
              <div className="h-full relative flex flex-col">
                <div className="flex-1 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <CodeMirror
                      value={jsonInput}
                      height="100%"
                      basicSetup={{
                        lineNumbers: true,
                        foldGutter: true,
                        autocompletion: true,
                      }}
                      theme={editorTheme}
                      extensions={[
                        json(),
                        autocompletion({ override: [myCompletions] }),
                        EditorView.lineWrapping,
                        highlightActiveLine(),
                        highlightActiveLineGutter(),
                      ]}
                      onChange={handleJsonChange}
                      className="text-sm font-mono h-full"
                    />
                  </div>
                </div>
                {error && (
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-red-50 text-red-600 border border-red-100 rounded text-xs font-bold">
                    {error}
                  </div>
                )}
              </div>
            </Panel>

            <PanelResizeHandle className="w-px bg-white/[0.04] hover:bg-white/[0.08] transition-colors" />

            <Panel defaultSize={isSidebarOpen ? 50 : 60} minSize={25}>
              <div className="h-full bg-[#111] overflow-y-auto relative no-scrollbar cursor-default">
                {/* Viewport Controls */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-[#161616] border border-white/[0.04] rounded-lg shadow-xl p-1">
                  <button
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setViewportWidth(375);
                    }}
                    className={`p-1.5 rounded transition-colors select-none ${viewportWidth === 375
                      ? "bg-white text-black"
                      : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    title="Mobile (375px)"
                  >
                    <Smartphone size={16} />
                  </button>
                  <button
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setViewportWidth(768);
                    }}
                    className={`p-1.5 rounded transition-colors select-none ${viewportWidth === 768
                      ? "bg-white text-black"
                      : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    title="Tablet (768px)"
                  >
                    <Tablet size={16} />
                  </button>
                  <button
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setViewportWidth("full");
                    }}
                    className={`p-1.5 rounded transition-colors select-none ${viewportWidth === "full"
                      ? "bg-white text-black"
                      : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    title="Desktop (Full Width)"
                  >
                    <Monitor size={16} />
                  </button>
                  {viewportWidth !== "full" && (
                    <span className="text-[10px] font-black tracking-widest text-[#a1a1aa] ml-1">
                      {viewportWidth}px
                    </span>
                  )}
                </div>
                <div className="flex justify-center h-full">
                  <IframePreview
                    title="Site Preview"
                    darkMode={siteConfig.site_settings?.theme?.darkMode}
                    className={`${siteConfig.site_settings?.theme?.darkMode ? "bg-slate-950" : "bg-white"} shadow-2xl transition-all duration-300 border-x border-gray-200`}
                    style={{
                      width:
                        viewportWidth === "full"
                          ? "100%"
                          : `${viewportWidth}px`,
                      maxWidth: "100%",
                      height: "100%",
                      borderRadius: "0",
                    }}
                    contentStyle={contentStyle}                  >
                    <div className="min-h-full ">
                      <SectionRenderer sections={siteConfig.sections} />
                      {siteConfig.site_settings?.theme?.showThemeToggle && (
                        <ThemeToggle variant="floating" />
                      )}
                    </div>
                  </IframePreview>
                </div>
              </div>
            </Panel>

            {isSidebarOpen && (
              <>
                <PanelResizeHandle className="w-px bg-white/[0.04] hover:bg-white/[0.08] transition-colors" />
                <Panel defaultSize={20} minSize={15} maxSize={40}>
                  <div className="h-full overflow-hidden border-l border-white/[0.04] bg-[#0b0b0b] shadow-xl">
                    <activeExtension.panel
                      activeThemeId={activeThemeId}
                      handleThemeChange={handleThemeChange}
                      setShowPlugins={() => setIsSidebarOpen(false)}
                    />
                  </div>
                </Panel>
              </>
            )}
          </PanelGroup>
        </div>
      </div>
      <style>{`
                .cm-editor { height: 100% !important; }
                .cm-scroller { overflow: auto !important; }
                .cm-content { font-family: 'JetBrains Mono', 'Fira Code', monospace !important; }
            `}</style>
    </div>
  );
};

export default Editor;
