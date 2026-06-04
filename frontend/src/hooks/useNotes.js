import { useState, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { notesAPI, API_BASE_URL } from '../utils/api';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  
  const abortControllerRef = useRef(null);
  const streamingContentRef = useRef('');
  const isCancelledRef = useRef(false);
  const readerRef = useRef(null);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await notesAPI.fetchNotes();
      setNotes(response.data.notes || []);
    } catch (err) {
      toast.error('Failed to fetch history');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateNotes = useCallback(async (videoUrl, mode) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (readerRef.current) {
      try { readerRef.current.cancel(); } catch (e) { }
      readerRef.current = null;
    }

    const currentController = new AbortController();
    abortControllerRef.current = currentController;
    isCancelledRef.current = false;
    
    setIsStreaming(true);
    setStreamingContent('');
    streamingContentRef.current = '';
    setCurrentNote(null);

    let completedNoteId = null;

    try {
      const response = await fetch(`${API_BASE_URL}/notes/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ videoUrl, mode }),
        signal: currentController.signal,
      });

      if (!response.ok) {
        if (response.status === 503) {
           const errData = await response.json();
           throw new Error(errData.message || 'Service Unavailable');
        }
        throw new Error('Failed to generate notes');
      }

      const reader = response.body.getReader();
      readerRef.current = reader;
      const decoder = new TextDecoder();

      while (true) {
        if (isCancelledRef.current) {
          reader.cancel();
          break;
        }

        const { done, value } = await reader.read();
        if (done) break;

        if (isCancelledRef.current) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (isCancelledRef.current) break;

          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.substring(6));

              if (data.chunk && !isCancelledRef.current) {
                setStreamingContent((prev) => {
                  const newContent = prev + data.chunk;
                  streamingContentRef.current = newContent;
                  return newContent;
                });
              }

              if (data.complete) {
                completedNoteId = data.noteId;
                toast.success('Notes generated perfectly!');
              }

              if (data.error) {
                toast.error(data.error);
              }
            } catch (e) {}
          }
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        return;
      } else if (!isCancelledRef.current) {
        toast.error(err.message, { duration: 6000 });
      }
    } finally {
      readerRef.current = null;

      if (abortControllerRef.current === currentController && !isCancelledRef.current) {
        if (completedNoteId) {
          try {
            const res = await notesAPI.fetchNotes();
            const fetchedNotes = res.data.notes || [];
            setNotes(fetchedNotes);
            const completedNote = fetchedNotes.find((n) => n._id === completedNoteId);
            if (completedNote) {
              setCurrentNote(completedNote);
            }
          } catch (e) {}
        }
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    }
  }, []);

  const cancelGeneration = useCallback(() => {
    isCancelledRef.current = true;

    if (readerRef.current) {
      try { readerRef.current.cancel(); } catch (e) {}
      readerRef.current = null;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    if (streamingContentRef.current) {
      setCurrentNote({
        _id: 'partial-' + Date.now(),
        videoTitle: 'Generation Cancelled',
        contentMarkdown: streamingContentRef.current + '\n\n> ⚠️ **Generation Cancelled:** This is a partial note and has not been saved to your history.',
        isPartial: true
      });
      toast('Generation stopped', { icon: '🛑' });
    } else {
      setCurrentNote(null);
    }
    
    setStreamingContent('');
    streamingContentRef.current = '';
    setIsStreaming(false);
  }, []);

  const updateNote = useCallback(async (id, contentMarkdown) => {
    setIsLoading(true);

    try {
      const response = await notesAPI.updateNote(id, contentMarkdown);
      setCurrentNote(response.data.note);
      await fetchNotes();
      toast.success('Note saved successfully');
    } catch (err) {
      toast.error('Failed to save note');
    } finally {
      setIsLoading(false);
    }
  }, [fetchNotes]);

  const deleteNote = useCallback(async (id) => {
    setIsLoading(true);

    try {
      await notesAPI.deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      if (currentNote?._id === id) {
        setCurrentNote(null);
      }
      toast.success('Note deleted');
    } catch (err) {
      toast.error('Failed to delete note');
    } finally {
      setIsLoading(false);
    }
  }, [currentNote]);

  const setCurrentNoteById = useCallback((id) => {
    const note = notes.find((n) => n._id === id);
    if (note) {
      setCurrentNote(note);
    }
  }, [notes]);

  return {
    notes,
    currentNote,
    isLoading,
    isStreaming,
    streamingContent,
    fetchNotes,
    generateNotes,
    updateNote,
    deleteNote,
    setCurrentNote,
    setCurrentNoteById,
    cancelGeneration,
  };
};
