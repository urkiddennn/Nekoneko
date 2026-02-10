import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../Header";
const MessagePage: React.FC = () => {
  const navigate = useNavigate();
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
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-gray-500 mt-2">Manage your messages</p>
        </div>

        <div className="max-w-2xl h-full border gap-2 border-gray-200 rounded p-8 py-2 flex space-y-8">
          <div className="h-full w-1/4 flex items-center gap-6 pb-10 border border-gray-500">
            {/*s*/}
            <div>
              {/*<h2 className="font-bold text-xl">{user.name}</h2>*/}
              {/*<p className="text-xs text-gray-400 font-mono italic">
                /{user.name.toLowerCase().replace(/\s+/g, "-")}
              </p>*/}
            </div>
          </div>
          <div className="w-3/4 h-full border border-gray-500">s</div>
        </div>
      </main>
    </div>
  );
};

export default MessagePage;
