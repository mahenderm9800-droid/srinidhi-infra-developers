import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Lock, Mail, AlertTriangle, KeyRound } from 'lucide-react';
import { login, onAuthStateChanged } from '../services/auth';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to admin panel
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        navigate('/admin');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      if (err.message === "auth/invalid-credential" || err.code === "auth/invalid-credential") {
        setError("Invalid email or password. For offline preview, use admin@srinidhi.com / admin123");
      } else {
        setError(err.message || "Login failed. Please check your network or configuration.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center px-4 py-12">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-2xl space-y-6">
        
        {/* Logo and Headings */}
        <div className="text-center">
          <div className="mx-auto bg-gradient-to-tr from-accent-500 to-accent-600 p-3 rounded-xl text-white shadow-md inline-block mb-3">
            <Building2 className="h-7 w-7" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white tracking-wide">
            Admin Console
          </h1>
          <span className="text-[10px] uppercase tracking-[0.25em] text-accent-400 font-bold block mt-1">
            Srinidhi Infra Developers
          </span>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/25 p-3 rounded-lg text-xs font-semibold text-red-400 flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-slate-300">
          <div>
            <label htmlFor="email" className="block text-slate-400 mb-1.5 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@srinidhi.com"
                className="w-full pl-10 pr-3.5 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-accent-500 text-white placeholder-slate-500 focus:bg-slate-950"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-slate-400 mb-1.5 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-accent-500 text-white placeholder-slate-500 focus:bg-slate-950"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-4 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-md hover:shadow-accent-500/10 disabled:opacity-50 mt-2"
          >
            {loading ? "Authenticating..." : "Sign In to Console"}
          </button>
        </form>

        {/* Demo Fallback Alert */}
        <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800 text-[11px] text-slate-550 leading-normal flex items-start space-x-2.5">
          <KeyRound className="h-4.5 w-4.5 text-accent-500/70 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-400 mb-0.5">Development Fallback Mode</p>
            <p>If Firebase isn't configured, use the default mock logins:</p>
            <p className="font-mono text-accent-400/90 mt-1 font-bold">Email: admin@srinidhi.com <br />Password: admin123</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
