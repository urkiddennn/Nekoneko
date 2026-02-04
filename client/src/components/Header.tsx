import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const user = JSON.parse(localStorage.getItem("neko_user") || "null");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("neko_user");
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white fixed top-0 w-full z-10">
            <div
                className="font-black text-xl tracking-tighter cursor-pointer"
                onClick={() => navigate("/dashboard")}
            >
                nekoneko
            </div>
            <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-gray-500">{user.name}</span>
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
