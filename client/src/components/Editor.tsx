import React, { useState, useEffect } from "react";
import { useSite } from "../context/useSite";
import { useNavigate } from "react-router-dom";
import {
  Files,
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
import ThemePlugin from "./ThemePlugin";
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

    try {
      const parsed = JSON.parse(val);
      if (parsed.site_settings && Array.isArray(parsed.sections)) {
        debounceRef.current = setTimeout(() => {
          setSiteConfig(parsed);
          setError(null);
        }, 300);
      } else {
        setError("Missing 'site_settings' or 'sections' array.");
      }
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
    }
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white font-sans overflow-hidden">
        <div className="flex flex-col items-center gap-10">
          <div className="relative">
            <div className="font-black text-3xl tracking-tighter animate-pulse duration-[2000ms] select-none">
              nekoneko
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-900 rounded-full animate-in slide-in-from-left-full duration-1000 iteration-infinite" />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
              LOADING_WORKSPACE
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900 font-sans overflow-hidden">
      {/* Header */}
      <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white shrink-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-400 hover:text-gray-900 transition-colors p-1"
            title="Back to Dashboard"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="font-black tracking-tighter text-lg select-none mr-4">
            nekoneko
          </div>

          {/* Actions Group - Moved to Left */}
          <div className="flex gap-2 items-center border-l border-gray-200 pl-4 h-8">
            <button
              onClick={handleFormat}
              className="px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-50 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 text-gray-600"
              title="Format JSON (Shift+Alt+F)"
            >
              <Sparkles size={14} />
              Format
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-4 py-1.5 rounded bg-gray-900 hover:bg-black text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-2 min-w-[80px] justify-center ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
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
              className="px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-50 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 text-indigo-600 border-indigo-100 bg-indigo-50"
            >
              <Globe size={14} />
              View Live
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Side Nav */}
        <div className="w-14 border-r border-gray-200 bg-white flex flex-col items-center py-6 gap-6 shrink-0 z-30">
          <button
            className="p-2 rounded transition-colors bg-gray-100 text-gray-900"
            onClick={() => { }}
          >
            <Files size={20} />
          </button>
          <a
            href="/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded transition-colors text-gray-400 hover:text-gray-900 cursor-pointer"
            title="Component Docs"
          >
            <BookOpen size={20} />
          </a>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden relative">
          <PanelGroup direction="horizontal">
            <Panel defaultSize={30} minSize={25}>
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

            <PanelResizeHandle className="w-px bg-gray-100 hover:bg-gray-300 transition-colors" />

            <Panel defaultSize={50} minSize={25}>
              <div className="h-full bg-gray-50 overflow-y-auto relative no-scrollbar cursor-default">
                {/* Viewport Controls */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white border border-gray-200 rounded-lg shadow-sm p-1">
                  <button
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setViewportWidth(375);
                    }}
                    className={`p-1.5 rounded transition-colors select-none ${viewportWidth === 375
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    title="Desktop (Full Width)"
                  >
                    <Monitor size={16} />
                  </button>
                  {viewportWidth !== "full" && (
                    <span className="text-xs font-bold text-gray-600 ml-1">
                      {viewportWidth}px
                    </span>
                  )}
                </div>
                <div className="flex justify-center h-full">
                  <IframePreview
                    title="Site Preview"
                    darkMode={siteConfig.site_settings?.theme?.darkMode}
                    className={`${siteConfig.site_settings?.theme?.darkMode ? "bg-slate-950" : "bg-white"} shadow-sm transition-all duration-300 mx-auto `}
                    style={{
                      width:
                        viewportWidth === "full"
                          ? "100%"
                          : `${viewportWidth}px`,
                      maxWidth: "100%",
                      height: "100%",
                    }}
                    contentStyle={{
                      fontFamily:
                        siteConfig.site_settings?.theme?.font || "Inter",
                      paddingTop: siteConfig.site_settings?.layout?.paddingTop
                        ? /^\d+$/.test(
                          siteConfig.site_settings.layout.paddingTop,
                        )
                          ? `${siteConfig.site_settings.layout.paddingTop}px`
                          : siteConfig.site_settings.layout.paddingTop
                        : undefined,
                      paddingRight: siteConfig.site_settings?.layout
                        ?.paddingRight
                        ? /^\d+$/.test(
                          siteConfig.site_settings.layout.paddingRight,
                        )
                          ? `${siteConfig.site_settings.layout.paddingRight}px`
                          : siteConfig.site_settings.layout.paddingRight
                        : undefined,
                      paddingBottom: siteConfig.site_settings?.layout
                        ?.paddingBottom
                        ? /^\d+$/.test(
                          siteConfig.site_settings.layout.paddingBottom,
                        )
                          ? `${siteConfig.site_settings.layout.paddingBottom}px`
                          : siteConfig.site_settings.layout.paddingBottom
                        : undefined,
                      paddingLeft: siteConfig.site_settings?.layout?.paddingLeft
                        ? /^\d+$/.test(
                          siteConfig.site_settings.layout.paddingLeft,
                        )
                          ? `${siteConfig.site_settings.layout.paddingLeft}px`
                          : siteConfig.site_settings.layout.paddingLeft
                        : undefined,
                      marginTop: siteConfig.site_settings?.layout?.marginTop
                        ? /^\d+$/.test(
                          siteConfig.site_settings.layout.marginTop,
                        )
                          ? `${siteConfig.site_settings.layout.marginTop}px`
                          : siteConfig.site_settings.layout.marginTop
                        : undefined,
                      marginRight: siteConfig.site_settings?.layout?.marginRight
                        ? /^\d+$/.test(
                          siteConfig.site_settings.layout.marginRight,
                        )
                          ? `${siteConfig.site_settings.layout.marginRight}px`
                          : siteConfig.site_settings.layout.marginRight
                        : undefined,
                      marginBottom: siteConfig.site_settings?.layout
                        ?.marginBottom
                        ? /^\d+$/.test(
                          siteConfig.site_settings.layout.marginBottom,
                        )
                          ? `${siteConfig.site_settings.layout.marginBottom}px`
                          : siteConfig.site_settings.layout.marginBottom
                        : undefined,
                      marginLeft: siteConfig.site_settings?.layout?.marginLeft
                        ? /^\d+$/.test(
                          siteConfig.site_settings.layout.marginLeft,
                        )
                          ? `${siteConfig.site_settings.layout.marginLeft}px`
                          : siteConfig.site_settings.layout.marginLeft
                        : undefined,
                    }}
                  >
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

            <PanelResizeHandle className="w-px bg-gray-100 hover:bg-gray-300 transition-colors" />
            <Panel defaultSize={20} minSize={20} maxSize={40}>
              <div className="h-full overflow-hidden">
                <ThemePlugin
                  activeThemeId={activeThemeId}
                  handleThemeChange={handleThemeChange}
                  setShowPlugins={() => { }}
                />
              </div>
            </Panel>
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
