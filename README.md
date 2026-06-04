# Akshar AI

Akshar AI is a full-stack MERN application that converts YouTube video transcripts into comprehensive, formatted study notes using the Google Gemini API. It features a modern interface, multiple study modes, and export capabilities.

## Features

- Video to Notes: Scrape transcripts from YouTube videos and convert them into study notes.
- Study Modes: Choose between Quick, Detailed, and Exam modes for different levels of depth.
- Real-time Streaming: Watch notes generate in real-time.
- Markdown Editor: Edit notes using the built-in rich text editor.
- Export Options: Copy as Markdown, or export as PDF or PNG.
- Customization: Toggle between ruled or clean backgrounds, and modern or handwritten typography.
- User Management: Secure JWT authentication to save and manage note history.

## Prerequisites

- Node.js (v16+)
- MongoDB (local instance or MongoDB Atlas)
- Google Gemini API Key

## Installation and Setup

1. Install Dependencies
Run the following command from the root directory to install dependencies for both the frontend and backend:

```bash
npm install
```

2. Environment Variables
Create a .env file in the backend directory based on the example:

```bash
cp backend/.env.example backend/.env
```

Ensure the following variables are set in backend/.env:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/akshar-ai
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

3. Start Development Servers
From the root directory, start both the backend and frontend concurrently:

```bash
npm run dev
```

The backend will run on port 5000 and the frontend on port 5173.

## Usage

1. Create an account or sign in.
2. Paste a YouTube URL into the dashboard input.
3. Select a study mode (Quick, Detailed, or Exam).
4. Click Generate and wait for the stream to complete.
5. Use the toolbar to edit, copy, or export the final document.

## Architecture

The project is structured as a monorepo containing two main workspaces:
- backend: Node.js, Express, and MongoDB. Handles authentication, YouTube transcript fetching, and Gemini API integration.
- frontend: React, Vite, and Tailwind CSS. Handles the user interface, real-time markdown rendering, and local state management.

## License

This project is licensed under the MIT License.
