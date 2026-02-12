import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SiteProvider } from "./context/SiteContext";

// Lazy load components
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Editor = lazy(() => import("./components/Editor"));
const Site = lazy(() => import("./components/Site"));
const Docs = lazy(() => import("./components/Docs"));
const Analytics = lazy(() => import("./components/Analytics"));
const Landing = lazy(() => import("./components/Pages/Landing"));
const PrivacyPolicy = lazy(() => import("./components/Pages/PrivacyPolicy"));
const Showcase = lazy(() => import("./components/Pages/Showcase"));

// Message page
const MessagePage = lazy(() => import("./components/Pages/MessagePage"));

// Profile page
const ProfilePage = lazy(() => import("./components/Pages/ProfilePage"));

// Minimal Loading Fallback
const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center bg-[#0b0b0b] font-sans overflow-hidden">
    <div className="flex flex-col items-center gap-10 text-white">
      <div className="relative">
        <div className="font-black text-3xl tracking-tighter animate-pulse duration-[2000ms] select-none text-white">
          nekoneko
        </div>
      </div>
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
);

function App() {
  const getIsSubdomain = () => {
    const hostname = window.location.hostname;
    if (hostname.startsWith("www.")) return false;

    // Check for localhost or lvh.me
    if (hostname.includes("localhost") || hostname.includes("lvh.me")) {
      const parts = hostname.split(".");
      return parts.length > 1;
    }

    // Check for custom domain (e.g., slug.nekoneko.space)
    const parts = hostname.split(".");
    return parts.length >= 3;
  };

  const isSubdomain = getIsSubdomain();

  if (isSubdomain) {
    return (
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <div className="antialiased">
            <Routes>
              <Route
                path="*"
                element={
                  <SiteProvider>
                    <Site />
                  </SiteProvider>
                }
              />
            </Routes>
          </div>
        </Suspense>
      </Router>
    );
  }

  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <div className="antialiased">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/analytics/:projectId" element={<Analytics />} />
            <Route path="/message" element={<MessagePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/editor/:projectId"
              element={
                <SiteProvider>
                  <Editor />
                </SiteProvider>
              }
            />
            <Route
              path="/:slug"
              element={
                <SiteProvider>
                  <Site />
                </SiteProvider>
              }
            />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/" element={<Landing />} />
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center min-h-screen font-black text-2xl uppercase tracking-tighter">
                  404 - Page Not Found
                </div>
              }
            />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
