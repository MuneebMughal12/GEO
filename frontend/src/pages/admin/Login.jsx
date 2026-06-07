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
    <div className="flex items-center justify-center min-h-screen bg-background px-6">
      <SEO title="Admin Login | GEO Group Terminal" />
      <div className="bg-white/70 backdrop-blur-xl border border-outline-variant/30 rounded-3xl p-10 max-w-md w-full shadow-2xl space-y-8">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-primary">GEO Group</h1>
          <p className="font-sans text-xs text-on-surface-variant mt-2">Executive Admin Terminal. Please verify your credentials.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 text-xs font-semibold rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-1.5">
            <label className="font-display font-bold text-xs text-primary">Administrator Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@geogroup.global"
              className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm bg-background/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-display font-bold text-xs text-primary">Secure Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm bg-background/50"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-primary text-on-primary rounded-xl font-display font-semibold hover:bg-primary-container transition-colors disabled:opacity-50 flex items-center justify-center shadow-lg"
          >
            {loading ? 'Verifying Identity...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
