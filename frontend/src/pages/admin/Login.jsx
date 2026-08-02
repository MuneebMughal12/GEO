import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen luxe-dark luxe-grain px-6 relative overflow-hidden">
      <SEO title="Admin Login | GEO Group Terminal" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,162,39,0.12),transparent_55%)]" />

      <div className="relative z-10 luxe-card-dark rounded-3xl p-10 max-w-md w-full shadow-luxe space-y-8">
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1.5 mb-3">
            <span className="font-display text-3xl font-bold text-ivory">GEO</span>
            <span className="font-display text-3xl font-bold text-gradient-gold">Group</span>
          </div>
          <p className="luxe-eyebrow center justify-center">Admin Terminal</p>
          <p className="font-sans text-xs text-luxury-muted mt-3">Please verify your credentials to continue.</p>
        </div>

        {error && (
          <div className="p-4 bg-error/15 border border-error/30 text-red-300 text-xs font-semibold rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-sans font-semibold text-[11px] uppercase tracking-wider text-gold/80">Administrator Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@geogroup.global"
              className="px-4 py-3 rounded-xl border border-gold/25 bg-ink-700/50 text-ivory placeholder:text-luxury-muted/60 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none text-sm transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-sans font-semibold text-[11px] uppercase tracking-wider text-gold/80">Secure Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="px-4 py-3 rounded-xl border border-gold/25 bg-ink-700/50 text-ivory placeholder:text-luxury-muted/60 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none text-sm transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-4 rounded-xl font-semibold uppercase tracking-wider text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-ink/40 border-t-ink rounded-full animate-spin" /> Verifying…</>
            ) : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
