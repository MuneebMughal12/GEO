import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Public Views
import PublicLayout from './components/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import DivisionArc from './pages/DivisionArc';
import DivisionSoil from './pages/DivisionSoil';
import DivisionConstruction from './pages/DivisionConstruction';
import LocalLandingPage from './pages/LocalLandingPage';

// Admin Views
import AdminLayout from './components/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import CompanyManagement from './pages/admin/CompanyManagement';
import ProjectManagement from './pages/admin/ProjectManagement';
import GalleryManagement from './pages/admin/GalleryManagement';
import TeamManagement from './pages/admin/TeamManagement';
import BlogManagement from './pages/admin/BlogManagement';
import MessageManagement from './pages/admin/MessageManagement';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routing */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="geo-arc" element={<DivisionArc />} />
            <Route path="geo-soil-testing" element={<DivisionSoil />} />
            <Route path="geo-construction" element={<DivisionConstruction />} />
            {/* Local SEO city landing pages */}
            <Route path=":slug" element={<LocalLandingPage />} />
          </Route>

          {/* Admin Terminal Access */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="companies" element={<CompanyManagement />} />
            <Route path="projects" element={<ProjectManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="team" element={<TeamManagement />} />
            <Route path="blog" element={<BlogManagement />} />
            <Route path="messages" element={<MessageManagement />} />
          </Route>

          {/* Redirects */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
