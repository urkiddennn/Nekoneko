import React from "react";
import { useNavigate } from "react-router-dom";
const Footer: React.FC = () => {
  const navigate = useNavigate();
  // navigate to privacy policy
  const handlePrivacyPolicy = () => {
    navigate("/privacy");
  };
  return (
    <footer className="py-12 border-t border-white/[0.04] px-8 bg-[#0b0b0b]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-black text-xl tracking-tighter text-white">nekoneko</div>
        <div className="flex gap-8">
          <a
            href="#"
            className="text-xs font-bold text-gray-500 hover:text-white transition-colors"
          >
            Email
          </a>
          <a
            href="#"
            className="text-xs font-bold text-gray-500 hover:text-white transition-colors"
          >
            Discord
          </a>
          <a
            href="#"
            className="text-xs font-bold text-gray-500 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            onClick={handlePrivacyPolicy}
            className="text-xs font-bold text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            Privacy
          </a>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-700">
          © 2026 Nekoneko Studio
        </p>
      </div>
    </footer>
  );
};

export default Footer;
