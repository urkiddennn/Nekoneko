import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleProfile = () => {
    navigate("/profile");
  };


  if (!user) return null;

  return (
    <div className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white fixed top-0 left-0 right-0 z-50">
      <div
        className="font-black text-xl tracking-tighter cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        nekoneko
      </div>
      <div className="flex items-center gap-6">

        <button
          className="w-10 h-10 overflow-hidden border border-slate-200 rounded-full hover:border-slate-500 duration-100"
          onClick={handleProfile}
        >
          <img src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.name}`} alt="Profile" />
        </button>

        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-gray-900 transition-colors"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

export default Header;
