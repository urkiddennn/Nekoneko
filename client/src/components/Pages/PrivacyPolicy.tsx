import React from "react";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import { SendHorizontal } from "lucide-react";
const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <NavigationBar />
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 ">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Privacy Policy
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="max-w-xl mx-auto text-gray-500 font-medium leading-relaxed md:text-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You.
            </p>

            <form className="w-max-9xl flex flex-col justify-normal items-center">
              <h2 className="font-black text-3xl relative z-10 mt-10 mb-5">
                Contact Us
              </h2>
              <p className="text-gray-500 font-medium">
                If you have any questions about this Privacy Policy, You can
                contact us:
              </p>
              <div className="w-full md:w-1/2 flex flex-col gap-4 mt-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="outline-none border-gray-900 border-b border-t-0 border-r-0 border-l-0 p-2 border-solid"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="outline-none border-gray-900 border-b border-t-0 border-r-0 border-l-0 p-2 border-solid"
                />
                <textarea
                  placeholder="Message"
                  className="outline-none border-gray-900 border-b border-t-0 border-r-0 border-l-0 p-2 border-solid"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
                >
                  Submit
                  <SendHorizontal size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
