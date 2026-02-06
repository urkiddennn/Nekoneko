import React from "react";
import { useNavigate } from "react-router-dom";
const Footer: React.FC = () => {
  const navigate = useNavigate();
  // navigate to privacy policy
  const handlePrivacyPolicy = () => {
    navigate("/privacy");
  };
  return (
    <footer className="py-12 border-t border-gray-100 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-black text-xl tracking-tighter">nekoneko</div>
        <div className="flex gap-8">
          <a
            href="#"
            className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors"
          >
            Email
          </a>
          <a
            href="#"
            className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors"
          >
            Discord
          </a>
          <a
            href="#"
            className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
          <a
            onClick={handlePrivacyPolicy}
            className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors"
          >
            Privacy
          </a>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">
          © 2026 Nekoneko Studio
        </p>
      </div>
    </footer>
  );
};

export default Footer;
