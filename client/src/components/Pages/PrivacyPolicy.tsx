import React from "react";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import { SendHorizontal } from "lucide-react";
import { SEO } from "../SEO";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <SEO
        title="Privacy Policy"
        description="Read our privacy policy to understand how we handle your data."
      />
      <NavigationBar />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1000">
              Privacy Policy
            </h1>
            <p className="max-w-2xl mx-auto text-gray-500 font-medium leading-relaxed text-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You.
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="mt-20 pt-16 border-t border-gray-100">
            <div className="text-center mb-12">
              <h2 className="font-black text-4xl mb-4">
                Contact Us
              </h2>
              <p className="text-gray-500 font-medium text-lg">
                If you have any questions about this Privacy Policy, You can
                contact us:
              </p>
            </div>

            <form className="max-w-xl mx-auto space-y-6">
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full outline-none border-b-2 border-gray-200 focus:border-gray-900 p-3 transition-colors bg-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full outline-none border-b-2 border-gray-200 focus:border-gray-900 p-3 transition-colors bg-transparent"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full outline-none border-b-2 border-gray-200 focus:border-gray-900 p-3 transition-colors bg-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
              >
                Submit
                <SendHorizontal size={16} />
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
