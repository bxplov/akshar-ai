export const ModeSelector = ({ selectedMode, onModeChange }) => {
  const modes = [
    {
      id: 'Exam',
      label: 'Exam',
      description: 'High-yield focus',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      id: 'Quick',
      label: 'Quick',
      description: 'Core concepts',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      id: 'Detailed',
      label: 'Detailed',
      description: 'Step-by-step notes',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3" id="mode-selector">
      {modes.map((mode) => {
        const isActive = selectedMode === mode.id;
        return (
          <button
            key={mode.id}
            type="button"
            className={`
              flex flex-col items-center justify-center gap-2 p-3 sm:p-5 rounded-bento cursor-pointer border-none
              text-center min-w-0
              transition-all duration-500 ease-bento
              ${isActive
                ? 'bg-charcoal text-white shadow-bento'
                : 'bg-white text-charcoal shadow-bento hover:shadow-bento-hover'
              }
            `}
            onClick={() => onModeChange(mode.id)}
            id={`mode-${mode.id.toLowerCase()}`}
          >
            <span className={`transition-all duration-300 ${isActive ? 'text-gold scale-110' : 'text-stone-400'}`}>
              {mode.icon}
            </span>
            <span className={`font-serif text-xl tracking-tight ${isActive ? 'text-white' : 'text-charcoal'}`}>
              {mode.label}
            </span>
            <span className={`text-[11px] sm:text-[12px] font-sans leading-tight mt-0.5 break-words w-full ${isActive ? 'text-stone-400' : 'text-stone-400/80'}`}>
              {mode.description}
            </span>
            {/* Gold dot for active */}
            {isActive && (
              <div className="w-2 h-2 rounded-full bg-gold mt-1.5" />
            )}
          </button>
        );
      })}
    </div>
  );
};
