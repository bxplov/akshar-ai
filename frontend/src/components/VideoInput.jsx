import { useState } from 'react';

export const VideoInput = ({ onGenerate, onCancel, isLoading, selectedMode, onModeChange }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [localError, setLocalError] = useState('');

  const handleGenerate = (e) => {
    e.preventDefault();
    setLocalError('');

    if (!videoUrl.trim()) {
      setLocalError('Please enter a YouTube URL');
      return;
    }

    if (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be')) {
      setLocalError('Please enter a valid YouTube URL');
      return;
    }

    onGenerate(videoUrl, selectedMode);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onCancel();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleGenerate} id="video-input-form">
      {/* URL Input — Soft gray pill */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 bg-cream-200/70 rounded-full p-1.5 transition-all duration-300 hover:bg-cream-200">
          <div className="flex items-center gap-2 pl-3 text-stone-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <input
            id="videoUrl"
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste YouTube URL..."
            disabled={isLoading}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-charcoal text-[15px] placeholder:text-stone-400/60 py-3 px-3 font-sans"
          />
          {isLoading ? (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-rose-500 text-white px-6 py-3 rounded-full text-[14px] font-sans font-medium tracking-wide whitespace-nowrap flex items-center gap-2 flex-shrink-0 transition-transform duration-300 hover:scale-[1.02] shadow-bento hover:bg-rose-600 cursor-pointer border-none"
              id="cancel-btn"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span>Cancel</span>
            </button>
          ) : (
            <button
              type="submit"
              className="btn-charcoal px-6 py-3 text-[14px] font-sans font-medium tracking-wide whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 transition-transform duration-300 hover:scale-[1.02]"
              id="generate-btn"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>Generate</span>
            </button>
          )}
        </div>
        {localError && (
          <span className="text-rose-500 text-xs ml-4 animate-fade-in font-medium">{localError}</span>
        )}
      </div>
    </form>
  );
};
