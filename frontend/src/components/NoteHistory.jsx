export const NoteHistory = ({
  notes,
  currentNoteId,
  onSelectNote,
  onDeleteNote,
  isLoading,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col gap-3 h-full" id="note-history">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
          </svg>
          <span className="font-serif text-lg tracking-tight text-white">Recent Notes</span>
        </div>
        {notes.length > 0 && (
          <span className="text-[10px] font-medium text-stone-500 bg-white/10 px-2 py-0.5 rounded-full">{notes.length}</span>
        )}
      </div>

      {isLoading && (
        <p className="text-stone-500 text-xs text-center py-3 animate-pulse">Loading…</p>
      )}

      {!isLoading && notes.length === 0 && (
        <div className="text-center py-8 animate-fade-in">
          <div className="w-10 h-10 mx-auto mb-3 rounded-2xl bg-white/5 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <p className="text-stone-500 text-[13px] font-medium">No notes yet</p>
          <p className="text-stone-600 text-[11px] mt-1">Your generated notes will appear here</p>
        </div>
      )}

      <div className="flex flex-col gap-1.5 overflow-y-auto dark-scrollbar pr-1 flex-1">
        {notes.map((note, index) => {
          const isActive = currentNoteId === note._id;
          return (
            <div
              key={note._id}
              className="group flex items-center gap-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <button
                onClick={() => onSelectNote(note._id)}
                className={`
                  flex-1 text-left px-3.5 py-3 rounded-2xl border-none transition-all duration-300 cursor-pointer min-w-0
                  ${isActive
                    ? 'bg-gold/15'
                    : 'bg-transparent hover:bg-white/5'
                  }
                `}
              >
                <div className={`font-sans font-medium text-[14px] tracking-wide truncate mb-1.5 ${isActive ? 'text-gold' : 'text-stone-200'}`}>
                  {note.videoTitle}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${isActive ? 'bg-gold/20 text-gold' : 'bg-white/8 text-stone-500'}`}>
                    {note.noteMode}
                  </span>
                  <span className="text-[10px] font-sans font-medium tracking-wide text-stone-600">{formatDate(note.createdAt)}</span>
                </div>
              </button>
              <button
                onClick={() => onDeleteNote(note._id)}
                className="text-stone-500 hover:text-rose-400 hover:bg-rose-400/10 w-7 h-7 flex items-center justify-center rounded-xl transition-all duration-300 border-none bg-transparent cursor-pointer flex-shrink-0"
                title="Delete note"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
