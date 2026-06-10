# Akshar AI

🌍 Live Demo: [Akshar AI](https://akshar-ai-frontend.vercel.app/)

Akshar AI is a full-stack web application that turns YouTube video into clean, easy-to-read study notes. It uses the Google Gemini API to make long videos into short, useful notes for students and anyone who wants to learn quickly.

## Tech Stack

* **Frontend:** React, Vite, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **AI API:** Google Gemini API

## Key Features

* **Video to Notes:** Automatically converts YouTube video content into study notes.
* **Study Modes:** Choose how detailed you want your notes:
    * **Quick:** For short summaries.
    * **Detailed:** For deep understanding.
    * **Exam:** For test preparation.
* **Live Generation:** Watch your notes being written on the screen in real-time.
* **Note Editor:** Edit your notes using the built-in text editor.
* **Export Options:** Copy notes as Markdown text, or save them as a PDF or PNG image.
* **User Accounts:** Safely log in and save your history of notes.

## Prerequisites

Before starting, make sure you have:

* Node.js (Version 16 or newer)
* MongoDB (Installed locally or using MongoDB Atlas)
* A Google Gemini API Key

## Installation and Setup

Follow these steps to run the project on your computer:

### 1. Install Dependencies

Run this command in the main project folder to install packages for both the frontend and backend:

```bash
npm install
```

### 2. Set Up Environment Variables

Go to the `backend` folder and copy the example environment file:

```bash
cp backend/.env.example backend/.env
```

Open the new `backend/.env` file and add your details:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/akshar-ai
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=http://localhost:5173
```

### 3. Start the App

Go back to the main project folder and start both the frontend and backend at the same time:

```bash
npm run dev
```

* The backend will run on port `5000`.
* The frontend will be open at `http://localhost:5173`.

## How to Use

1. **Sign Up / Log In:** Create an account or log in to an existing one.
2. **Add Video:** Paste a YouTube video link into the dashboard.
3. **Choose Mode:** Select Quick, Detailed, or Exam mode.
4. **Generate:** Click the "Generate" button and watch your notes appear.
5. **Save:** Use the menu options to edit, copy, or download your notes.


