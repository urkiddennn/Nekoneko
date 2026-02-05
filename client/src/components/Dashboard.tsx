import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";
import { Plus, Globe, Settings, Check, TrendingUp } from "lucide-react";
import { TEMPLATES, Template } from "../data/templates";
import Header from "./Header";
import { getUser, getToken } from "../utils/authUtils";

const Dashboard: React.FC = () => {
  const user = getUser();
  const token = getToken() || "";
  const navigate = useNavigate();

  if (!user) {
    setTimeout(() => navigate("/login"), 0);
    return null;
  }

  const projects = useQuery(api.config.listProjects, token ? { token } : "skip");
  const createProject = useMutation(api.config.createProject);
  const deleteProject = useMutation(api.config.deleteProject);



  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(TEMPLATES[0]);
  const [projectToDelete, setProjectToDelete] = useState<any>(null);
  const [projectToEdit, setProjectToEdit] = useState<any>(null);
  const [debouncedSlug, setDebouncedSlug] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSlug(newSlug.toLowerCase().replace(/[^a-z0-9]/g, "-"));
    }, 500);
    return () => clearTimeout(timer);
  }, [newSlug]);

  const isAvailable = useQuery(api.config.checkSlugAvailable, { slug: debouncedSlug });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAvailable === false) return;
    try {
      const id = await createProject({
        token,
        name: newName,
        slug: newSlug.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        site_settings: selectedTemplate?.site_settings ? { ...selectedTemplate.site_settings, name: newName } : undefined,
        sections: selectedTemplate?.sections || undefined,
      });
      navigate(`/editor/${id}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    try {
      await deleteProject({ token, id: projectToDelete._id });
      setProjectToDelete(null);
      setProjectToEdit(null); // Close the edit actions menu too
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />


      <main className="pt-32 px-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>
            <p className="text-gray-500 mt-2">
              Manage and view your static sites.
            </p>
          </div>
          <div className="flex gap-3">

            <button
              onClick={() => setIsCreating(true)}
              className="bg-gray-900 text-white px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-black transition-all active:scale-95"
            >
              <Plus size={18} />
              New Project
            </button>
          </div>
        </div>

        {projects === undefined ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-gray-50 animate-pulse rounded border border-gray-100"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">
              No projects yet. Create your first one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <div
                key={project._id}
                className="group border border-gray-200 rounded p-6 hover:border-gray-900 transition-all flex flex-col justify-between h-48 relative"
              >
                <div>
                  <h3 className="font-bold text-lg mb-1">{project.name}</h3>
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
                    className="flex-1 border border-gray-200 py-1.5 rounded text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Settings size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      const protocol = window.location.protocol;
                      const host = window.location.host;
                      window.open(`${protocol}//${project.slug}.${host}`, "_blank");
                    }}
                    className="flex-1 bg-gray-50 py-1.5 rounded text-xs font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Globe size={14} />
                    Live
                  </button>
                  <button
                    onClick={() => navigate(`/analytics/${project._id}`)}
                    className="p-1.5 px-2 border border-gray-100 rounded text-gray-400 hover:text-indigo-600 hover:bg-slate-50 transition-all"
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
                      <div className="absolute top-1/5 -right-11 mb-2 w-48 bg-white border border-gray-200 rounded-lg shadow-sm z-30 py-1 animate-in slide-in-from-bottom-2 duration-200">
                        <button
                          onClick={() => navigate(`/editor/${project._id}`)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs font-bold flex items-center gap-2"
                        >
                          <Settings size={14} className="text-gray-400" />
                          Edit Content
                        </button>
                        <button
                          onClick={() => navigate(`/analytics/${project._id}`)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs font-bold flex items-center gap-2 border-t border-gray-50"
                        >
                          <TrendingUp size={14} className="text-gray-400" />
                          View Analytics
                        </button>
                        <button
                          onClick={() => setProjectToDelete(project)}
                          className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-xs font-bold flex items-center gap-2 border-t border-gray-50"
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-2">Delete Project?</h2>
            <p className="text-gray-500 text-sm mb-8">
              Are you sure you want to delete{" "}
              <span className="font-bold text-gray-900">
                "{projectToDelete.name}"
              </span>
              ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setProjectToDelete(null)}
                className="flex-1 py-2 text-gray-500 font-bold hover:text-gray-900 border border-transparent"
              >
                Keep It
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-200 rounded shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden"
          >
            <div className="p-8 flex-1 overflow-y-auto">
              <h2 className="text-xl font-bold mb-6 tracking-tight">Create New Project</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                          if (!newSlug || newSlug === newName.toLowerCase().replace(/[^a-z0-9]/g, "-")) {
                            setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded focus:border-gray-900 outline-none font-medium text-sm transition-all"
                        placeholder="My Portfolio"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">
                        URL Slug
                      </label>
                      <div className="flex items-center">
                        <span className="text-gray-300 font-bold mr-1">/</span>
                        <input
                          type="text"
                          value={newSlug}
                          onChange={(e) => setNewSlug(e.target.value)}
                          className={`flex-1 px-3 py-2 border rounded focus:border-gray-900 outline-none font-mono text-xs transition-all ${isAvailable === false ? 'border-red-500 bg-red-50 text-red-900' : 'border-gray-200'}`}
                          placeholder="portfolio-24"
                          required
                        />
                      </div>
                      {newSlug && (
                        <div className="mt-1.5 flex items-center gap-1.5">
                          {isAvailable === undefined ? (
                            <div className="w-2 h-2 rounded-full bg-gray-200 animate-pulse" />
                          ) : isAvailable ? (
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                          )}
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${isAvailable === undefined ? 'text-gray-400' : isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                            {isAvailable === undefined ? 'Checking availability...' : isAvailable ? 'Available' : 'Already taken'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select Template</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {TEMPLATES.map((tmpl) => (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => setSelectedTemplate(tmpl)}
                        className={`relative flex items-center gap-3 text-left p-3 rounded border transition-all ${selectedTemplate?.id === tmpl.id
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-100 hover:border-gray-200"
                          }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${tmpl.style === 'Modern' ? 'bg-indigo-500' :
                          tmpl.style === 'Minimal' ? 'bg-gray-900' :
                            tmpl.style === 'Aesthetic' ? 'bg-pink-500' :
                              'bg-amber-500'
                          }`} />
                        <div className="flex-1">
                          <h4 className="font-bold text-xs text-gray-900 leading-tight">{tmpl.name}</h4>
                          <p className="text-[10px] text-gray-400 leading-tight mt-0.5">
                            {tmpl.description.split('.')[0]}
                          </p>
                        </div>
                        {selectedTemplate?.id === tmpl.id && (
                          <Check size={12} className="text-gray-900" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="flex-1 py-2 text-gray-500 font-bold text-sm hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isAvailable === false}
                className={`flex-1 py-2 rounded font-bold text-sm transition-all active:scale-95 ${isAvailable === false ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' : 'bg-gray-900 text-white hover:bg-black'}`}
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
