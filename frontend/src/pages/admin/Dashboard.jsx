import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const StatCard = ({ icon, label, value, tone, badge }) => (
  <div className="luxe-card bg-white/80 p-6 rounded-2xl flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${tone}`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      </div>
      {badge}
    </div>
    <div>
      <h3 className="text-on-surface-variant font-sans font-semibold text-[11px] uppercase tracking-wider">{label}</h3>
      <p className="text-ink font-display text-4xl font-bold mt-1">{value}</p>
    </div>
  </div>
);

// Lightweight SVG area chart (no external deps)
const AreaChart = ({ data, labels }) => {
  const w = 640, h = 180, pad = 24;
  const max = Math.max(...data, 1);
  const stepX = (w - pad * 2) / (data.length - 1 || 1);
  const points = data.map((d, i) => [pad + i * stepX, h - pad - (d / max) * (h - pad * 2)]);
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]},${p[1]}`).join(' ');
  const area = `${line} L ${points[points.length - 1][0]},${h - pad} L ${points[0][0]},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <defs>
        <linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A227" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <line key={g} x1={pad} x2={w - pad} y1={h - pad - g * (h - pad * 2)} y2={h - pad - g * (h - pad * 2)} stroke="#0A0E1A" strokeOpacity="0.06" strokeWidth="1" />
      ))}
      <path d={area} fill="url(#goldArea)" />
      <path d={line} fill="none" stroke="#C9A227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="#0A0E1A" stroke="#C9A227" strokeWidth="2" />
      ))}
      {labels.map((l, i) => (
        <text key={i} x={pad + i * stepX} y={h - 4} textAnchor="middle" fontSize="10" fill="#9AA3B8" fontFamily="Inter">{l}</text>
      ))}
    </svg>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({ projects: 0, services: 0, team: 0, gallery: 0, messages: 0 });
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

  const chartData = [12, 18, 14, 22, 19, 28, 24, 32];
  const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

  const divisions = [
    { icon: 'architecture', name: 'GEO ARC', sub: 'Architectural Resources', tone: 'bg-ink text-gold' },
    { icon: 'science', name: 'GEO Soil', sub: 'Geotechnical Analysis', tone: 'bg-ink text-gold' },
    { icon: 'construction', name: 'GEO Construction', sub: 'Civil Infrastructure', tone: 'bg-ink text-gold' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <p className="luxe-eyebrow mb-2">Overview</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink tracking-tight">Executive Dashboard</h1>
          <p className="text-on-surface-variant font-sans text-sm mt-1">Welcome back — here is what is happening across the GEO Group today.</p>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center gap-3 text-on-surface-variant py-10">
          <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          Loading operations overview…
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon="apartment" label="Total Projects" value={stats.projects} tone="bg-ink text-gold"
              badge={<span className="text-gold-deep font-bold text-xs flex items-center gap-1"><span className="material-symbols-outlined text-sm">trending_up</span> +12%</span>} />
            <StatCard icon="image" label="Gallery Assets" value={stats.gallery} tone="bg-ink text-gold"
              badge={<span className="text-on-surface-variant font-semibold text-[11px]">Media</span>} />
            <StatCard icon="engineering" label="Active Services" value={stats.services} tone="bg-ink text-gold"
              badge={<span className="text-emerald-600 font-bold text-xs flex items-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> Live</span>} />
            <StatCard icon="chat_bubble" label="New Messages" value={stats.messages} tone="bg-ink text-gold"
              badge={stats.messages > 0 ? <div className="h-2.5 w-2.5 rounded-full bg-error animate-pulse" /> : null} />
          </div>

          {/* Chart */}
          <div className="luxe-card bg-white/80 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-display text-lg font-bold text-ink">Engagement Overview</h2>
                <p className="text-xs text-on-surface-variant">Monthly enquiries &amp; project activity</p>
              </div>
              <span className="text-xs text-gold-deep font-semibold uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gold" /> Trending Up
              </span>
            </div>
            <AreaChart data={chartData} labels={chartLabels} />
          </div>

          {/* Secondary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 luxe-card bg-white/80 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-lg font-bold text-ink">Division Status</h2>
              </div>
              <div className="space-y-4">
                {divisions.map((d) => (
                  <div key={d.name} className="flex items-center justify-between p-4 rounded-xl border border-gold/15 hover:border-gold/40 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${d.tone}`}>
                        <span className="material-symbols-outlined">{d.icon}</span>
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm text-ink">{d.name}</p>
                        <p className="text-[10px] text-on-surface-variant">{d.sub}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-600">Operational</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 luxe-card bg-white/80 rounded-2xl p-8">
              <h2 className="font-display text-lg font-bold text-ink mb-6">Recent Activity</h2>
              {activities.length > 0 ? (
                <div className="space-y-6 relative before:content-[''] before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-gold/20">
                  {activities.map((act) => (
                    <div key={act.id} className="flex gap-5 relative z-10">
                      <div className="w-10 h-10 rounded-full bg-ink border border-gold/40 flex items-center justify-center text-gold flex-shrink-0">
                        <span className="material-symbols-outlined text-[20px]">{act.icon}</span>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="font-display font-semibold text-sm text-ink">{act.title}</h4>
                          <span className="text-[10px] text-on-surface-variant">{act.time}</span>
                        </div>
                        <p className="text-on-surface-variant font-sans text-xs mt-1 leading-relaxed">{act.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-on-surface-variant text-sm py-6 text-center">No recent activity to display.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
