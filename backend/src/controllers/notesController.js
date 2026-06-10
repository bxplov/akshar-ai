import { Note } from '../models/Note.js';
import { fetchYouTubeTranscript, getVideoInfo } from '../utils/youtubeTranscript.js';
import { generateStudyNotesStream } from '../utils/geminiIntegration.js';
import axios from 'axios';

export const generateNotes = async (req, res) => {
  try {
    const { videoUrl, mode } = req.body;
    const userId = req.userId;

    if (!videoUrl || !mode) {
      return res.status(400).json({ error: "Video URL and mode are required" });
    }

    const { videoId, transcript } = await fetchYouTubeTranscript(videoUrl);
    const videoInfo = getVideoInfo(videoUrl);

    let videoTitle = "YouTube Video";
    try {
      const videoResponse = await axios.get(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      );
      videoTitle = videoResponse.data.title;
    } catch (error) {
      console.warn(`Failed to fetch video title for ${videoId}`);
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let fullContent = "";
    let clientDisconnected = false;

    req.on("close", () => {
      clientDisconnected = true;
    });

    try {
      const stream = await generateStudyNotesStream(transcript, mode);

      stream.response.catch((err) => {
        console.error("[NotesController] Background stream.response error:", err.message);
      });

      for await (const chunk of stream.stream) {
        if (clientDisconnected) break;

        if (chunk.candidates && chunk.candidates[0]?.content?.parts) {
          for (const part of chunk.candidates[0].content.parts) {
            if (part.text && !clientDisconnected) {
              fullContent += part.text;
              res.write(`data: ${JSON.stringify({ chunk: part.text })}\n\n`);
            }
          }
        }
      }

      if (!clientDisconnected) {
        const note = await Note.create({
          userId,
          videoUrl: videoInfo.videoUrl,
          videoTitle,
          videoId,
          noteMode: mode,
          contentMarkdown: fullContent,
          transcript,
        });

        res.write(
          `data: ${JSON.stringify({
            complete: true,
            noteId: note._id,
          })}\n\n`,
        );

        res.end();
      }
    } catch (error) {
      console.error("[NotesController] Generation error:", error.message);
      if (!clientDisconnected) {
        res.write(
          `data: ${JSON.stringify({
            error: error.message,
            stack: error.stack,
          })}\n\n`,
        );
        res.end();
      }
    }
  } catch (error) {
    if (error.code === 'YOUTUBE_IP_BAN_ERROR') {
      res.setHeader("Content-Type", "application/json");
      return res.status(503).json({
        error: "YOUTUBE_IP_BAN_ERROR",
        message: "YouTube has permanently blocked this server's IP. To fix this for free, sign up at dash.supadata.ai and add your SUPADATA_API_KEY to Render's Environment Variables.",
      });
    }

    console.error("[NotesController] Outer error:", error.message);
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });

    res.json({
      message: 'Notes retrieved successfully',
      notes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const note = await Note.findOne({ _id: id, userId });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({
      message: 'Note retrieved successfully',
      note,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { contentMarkdown } = req.body;
    const userId = req.userId;

    if (!contentMarkdown) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const note = await Note.findOne({ _id: id, userId });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    note.contentMarkdown = contentMarkdown;
    await note.save();

    res.json({
      message: 'Note updated successfully',
      note,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const note = await Note.findOneAndDelete({ _id: id, userId });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({
      message: 'Note deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
