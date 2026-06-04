import { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from 'react-markdown';
import { ExportButton } from './ExportButton';

export const NoteCanvas = ({
  content,
  isStreaming,
  onSave,
  videoTitle,
  isPartial,
  onClearCanvas,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editedContent);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`
        note-canvas-wrapper flex flex-col rounded-bento overflow-hidden min-h-[500px] flex-1
        transition-all duration-500 ease-bento bg-white
      `}
      style={{
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
      }}
      id="note-canvas"
    >
      {/* ═══ Note Header ═══ */}
      <div className="no-print flex items-center justify-between px-4 sm:px-7 py-3 sm:py-4 flex-shrink-0 border-b border-cream-200/60">
        {/* Title */}
        <div className="flex items-center gap-3 min-w-0 mr-4">
          <div className="w-1.5 h-5 rounded-full bg-gold flex-shrink-0" />
        <div className="flex-1 min-w-0 pr-4">
          <h1 className="font-serif font-normal text-[22px] tracking-tight text-charcoal truncate">
            {videoTitle || 'Study Notes'}
          </h1>
        </div>
        </div>

        {!isStreaming && content && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onClearCanvas}
              className="h-8 px-4 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-300 cursor-pointer border-none bg-stone-100 text-stone-500 hover:bg-rose-50 hover:text-rose-500"
              id="clear-canvas-btn"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Close
            </button>
            {!isPartial && (
              !isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="h-8 px-4 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-300 cursor-pointer border-none bg-cream-200/70 text-stone-500 hover:bg-cream-300 hover:text-charcoal"
                  id="edit-note-btn"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </button>
              ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="h-8 px-4 rounded-full text-xs font-medium flex items-center gap-1.5 btn-charcoal disabled:opacity-50"
                  id="save-note-btn"
                >
                  {isSaving ? (
                    <div className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setEditedContent(content);
                    setIsEditing(false);
                  }}
                  disabled={isSaving}
                  className="h-8 px-4 rounded-full text-xs font-medium flex items-center gap-1.5 bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all duration-300 cursor-pointer border-none disabled:opacity-50"
                  id="cancel-edit-btn"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Cancel
                </button>
              </>
              )
            )}
          </div>
        )}
      </div>

      {/* ═══ Note Content ═══ */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {isEditing ? (
          <div data-color-mode="light" className="flex-1 rounded-none overflow-hidden">
            <MDEditor
              value={editedContent}
              onChange={setEditedContent}
              height={600}
              preview="edit"
              hideToolbar={false}
              visibleDragbar={false}
            />
          </div>
        ) : (
          <div className={`
            flex-1 flex flex-col
            px-8 sm:px-12 lg:px-16 py-8 sm:py-10 max-w-prose mx-auto w-full
          `}>
            {/* Streaming Skeleton */}
            {isStreaming && !content && (
              <div className="flex flex-col gap-0 animate-fade-in py-2">
                {[100, 88, 72, 100, 60, 92, 80, 48, 100, 75, 88, 55, 100, 82, 68, 35].map((w, i) => (
                  <div
                    key={i}
                    className="h-[2rem] flex items-end pb-1"
                  >
                    <div
                      className="skeleton-bar"
                      style={{
                        width: `${w}%`,
                        height: '10px',
                        animationDelay: `${i * 0.08}s`,
                        borderRadius: '6px',
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Rendered Markdown Content */}
            {content && (
              <div id="rendered-markdown-content" className="markdown-content flex-1 font-sans text-[14.5px] tracking-[-0.01em] text-charcoal leading-[1.8]">
                <div className={`
                  [&_h1]:text-2xl [&_h1]:font-sans [&_h1]:font-semibold [&_h1]:text-charcoal [&_h1]:mb-4 [&_h1]:mt-6 [&_h1]:tracking-tight
                  [&_h2]:text-xl [&_h2]:font-sans [&_h2]:font-semibold [&_h2]:text-charcoal [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:tracking-tight
                  [&_h3]:text-lg [&_h3]:font-sans [&_h3]:font-semibold [&_h3]:text-charcoal [&_h3]:mb-2 [&_h3]:mt-4
                  [&_p]:mb-4 [&_p]:leading-[1.8]
                  [&_li]:mb-2 [&_li]:leading-[1.75]
                  [&_ul]:ml-5 [&_ul]:mb-4 [&_ol]:ml-5 [&_ol]:mb-4
                  [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-cream-300 [&_table]:rounded-2xl
                  [&_th]:bg-cream-100 [&_th]:border [&_th]:border-cream-300 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:text-charcoal
                  [&_td]:border [&_td]:border-cream-300 [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-sm
                  [&_code]:bg-gold/15 [&_code]:text-charcoal [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-[13px] [&_code]:font-mono
                  [&_pre]:bg-cream-100 [&_pre]:rounded-2xl [&_pre]:p-4 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-cream-300
                  [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-charcoal
                  [&_blockquote]:border-l-[3px] [&_blockquote]:border-gold [&_blockquote]:pl-4 [&_blockquote]:my-4 [&_blockquote]:text-stone-500 [&_blockquote]:italic
                `}>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!isStreaming && !content && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center animate-fade-in">
                  <div
                    className="w-16 h-16 mx-auto mb-5 rounded-bento-sm flex items-center justify-center bg-cream-200/50"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      className="text-stone-300">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <p className="text-lg font-serif text-stone-400 tracking-tight">
                    Your canvas awaits
                  </p>
                  <p className="text-sm mt-2 text-stone-400/60 max-w-[260px] mx-auto leading-relaxed font-sans">
                    Paste a YouTube lecture URL above and let Akshar AI transform it into structured study notes
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══ Floating Utility Toolbar ═══ */}
      {!isStreaming && content && !isEditing && (
        <ExportButton noteContent={content} videoTitle={videoTitle} />
      )}
    </div>
  );
};
