import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Globe,
  Settings,
  Check,
  TrendingUp,
  MessageSquare,
  Star,
} from "lucide-react";
import { TEMPLATES, Template } from "../../data/templates";
import Header from "../Header";
import { NotificationContainer, NotificationType } from "../Notification";

import { useAuth } from "../../hooks/useAuth";

const Dashboard: React.FC = () => {
  const { user, token, isAuthenticated, isLoading, isConvexAuth } = useAuth();
  const navigate = useNavigate();

  const projects = useQuery(
    api.config.listProjects,
    token || isConvexAuth ? { token: token || undefined } : "skip",
  );
  const dashStats = useQuery(
    api.stats.getUserStats,
    token || isConvexAuth ? { token: token || undefined } : "skip",
  );
  const createProject = useMutation(api.config.createProject);
  const deleteProject = useMutation(api.config.deleteProject);
  const sendFeedback = useMutation(api.feedback.sendFeedback);

  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    TEMPLATES[0],
  );
  const [projectToDelete, setProjectToDelete] = useState<any>(null);
  const [projectToEdit, setProjectToEdit] = useState<any>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"problem" | "rating">(
    "problem",
  );
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [debouncedSlug, setDebouncedSlug] = useState("");
  const [notifications, setNotifications] = useState<
    { id: string; message: string; type: NotificationType }[]
  >([]);

  const notify = (type: NotificationType, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSlug(newSlug.toLowerCase().replace(/[^a-z0-9]/g, "-"));
    }, 500);
    return () => clearTimeout(timer);
  }, [newSlug]);

  const isAvailable = useQuery(api.config.checkSlugAvailable, {
    slug: debouncedSlug,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] font-sans overflow-hidden">
        <div className="flex flex-col items-center gap-10 text-white">
          <div className="relative">
            <div className="font-black text-3xl tracking-tighter animate-pulse duration-[2000ms] select-none text-white">
              nekoneko
            </div>
          </div>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAvailable === false) return;
    try {
      const id = await createProject({
        token: token || undefined,
        name: newName,
        slug: newSlug.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        site_settings: selectedTemplate?.site_settings
          ? { ...selectedTemplate.site_settings, name: newName }
          : undefined,
        sections: selectedTemplate?.sections || undefined,
      });
      navigate(`/editor/${id}`);
    } catch (err: any) {
      notify("error", err.message);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;
    setIsSendingFeedback(true);
    try {
      await sendFeedback({
        token: token || undefined,
        message: feedbackMessage,
        type: feedbackType,
        rating: feedbackRating,
      });
      setFeedbackMessage("");
      setFeedbackRating(5);
      setIsFeedbackOpen(false);
      notify("success", "Feedback sent! Thank you.");
    } catch (err: any) {
      notify("error", err.message);
    } finally {
      setIsSendingFeedback(false);
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    try {
      await deleteProject({
        token: token || undefined,
        id: projectToDelete._id,
      });
      setProjectToDelete(null);
      setProjectToEdit(null); // Close the edit actions menu too
      notify("info", "Project deleted successfully");
    } catch (err: any) {
      notify("error", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] font-sans text-white">
      <NotificationContainer
        notifications={notifications}
        removeNotification={removeNotification}
      />
      <Header />

      <main className="pt-24 md:pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Your Projects
            </h1>
            <p className="text-gray-400 text-sm">
              Manage and view your static sites.
            </p>
          </div>
          <div className="flex w-full sm:w-auto gap-3">
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg font-bold text-gray-400 hover:text-white border border-white/[0.08] hover:bg-white/[0.02] transition-all flex items-center justify-center gap-2 text-xs md:text-sm"
            >
              <MessageSquare size={18} />
              Feedback
            </button>
            <button
              onClick={() => setIsCreating(true)}
              className="flex-1 sm:flex-none bg-white text-black px-4 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-95 text-xs md:text-sm shadow-xl shadow-white/5"
            >
              <Plus size={18} />
              New Project
            </button>
          </div>
        </div>

        {/* Usage Overview - Horizontal Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {dashStats ? (
            <>
              {[
                {
                  label: "Asset Storage",
                  used: `${Math.round((dashStats.storage.used / (1024 * 1024)) * 10) / 10}MB`,
                  limit: "40MB",
                  percent:
                    (dashStats.storage.used / dashStats.storage.limit) * 100,
                  icon: <Star size={14} className="text-indigo-400" />,
                },
                {
                  label: "Web Analytics Events",
                  used:
                    dashStats.analytics.used >= 1000
                      ? `${(dashStats.analytics.used / 1000).toFixed(1)}k`
                      : dashStats.analytics.used,
                  limit: "10k",
                  percent:
                    (dashStats.analytics.used / dashStats.analytics.limit) *
                    100,
                  icon: <TrendingUp size={14} className="text-green-400" />,
                },
                {
                  label: "Site Engine Awesome",
                  used: "27k",
                  limit: "1M",
                  percent: 2.7,
                  icon: <Globe size={14} className="text-pink-400" />,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#111] border border-white/[0.04] p-4 rounded-xl flex items-center gap-4 group hover:border-white/[0.1] transition-all"
                >
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-white/[0.02]"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={113}
                        strokeDashoffset={113 - (113 * stat.percent) / 100}
                        strokeLinecap="round"
                        className="text-white transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 truncate mr-2">
                        {stat.label}
                      </h3>
                      <span className="text-[10px] font-bold text-white whitespace-nowrap">
                        {stat.used}{" "}
                        <span className="text-gray-600 font-medium">
                          / {stat.limit}
                        </span>
                      </span>
                    </div>
                    <div className="h-0.5 w-full bg-white/[0.02] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-1000"
                        style={{ width: `${stat.percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 bg-white/[0.02] animate-pulse rounded-xl border border-white/[0.04]"
              />
            ))
          )}
        </div>

        {projects === undefined ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-white/[0.02] animate-pulse rounded-xl border border-white/[0.04]"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] rounded-xl border border-dashed border-white/[0.08]">
            <p className="text-gray-400 font-medium">
              No projects yet. Create your first one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project: any) => (
              <div
                key={project._id}
                className="group border border-white/[0.08] rounded-xl p-6 hover:border-white/[0.2] transition-all flex flex-col justify-between h-48 relative bg-[#161616]"
              >
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">
                    {project.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">
                    /{project.slug}
                  </p>
                </div>
                <div className="flex gap-3 relative">
                  <button
                    onClick={() =>
                      setProjectToEdit(
                        projectToEdit?._id === project._id ? null : project,
                      )
                    }
                    className="flex-1 border border-white/[0.08] py-1.5 rounded-lg text-xs font-bold hover:bg-white/[0.04] transition-colors flex items-center justify-center gap-1.5 text-gray-400 hover:text-white"
                  >
                    <Settings size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      const protocol = window.location.protocol;
                      const host = window.location.host;
                      window.open(
                        `${protocol}//${project.slug}.${host}`,
                        "_blank",
                      );
                    }}
                    className="flex-1 bg-white/[0.04] py-1.5 rounded-lg text-xs font-bold hover:bg-white/[0.08] transition-colors flex items-center justify-center gap-1.5 text-white"
                  >
                    <Globe size={14} />
                    Live
                  </button>
                  <button
                    onClick={() => navigate(`/analytics/${project._id}`)}
                    className="p-1.5 px-2 border border-white/[0.08] rounded-lg text-gray-400 hover:text-indigo-400 hover:bg-white/[0.04] transition-all"
                    title="View Analytics"
                  >
                    <TrendingUp size={14} />
                  </button>

                  {/* Action Dropdown */}
                  {projectToEdit?._id === project._id && (
                    <>
                      <div
                        className="fixed inset-0 z-20"
                        onClick={() => setProjectToEdit(null)}
                      ></div>
                      <div className="absolute top-1/5 -right-11 mb-2 w-48 bg-[#1a1a1a] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/80 z-30 py-2 animate-in slide-in-from-bottom-2 duration-200">
                        <button
                          onClick={() => navigate(`/editor/${project._id}`)}
                          className="w-full text-left px-4 py-2.5 hover:bg-white/[0.04] text-xs font-bold flex items-center gap-2 text-gray-300 hover:text-white"
                        >
                          <Settings size={14} className="text-gray-500" />
                          Edit Content
                        </button>
                        <button
                          onClick={() => navigate(`/analytics/${project._id}`)}
                          className="w-full text-left px-4 py-2.5 hover:bg-white/[0.04] text-xs font-bold flex items-center gap-2 border-t border-white/[0.04] text-gray-300 hover:text-white"
                        >
                          <TrendingUp size={14} className="text-gray-500" />
                          View Analytics
                        </button>
                        <button
                          onClick={() => setProjectToDelete(project)}
                          className="w-full text-left px-4 py-2.5 hover:bg-red-500/10 text-red-500 text-xs font-bold flex items-center gap-2 border-t border-white/[0.04]"
                        >
                          <Plus size={14} className="rotate-45" />
                          Delete Project
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#161616] border border-white/[0.08] w-full max-w-sm p-6 md:p-8 rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-2 text-white">
              Delete Project?
            </h2>
            <p className="text-gray-400 text-sm mb-8 font-medium">
              Are you sure you want to delete{" "}
              <span className="font-bold text-white">
                "{projectToDelete.name}"
              </span>
              ?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setProjectToDelete(null)}
                className="flex-1 py-2 text-gray-500 font-bold hover:text-white transition-colors"
                title="Cancel"
              >
                Keep It
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleCreate}
            className="bg-[#0b0b0b] w-full max-w-2xl my-auto flex flex-col border border-white/[0.08] rounded-xl shadow-2xl shadow-black/80 animate-in zoom-in-95 duration-200 overflow-hidden"
          >
            <div className="p-6 md:p-10 flex-1">
              <h2 className="text-2xl font-bold mb-8 tracking-tight text-white">
                Create New Project
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => {
                          setNewName(e.target.value);
                          if (
                            !newSlug ||
                            newSlug ===
                              newName.toLowerCase().replace(/[^a-z0-9]/g, "-")
                          ) {
                            setNewSlug(
                              e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9]/g, "-"),
                            );
                          }
                        }}
                        className="w-full px-4 py-2 bg-[#161616] border border-white/[0.08] rounded-lg focus:border-indigo-500 outline-none font-medium text-sm transition-all text-white placeholder:text-gray-700"
                        placeholder="My Portfolio"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">
                        URL Slug
                      </label>
                      <div className="flex items-center">
                        <span className="text-gray-700 font-bold mr-1">/</span>
                        <input
                          type="text"
                          value={newSlug}
                          onChange={(e) => setNewSlug(e.target.value)}
                          className={`flex-1 px-4 py-2 bg-[#161616] border rounded-lg focus:border-indigo-500 outline-none font-mono text-xs transition-all ${isAvailable === false ? "border-red-500/50 text-red-400 bg-red-500/10" : "border-white/[0.08] text-white"}`}
                          placeholder="portfolio-24"
                          required
                        />
                      </div>
                      {newSlug && (
                        <div className="mt-1.5 flex items-center gap-1.5">
                          {isAvailable === undefined ? (
                            <div className="w-2 h-2 rounded-full bg-gray-700 animate-pulse" />
                          ) : isAvailable ? (
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                          )}
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider ${isAvailable === undefined ? "text-gray-600" : isAvailable ? "text-green-500" : "text-red-500"}`}
                          >
                            {isAvailable === undefined
                              ? "Checking availability..."
                              : isAvailable
                                ? "Available"
                                : "Already taken"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Select Template
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {TEMPLATES.map((tmpl) => (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => setSelectedTemplate(tmpl)}
                        className={`relative flex items-center gap-3 text-left p-3 rounded-lg border transition-all ${
                          selectedTemplate?.id === tmpl.id
                            ? "border-white/[0.1] bg-white/[0.04]"
                            : "border-white/[0.04] hover:border-white/[0.08]"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            tmpl.style === "Modern"
                              ? "bg-indigo-500"
                              : tmpl.style === "Minimal"
                                ? "bg-white"
                                : tmpl.style === "Aesthetic"
                                  ? "bg-pink-500"
                                  : "bg-amber-500"
                          }`}
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-xs text-white leading-tight">
                            {tmpl.name}
                          </h4>
                          <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
                            {tmpl.description.split(".")[0]}
                          </p>
                        </div>
                        {selectedTemplate?.id === tmpl.id && (
                          <Check size={12} className="text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#161616] border-t border-white/[0.04] flex gap-4">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="flex-1 py-2 text-gray-500 font-bold text-sm hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isAvailable === false}
                className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 ${isAvailable === false ? "bg-white/[0.02] text-gray-700 cursor-not-allowed border border-white/[0.04]" : "bg-white text-black hover:bg-gray-200"}`}
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Feedback Modal */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleFeedbackSubmit}
            className="bg-[#161616] w-full max-w-md my-auto p-6 md:p-10 rounded-xl border border-white/[0.08] shadow-2xl animate-in zoom-in-95 duration-200 shadow-black/50"
          >
            <h2 className="text-2xl font-bold mb-2 tracking-tight text-white">
              Send Feedback
            </h2>
            <p className="text-gray-500 text-sm mb-6 font-medium">
              Found a bug or have a suggestion? Let us know!
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                  Feedback Category
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFeedbackType("problem")}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition-all ${
                      feedbackType === "problem"
                        ? "border-red-500/50 bg-red-500/10 text-red-500 shadow-sm"
                        : "border-white/[0.04] text-gray-500 hover:border-white/[0.08]"
                    }`}
                  >
                    Report Bug
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackType("rating")}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition-all ${
                      feedbackType === "rating"
                        ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-400 shadow-sm"
                        : "border-white/[0.04] text-gray-500 hover:border-white/[0.08]"
                    }`}
                  >
                    Site Rating
                  </button>
                </div>
              </div>

              {feedbackType === "rating" && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRating(star)}
                        className="p-1 group transition-all"
                      >
                        <Star
                          size={24}
                          className={`transition-all ${
                            star <= feedbackRating
                              ? "fill-amber-400 text-amber-400 scale-110"
                              : "text-gray-800 group-hover:text-amber-500/20"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                  Your Message
                </label>
                <textarea
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  className="w-full h-32 px-4 py-3 bg-[#0b0b0b] border border-white/[0.08] rounded-lg focus:border-indigo-500 outline-none text-sm transition-all resize-none text-white placeholder:text-gray-700"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setIsFeedbackOpen(false)}
                className="flex-1 py-2 text-gray-500 font-bold hover:text-white transition-colors"
                disabled={isSendingFeedback}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSendingFeedback || !feedbackMessage.trim()}
                className="flex-[2] bg-white text-black py-2.5 rounded-lg font-bold hover:bg-gray-200 transition-all shadow-xl shadow-white/5 active:scale-95 disabled:bg-white/[0.02] disabled:text-gray-700 disabled:shadow-none"
              >
                {isSendingFeedback ? "Sending..." : "Submit Feedback"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
