import React, { useState } from "react";
import Header from "../Header";
import { useAuth } from "../../hooks/useAuth";
import { setAuthData } from "../../utils/authUtils";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { User, Mail, ArrowLeft, Loader2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { user, token, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const updateUserAction = useAction(api.auth.updateUser);

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Sync name with user after loading
  React.useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setIsUpdating(true);
    setMessage(null);

    try {
      const updatedUser = await updateUserAction({ token, name });
      setAuthData({ token, user: updatedUser });
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to update profile" });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />

      <main className="pt-32 pb-20 px-8 max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-gray-500 mt-2">Manage your account details.</p>
        </div>

        <div className="max-w-2xl border border-gray-200 rounded p-8 space-y-10">
          <div className="flex items-center gap-6 pb-10 border-b border-gray-100">
            <div className="w-20 h-20 rounded-full border border-gray-200 overflow-hidden">
              <img
                src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user.name}`}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-bold text-xl">{user.name}</h2>
              <p className="text-xs text-gray-400 font-mono italic">/{user.name.toLowerCase().replace(/\s+/g, '-')}</p>
            </div>
          </div>

          <form onSubmit={handleUpdateName} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  Display Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded focus:border-gray-900 outline-none transition-all font-medium text-sm"
                    placeholder="Your Name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full pl-9 pr-4 py-2 border border-gray-100 bg-gray-50/50 rounded text-gray-400 cursor-not-allowed font-medium text-sm"
                  />
                </div>
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded text-xs font-bold uppercase tracking-wider ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                {message.text}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isUpdating || name === user.name}
                className="bg-gray-900 text-white px-8 py-2.5 rounded font-bold text-sm flex items-center gap-2 hover:bg-black transition-all active:scale-95 disabled:opacity-30 disabled:active:scale-100 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
