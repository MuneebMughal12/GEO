import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="font-display font-semibold text-primary">Loading secure session...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Link to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'sidebar-active text-on-secondary-fixed font-bold bg-[#e0e0ff]' : 'text-on-surface-variant hover:bg-surface-container-high';
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white/70 backdrop-blur-xl h-screen fixed left-0 top-0 z-40 flex flex-col border-r border-outline-variant/20 shadow-[0px_10px_30px_rgba(0,35,102,0.05)]">
        <div className="px-6 py-8">
          <span className="font-display text-2xl font-bold text-primary">GEO Group</span>
          <p className="text-[10px] font-semibold text-outline-variant uppercase tracking-widest mt-1">Admin Terminal</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link to="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-xs transition-all duration-200 ${isActive('/admin/dashboard')}`}>
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/companies" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-xs transition-all duration-200 ${isActive('/admin/companies')}`}>
            <span className="material-symbols-outlined">domain</span>
            <span>Company Management</span>
          </Link>
          <Link to="/admin/projects" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-xs transition-all duration-200 ${isActive('/admin/projects')}`}>
            <span className="material-symbols-outlined">architecture</span>
            <span>Projects</span>
          </Link>
          <Link to="/admin/gallery" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-xs transition-all duration-200 ${isActive('/admin/gallery')}`}>
            <span className="material-symbols-outlined">collections</span>
            <span>Gallery</span>
          </Link>
          <Link to="/admin/team" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-xs transition-all duration-200 ${isActive('/admin/team')}`}>
            <span className="material-symbols-outlined">group</span>
            <span>Team</span>
          </Link>
          <Link to="/admin/blog" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-xs transition-all duration-200 ${isActive('/admin/blog')}`}>
            <span className="material-symbols-outlined">edit_note</span>
            <span>Articles</span>
          </Link>
          <Link to="/admin/messages" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-xs transition-all duration-200 ${isActive('/admin/messages')}`}>
            <span className="material-symbols-outlined">mail</span>
            <span>Messages</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-outline-variant/10">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-sm">
              {user.username.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-semibold text-xs text-primary truncate">{user.username}</p>
              <p className="text-[10px] text-on-surface-variant capitalize">{user.role}</p>
            </div>
            <button onClick={handleLogout} className="material-symbols-outlined text-outline hover:text-error transition-colors" title="Sign Out">
              logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        <main className="flex-grow p-margin-desktop bg-surface-bright">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
