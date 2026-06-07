import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    team: 0,
    gallery: 0,
    messages: 0
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await API.get('/dashboard');
        if (res.data.success) {
          setStats(res.data.stats);
          setActivities(res.data.activities);
        }
      } catch (err) {
        console.error('Error fetching dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardStats();
  }, []);

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary tracking-tight">Executive Dashboard</h1>
          <p className="text-on-surface-variant font-sans text-sm mt-1">Welcome back. Here is what is happening across the GEO Group today.</p>
        </div>
      </header>

      {loading ? (
        <p className="text-on-surface-variant">Loading operations overview...</p>
      ) : (
        <>
          {/* Analytics Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Total Projects */}
            <div className="glass-panel p-6 rounded-2xl card-hover flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary-fixed/30 rounded-xl text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>apartment</span>
                </div>
                <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">trending_up</span> +12%
                </span>
              </div>
              <div>
                <h3 className="text-on-surface-variant font-display font-semibold text-xs uppercase tracking-wider">Total Projects</h3>
                <p className="text-on-surface font-display text-4xl font-bold mt-1">{stats.projects}</p>
              </div>
            </div>

            {/* Gallery Images */}
            <div className="glass-panel p-6 rounded-2xl card-hover flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-secondary-container/20 rounded-xl text-secondary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>image</span>
                </div>
                <span className="text-on-surface-variant font-bold text-xs">Total Assets</span>
              </div>
              <div>
                <h3 className="text-on-surface-variant font-display font-semibold text-xs uppercase tracking-wider">Gallery Images</h3>
                <p className="text-on-surface font-display text-4xl font-bold mt-1">{stats.gallery}</p>
              </div>
            </div>

            {/* Active Services */}
            <div className="glass-panel p-6 rounded-2xl card-hover flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-tertiary-fixed/30 rounded-xl text-tertiary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>engineering</span>
                </div>
                <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">check_circle</span> Live
                </span>
              </div>
              <div>
                <h3 className="text-on-surface-variant font-display font-semibold text-xs uppercase tracking-wider">Active Services</h3>
                <p className="text-on-surface font-display text-4xl font-bold mt-1">{stats.services}</p>
              </div>
            </div>

            {/* New Messages */}
            <div className="glass-panel p-6 rounded-2xl card-hover flex flex-col gap-4 border-l-4 border-secondary">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-secondary-fixed/50 rounded-xl text-on-secondary-fixed-variant">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
                </div>
                {stats.messages > 0 && <div className="h-2 w-2 rounded-full bg-error animate-pulse" />}
              </div>
              <div>
                <h3 className="text-on-surface-variant font-display font-semibold text-xs uppercase tracking-wider">New Messages</h3>
                <p className="text-on-surface font-display text-4xl font-bold mt-1">{stats.messages}</p>
              </div>
            </div>
          </div>

          {/* Secondary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {/* Division Status Card */}
            <div className="lg:col-span-1 glass-panel rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-display text-lg font-bold text-primary">Division Status</h2>
                  <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">more_vert</span>
                </div>
                <div className="space-y-6">
                  {/* ARC */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-on-primary">
                        <span className="material-symbols-outlined">architecture</span>
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm text-primary">GEO ARC</p>
                        <p className="text-[10px] text-on-surface-variant">Architectural Resources</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-600">Operational</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>
                  </div>

                  {/* Soil Testing */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-white">
                        <span className="material-symbols-outlined">science</span>
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm text-primary">GEO Soil</p>
                        <p className="text-[10px] text-on-surface-variant">Geotechnical Analysis</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-600">Operational</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>
                  </div>

                  {/* Construction */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-tertiary-container flex items-center justify-center text-on-tertiary-fixed-variant">
                        <span className="material-symbols-outlined">construction</span>
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm text-primary">GEO Construction</p>
                        <p className="text-[10px] text-on-surface-variant">Civil Infrastructure</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-600">Operational</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="lg:col-span-2 glass-panel rounded-2xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-display text-lg font-bold text-primary">Recent Activity</h2>
              </div>
              <div className="space-y-8 relative before:content-[''] before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[1px] before:bg-outline-variant/30">
                {activities.map((act) => (
                  <div key={act.id} className="flex gap-6 relative z-10">
                    <div className={`w-10 h-10 rounded-full bg-white border-2 ${act.color} flex items-center justify-center text-primary`}>
                      <span className="material-symbols-outlined text-[20px]">{act.icon}</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-display font-semibold text-xs text-on-surface">{act.title}</h4>
                        <span className="text-[10px] text-outline-variant">{act.time}</span>
                      </div>
                      <p className="text-on-surface-variant font-sans text-xs mt-1 leading-relaxed">{act.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
