import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotes } from '../hooks/useNotes';
import { Logo } from './Logo';
import { VideoInput } from './VideoInput';
import { ModeSelector } from './ModeSelector';
import { NoteCanvas } from './NoteCanvas';
import { NoteHistory } from './NoteHistory';

export const Dashboard = ({ onGoHome }) => {
  const { user, logout } = useAuth();
  const {
    notes,
    currentNote,
    isStreaming,
    streamingContent,
    fetchNotes,
    generateNotes,
    updateNote,
    deleteNote,
    setCurrentNoteById,
    cancelGeneration,
    setCurrentNote,
  } = useNotes();

  const [selectedMode, setSelectedMode] = useState('Quick');
  const [mobilePanel, setMobilePanel] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleGenerateNotes = async (videoUrl, mode) => {
    await generateNotes(videoUrl, mode);
  };

  const handleSaveNote = async (content) => {
    if (currentNote) {
      await updateNote(currentNote._id, content);
    }
  };

  const handleSelectNote = (noteId) => {
    setCurrentNoteById(noteId);
    setMobilePanel(null);
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(noteId);
    }
  };

  const displayContent = isStreaming ? streamingContent : currentNote?.contentMarkdown || '';
  const displayTitle = currentNote?.videoTitle || 'Study Notes';

  return (
    <div className="min-h-screen flex flex-col relative z-10" id="dashboard">

      <header className="no-print fixed top-0 left-0 right-0 z-50 animate-fade-in bg-cream/70 backdrop-blur-md shadow-sm border-b border-cream-300/50 transform-gpu" id="dashboard-nav">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Logo onGoHome={onGoHome} size="default" />

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-3 py-1.5 shadow-sm border border-cream-300/50">
              <div className="w-6 h-6 rounded-full bg-charcoal flex items-center justify-center text-white text-[10px] font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="text-stone-600 text-[13px] font-semibold tracking-wide font-sans">{user?.name}</span>
            </div>
            
            <button
              onClick={() => setMobilePanel(mobilePanel === 'history' ? null : 'history')}
              className="md:hidden h-9 px-4 rounded-full bg-charcoal text-white shadow-bento flex items-center gap-2 transition-all duration-300 border-none cursor-pointer hover:bg-charcoal-300 active:scale-95 group"
              id="mobile-notes-toggle"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold transition-transform duration-300 group-hover:scale-110">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="text-[12px] font-sans font-medium tracking-wide">Notes</span>
              {notes.length > 0 && (
                <div className="w-1.5 h-1.5 rounded-full bg-gold ml-0.5 animate-pulse" />
              )}
            </button>
            <button
              onClick={() => {
                logout();
                onGoHome();
              }}
              className="h-9 px-4 rounded-full bg-white/60 backdrop-blur-md shadow-sm border border-cream-300/50 text-stone-500 text-xs font-medium hover:text-charcoal hover:bg-white transition-all duration-300 cursor-pointer font-sans"
              id="logout-btn"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">

          <div className="md:col-span-12 bg-white border border-cream-300 rounded-[2rem] shadow-sm p-6 sm:p-8 animate-stagger-1 transform-gpu" id="url-hub">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif text-charcoal tracking-tight">
                  Welcome back, <span className="italic text-stone-500">{user?.name?.split(' ')[0] || 'there'}</span>
                </h2>
                <p className="text-stone-500 text-sm mt-1.5 font-sans">Paste a YouTube lecture URL and select your study mode</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="bg-gold/20 text-charcoal text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full font-sans">
                  {selectedMode} Mode
                </div>
                {isStreaming && (
                  <div className="flex items-center gap-1.5 bg-charcoal text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full font-sans animate-breathe shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    Generating…
                  </div>
                )}
              </div>
            </div>
            <VideoInput
              onGenerate={handleGenerateNotes}
              onCancel={cancelGeneration}
              isLoading={isStreaming}
              selectedMode={selectedMode}
              onModeChange={setSelectedMode}
            />
          </div>

          <div className="md:col-span-12 animate-stagger-2 transform-gpu">
            <ModeSelector selectedMode={selectedMode} onModeChange={setSelectedMode} />
          </div>

          <div className="md:col-span-4 bg-[#1A1A1A] rounded-[2rem] p-5 shadow-xl border border-white/5 animate-stagger-3 hidden md:flex flex-col overflow-hidden self-start sticky top-[100px] h-[calc(100vh-140px)] transform-gpu" id="history-panel">
            <NoteHistory
              notes={notes}
              currentNoteId={currentNote?._id}
              onSelectNote={handleSelectNote}
              onDeleteNote={handleDeleteNote}
              isLoading={false}
            />
          </div>

          <div className="md:col-span-8 animate-stagger-4 md:self-start md:sticky md:top-[100px] md:h-[calc(100vh-140px)] flex flex-col transform-gpu" id="canvas-area">
            <NoteCanvas
              content={displayContent}
              isStreaming={isStreaming}
              onSave={handleSaveNote}
              videoTitle={displayTitle}
              isPartial={currentNote?.isPartial}
              onClearCanvas={() => setCurrentNote(null)}
            />
          </div>
        </div>
      </main>

      {mobilePanel && (
        <>
          <div
            className="fixed inset-0 bg-charcoal/40 z-40 md:hidden"
            onClick={() => setMobilePanel(null)}
          />
          <div className="fixed top-0 right-0 w-[320px] max-w-[85vw] h-full z-50 md:hidden overflow-y-auto shadow-2xl" style={{ animation: 'float-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
            {mobilePanel === 'history' && (
              <div className="bg-[#1A1A1A] h-full p-6 rounded-none rounded-l-[2rem] flex flex-col border-l border-white/5">
                <button
                  onClick={() => setMobilePanel(null)}
                  className="self-end mb-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-stone-400 hover:text-white hover:bg-white/10 transition-all border-none cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <NoteHistory
                  notes={notes}
                  currentNoteId={currentNote?._id}
                  onSelectNote={handleSelectNote}
                  onDeleteNote={handleDeleteNote}
                  isLoading={false}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
