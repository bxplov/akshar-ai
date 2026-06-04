/**
 * Akshar AI — Premium Brand Logo Component
 * Used consistently across Landing, Auth, and Dashboard pages.
 * Click always returns to the landing page.
 */
export const Logo = ({ onGoHome, size = 'default', variant = 'light' }) => {
  const sizes = {
    small: { mark: 'w-7 h-7', text: 'text-lg', ai: 'text-[9px] px-1.5 py-0.5' },
    default: { mark: 'w-9 h-9', text: 'text-[22px]', ai: 'text-[10px] px-2 py-0.5' },
    large: { mark: 'w-11 h-11', text: 'text-2xl', ai: 'text-[11px] px-2 py-1' },
    hero: { mark: 'w-14 h-14', text: 'text-4xl', ai: 'text-xs px-2.5 py-1' },
  };

  const s = sizes[size] || sizes.default;
  const isDark = variant === 'dark';

  return (
    <button
      onClick={onGoHome}
      className="flex items-center gap-3 bg-transparent border-none cursor-pointer p-0 group transition-opacity duration-300 hover:opacity-80"
      aria-label="Go to Akshar AI home"
      id="logo-home"
    >
      {/* Logomark — Architectural Monogram A with 3D Golden Orb */}
      <div className={`${s.mark} flex-shrink-0 relative drop-shadow-sm`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="logoBg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3A3B3A" />
              <stop offset="1" stopColor="#181918" />
            </linearGradient>
            <linearGradient id="goldOrb" x1="15" y1="7" x2="25" y2="15" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE69D" />
              <stop offset="1" stopColor="#D4A843" />
            </linearGradient>
          </defs>
          
          {/* Base Squircle */}
          <rect width="40" height="40" rx="12" fill="url(#logoBg)" />
          
          {/* Inner glass border */}
          <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" stroke="white" strokeOpacity="0.12" />

          {/* The "A" Motif */}
          {/* Right thick structural stroke */}
          <path d="M20 12L28 27" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeOpacity="0.95" />
          {/* Left elegant thin stroke */}
          <path d="M20 12L12 27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
          {/* Crossbar */}
          <path d="M14.5 21H25.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.3" />

          {/* Golden AI Orb (The 'Mind') */}
          <circle cx="20" cy="11" r="4.5" fill="url(#goldOrb)" />
          {/* Orb 3D Highlight */}
          <circle cx="18.5" cy="9.5" r="1.5" fill="white" fillOpacity="0.6" />
        </svg>
      </div>

      {/* Wordmark — Premium Serif + Bold Badge */}
      <div className="flex items-center gap-2">
        <span className={`font-serif ${s.text} tracking-tight leading-none ${isDark ? 'text-white' : 'text-charcoal'}`}>
          Akshar
        </span>
        <span className={`${s.ai} rounded font-sans font-bold tracking-widest bg-gold text-charcoal leading-none shadow-sm`}>
          AI
        </span>
      </div>
    </button>
  );
};
