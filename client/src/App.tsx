import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import Site from './components/Site';

function App() {
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
  )
}

export default App
