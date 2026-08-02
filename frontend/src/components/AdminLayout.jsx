import React from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { to: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/admin/companies', icon: 'domain', label: 'Company Settings' },
  { to: '/admin/projects', icon: 'architecture', label: 'Projects' },
  { to: '/admin/gallery', icon: 'collections', label: 'Gallery' },
  { to: '/admin/team', icon: 'group', label: 'Team' },
  { to: '/admin/blog', icon: 'edit_note', label: 'Articles' },
  { to: '/admin/messages', icon: 'mail', label: 'Messages' },
];

const AdminLayout = () => {
  const { user, logout, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-ink">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          <p className="font-sans text-sm text-luxury-muted tracking-wide">Establishing secure session…</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const pageTitle = NAV.find((n) => location.pathname.startsWith(n.to))?.label || 'Dashboard';

  return (
    <div className="flex min-h-screen bg-cream">
      {/* ===== Sidebar ===== */}
      <aside className="w-64 luxe-dark h-screen fixed left-0 top-0 z-40 flex flex-col border-r border-gold/15">
        <div className="px-6 py-7 border-b border-gold/10">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-bold text-ivory">GEO</span>
            <span className="font-display text-2xl font-bold text-gradient-gold">Group</span>
          </div>
          <p className="text-[10px] font-semibold text-gold/70 uppercase tracking-luxe mt-1">Admin Terminal</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {NAV.map((item) => {
            const active = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[13px] transition-all duration-200 ${
                  active
                    ? 'text-ink bg-gold-gradient shadow-luxe-gold font-semibold'
                    : 'text-luxury-muted hover:text-champagne hover:bg-ink-700/60'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gold/10">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-ink font-bold text-sm shadow-luxe-gold">
              {user.username.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-semibold text-xs text-champagne truncate">{user.username}</p>
              <p className="text-[10px] text-luxury-muted capitalize">{user.role}</p>
            </div>
            <button onClick={handleLogout} className="text-luxury-muted hover:text-gold transition-colors" title="Sign Out">
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ===== Main ===== */}
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-ivory/90 backdrop-blur-xl border-b border-gold/15 flex items-center justify-between px-8">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-on-surface-variant">Admin</span>
            <span className="material-symbols-outlined text-gold text-[16px]">chevron_right</span>
            <span className="font-semibold text-ink">{pageTitle}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" target="_blank" className="btn-outline-gold text-gold-deep border-gold-deep/40 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span> View Site
            </Link>
          </div>
        </header>

        <main className="flex-grow p-8 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
