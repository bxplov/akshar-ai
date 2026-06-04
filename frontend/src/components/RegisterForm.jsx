import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Logo } from './Logo';

export const RegisterForm = ({ onSwitchToLogin, onGoHome }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(name, email, password);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden z-10">
      {/* Warm ambient glow */}
      <div className="absolute top-[15%] left-[10%] w-[400px] h-[400px] bg-[rgba(252,224,123,0.08)] rounded-full blur-[100px] pointer-events-none animate-breathe" />
      <div className="absolute bottom-[15%] right-[10%] w-[350px] h-[350px] bg-[rgba(212,168,67,0.05)] rounded-full blur-[100px] pointer-events-none animate-breathe" style={{ animationDelay: '3s' }} />

      {/* ═══ Top Bar — Logo Left ═══ */}
      <nav className="px-5 sm:px-8 py-4 flex items-center justify-between relative z-20">
        <Logo onGoHome={onGoHome} />
        <button
          onClick={onGoHome}
          className="btn-ghost px-4 py-2 text-xs font-medium hover:text-charcoal transition-colors flex items-center gap-1.5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to home
        </button>
      </nav>

      {/* ═══ Auth Card ═══ */}
      <div className="flex-1 flex items-center justify-center p-5">
        <div className="w-full max-w-[420px] animate-float-in">
          <div
            className="bg-white rounded-bento p-10 relative overflow-hidden"
            style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02)' }}
          >
            {/* Top accent line — gold */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[2px] rounded-full bg-gradient-to-r from-transparent via-gold to-transparent" />

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-charcoal text-3xl font-serif tracking-tight" id="register-heading">
                Create account
              </h1>
              <p className="text-stone-500 text-base mt-3 font-sans leading-relaxed">
                Join the Akshar AI learning studio
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" id="register-form">
              {error && (
                <div key={error} className="bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3 text-rose-600 text-sm animate-shake font-medium font-sans flex items-start gap-2 shadow-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  <span>{error}</span>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-stone-500 text-[11px] font-bold uppercase tracking-widest ml-3 font-sans">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  disabled={isLoading}
                  className="input-pill"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-stone-500 text-[11px] font-bold uppercase tracking-widest ml-3 font-sans">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={isLoading}
                  className="input-pill"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-stone-500 text-[11px] font-bold uppercase tracking-widest ml-3 font-sans">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength="6"
                  disabled={isLoading}
                  className="input-pill"
                />
              </div>

              <button
                type="submit"
                className="btn-charcoal mt-2 w-full py-3.5 text-[15px] font-sans font-medium tracking-wide transition-transform duration-300 hover:scale-[1.02]"
                disabled={isLoading}
                id="register-submit"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account…
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Switch link */}
            <p className="text-center text-stone-500 text-[15px] mt-7 font-sans">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-gold-400 hover:text-gold-300 font-semibold transition-colors duration-300 bg-transparent border-none cursor-pointer p-0"
                id="switch-to-login"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
