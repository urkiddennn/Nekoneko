import React, { useState } from "react";
import { LogOut, Menu, X, User as UserIcon, Mail, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleProfile = () => {
    navigate("/profile");
    setIsMenuOpen(false);
  };

  const handleMessage = () => {
    navigate("/message");
    setIsMenuOpen(false);
  };

  const handleDocs = () => {
    navigate("/docs");
    setIsMenuOpen(false);
  }

  if (!user) return null;

  return (
    <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 md:px-8 bg-[#0b0b0b]/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div
        className="font-black text-xl tracking-tighter cursor-pointer text-white"
        onClick={() => {
          navigate("/dashboard");
          setIsMenuOpen(false);
        }}
      >
        nekoneko
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">

        <div className="relative">
          <button
            className="w-10 h-10 overflow-hidden border border-white/10 rounded-full hover:border-white/40 duration-100 transition-all active:scale-95"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <img
              src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.name}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>

          {isProfileOpen && (
            <div className="absolute top-15 right-0 w-64 p-4 bg-[#161616] border border-white/[0.08] rounded-2xl flex flex-col gap-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3 pb-4 mb-2 border-b border-white/[0.06]">
                <div className="w-10 h-10 overflow-hidden border border-white/10 rounded-full">
                  <img
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.name}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{user.name}</p>
                  <p className="text-[10px] text-gray-400 font-mono">
                    @{user.name.toLowerCase().replace(/\s+/g, "")}
                  </p>
                </div>
              </div>

              <button
                className="flex items-center gap-3 p-2 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-lg transition-all"
                onClick={() => {
                  handleProfile();
                  setIsProfileOpen(false);
                }}
              >
                <UserIcon size={14} />
                Profile
              </button>
              <button
                className="flex items-center gap-3 p-2 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-lg transition-all"
                onClick={() => {
                  handleMessage();
                  setIsProfileOpen(false);
                }}
              >
                <Mail size={14} />
                Messages
              </button>
              <button
                className="flex items-center gap-3 p-2 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-lg transition-all"

                onClick={() => {
                  handleDocs();
                  setIsProfileOpen(false);
                }}
              >
                <Book size={14} />
                Documentation
              </button>

              <div className="h-px bg-white/[0.06] my-1" />

              <button
                onClick={() => {
                  handleLogout();
                  setIsProfileOpen(false);
                }}
                className="flex items-center gap-3 p-2 text-xs font-bold text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#0b0b0b] border-b border-white/[0.06] p-6 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-200 md:hidden shadow-xl shadow-black/50">
          <div className="flex items-center gap-4 pb-6 border-b border-white/[0.04]">
            <div className="w-12 h-12 overflow-hidden border border-white/10 rounded-full">
              <img
                src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.name}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-white">{user.name}</p>
              <p className="text-xs text-gray-400 font-mono">
                @{user.name.toLowerCase().replace(/\s+/g, "")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <button
              className="text-sm font-bold tracking-widest text-gray-400 hover:text-white transition-colors text-left"
              onClick={handleMessage}
            >
              Messages
            </button>
            <button
              className="text-sm font-bold tracking-widest text-gray-400 hover:text-white transition-colors text-left"
              onClick={handleProfile}
            >
              Profile Settings
            </button>
            <button
              onClick={handleLogout}
              className="bg-white text-black px-4 py-3 rounded-lg text-xs font-bold hover:bg-gray-200 transition-all active:scale-95 text-center mt-2"
            >
              Logout Session
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
