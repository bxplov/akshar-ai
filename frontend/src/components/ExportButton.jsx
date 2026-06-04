import { useState, useEffect, useRef } from 'react';
import { copyToClipboard } from '../utils/clipboard';
import { exportNoteToPdf, exportNoteAsImage } from '../utils/exportPdf';

export const ExportButton = ({ noteContent, videoTitle }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [feedback, setFeedback] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!showMenu) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  const handleCopyMarkdown = async () => {
    const result = await copyToClipboard(noteContent, 'Markdown');
    setFeedback(result.message);
    setTimeout(() => setFeedback(''), 2000);
  };

  const handleExportPdf = () => {
    exportNoteToPdf(noteContent, videoTitle);
    setFeedback('PDF exported successfully');
    setTimeout(() => setFeedback(''), 2000);
    setShowMenu(false);
  };

  const handleExportImage = async () => {
    const result = await exportNoteAsImage(noteContent, videoTitle);
    setFeedback(result.message);
    setTimeout(() => setFeedback(''), 2000);
    setShowMenu(false);
  };

  return (
    <>
      <div className="floating-toolbar no-print" id="floating-toolbar">
        <div className="floating-toolbar-inner">
          {/* Copy button */}
          <button
            onClick={handleCopyMarkdown}
            className="group h-8 px-3 rounded-full flex items-center gap-2 text-stone-400 hover:text-gold transition-all duration-300 border-none bg-transparent cursor-pointer"
            title="Copy Markdown"
            id="copy-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span className="text-[13px] font-serif tracking-wide font-medium hidden sm:inline">Copy</span>
          </button>

          {/* Divider */}
          <div className="w-px h-4 bg-white/15" />

          {/* Export dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="group h-8 px-3 rounded-full flex items-center gap-2 text-stone-400 hover:text-gold transition-all duration-300 border-none bg-transparent cursor-pointer"
              title="Export"
              id="export-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="text-[13px] font-serif tracking-wide font-medium hidden sm:inline">Export</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`hidden sm:inline transition-transform duration-300 ${showMenu ? 'rotate-180' : ''}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {showMenu && (
              <div className="dropdown-menu">
                <button
                  onClick={handleExportPdf}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-stone-500 hover:text-charcoal hover:bg-cream-100 transition-all duration-300 border-none bg-transparent cursor-pointer"
                  id="export-pdf"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                  Export as PDF
                </button>
                <div className="h-px bg-cream-200 mx-4" />
                <button
                  onClick={handleExportImage}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-stone-500 hover:text-charcoal hover:bg-cream-100 transition-all duration-300 border-none bg-transparent cursor-pointer"
                  id="export-image"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                  </svg>
                  Export as Image
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Feedback Toast — Gold accent */}
        {feedback && (
          <div
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-charcoal text-xs font-semibold px-5 py-2.5 rounded-full animate-slide-up bg-gold"
            style={{
              boxShadow: '0 4px 15px rgba(252, 224, 123, 0.3)',
            }}
          >
            {feedback}
          </div>
        )}
      </div>
    </>
  );
};
