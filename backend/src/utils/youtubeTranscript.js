import axios from 'axios';

/**
 * Extracts a valid YouTube Video ID from a given URL.
 * Supports various YouTube URL formats.
 */
export const extractYouTubeVideoId = (url) => {
  const patterns = [
    /(?:youtube\.com\/(?:watch\?v=|live\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  throw new Error('Invalid YouTube URL');
};

/**
 * Strategy 1: Supadata API (Recommended Free Tier)
 * Reliable fallback that generates transcripts via Supadata.
 */
async function fetchViaSupadata(videoId) {
  const apiKey = process.env.SUPADATA_API_KEY;
  if (!apiKey) {
    throw new Error('SUPADATA_API_KEY not configured');
  }

  const options = {
    method: 'GET',
    url: 'https://api.supadata.ai/v1/youtube/transcript',
    params: { videoId: videoId },
    headers: {
      'x-api-key': apiKey
    }
  };

  const response = await axios.request(options);
  if (!response.data || !response.data.content) {
    throw new Error('Supadata returned empty or invalid response');
  }
  
  const transcript = response.data.content.map(item => item.text).join(' ');
  if (!transcript || transcript.length < 50) {
    throw new Error('Supadata transcript too short');
  }
  
  return transcript;
}

/**
 * Strategy 2: RapidAPI 
 * Premium fallback strategy for users who prefer RapidAPI subscriptions.
 */
async function fetchViaRapidAPI(videoId) {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    throw new Error('RAPIDAPI_KEY not configured in environment variables');
  }

  const options = {
    method: 'GET',
    url: 'https://youtube-transcripts.p.rapidapi.com/youtube/transcript',
    params: { videoId: videoId, language: 'en' },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'youtube-transcripts.p.rapidapi.com'
    }
  };

  const response = await axios.request(options);
  if (!response.data || !response.data.content) {
    throw new Error('RapidAPI returned empty or invalid response');
  }
  
  const transcript = response.data.content.map(item => item.text).join(' ');
  if (!transcript || transcript.length < 50) {
    throw new Error('RapidAPI transcript too short');
  }
  
  return transcript;
}

/**
 * Fetches the transcript for a given YouTube URL.
 * Iterates through configured API strategies to ensure reliable delivery.
 */
export const fetchYouTubeTranscript = async (videoUrl) => {
  const videoId = extractYouTubeVideoId(videoUrl);

  const strategies = [
    { name: 'Supadata API', fn: () => fetchViaSupadata(videoId) },
    { name: 'RapidAPI',     fn: () => fetchViaRapidAPI(videoId) },
  ];

  const errors = [];

  for (const { name, fn } of strategies) {
    try {
      const transcript = await fn();
      if (transcript && transcript.trim().length > 0) {
        return { videoId, transcript };
      }
    } catch (error) {
      errors.push(`${name}: ${error.message}`);
    }
  }

  const error = new Error('YOUTUBE_IP_BAN_ERROR');
  error.code = 'YOUTUBE_IP_BAN_ERROR';
  error.details = errors;
  throw error;
};

/**
 * Returns basic standardized video info object.
 */
export const getVideoInfo = (videoUrl) => {
  try {
    const videoId = extractYouTubeVideoId(videoUrl);
    return {
      videoId,
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };
  } catch {
    throw new Error('Invalid YouTube URL format');
  }
};
