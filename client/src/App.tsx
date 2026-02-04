import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import Site from './components/Site';

function App() {
  const getIsSubdomain = () => {
    const hostname = window.location.hostname;
    if (hostname.startsWith('www.')) return false;

    // Check for localhost or lvh.me
    if (hostname.includes('localhost') || hostname.includes('lvh.me')) {
      const parts = hostname.split('.');
      return parts.length > 1;
    }

    // Check for custom domain (e.g., slug.nekoneko.space)
    // Parts: ["slug", "nekoneko", "space"] -> length 3
    const parts = hostname.split('.');
    return parts.length >= 3;
  };

  const isSubdomain = getIsSubdomain();

  if (isSubdomain) {
    return (
      <Router>
        <div className="antialiased">
          <Routes>
            <Route path="*" element={<SiteProvider><Site /></SiteProvider>} />
          </Routes>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="antialiased">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor/:projectId" element={<SiteProvider><Editor /></SiteProvider>} />
          <Route path="/:slug" element={<SiteProvider><Site /></SiteProvider>} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
