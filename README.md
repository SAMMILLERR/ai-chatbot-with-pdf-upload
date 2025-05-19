# Gemini PDF Chatbot

A full-stack chatbot application built with Next.js, Supabase, and the Gemini API.  
Users can register, log in, chat with an AI assistant, and upload PDFs to extract and discuss their content.  
All chat history is securely stored per user.

---

## 🚀 Live Demo

[View the deployed app on Render](https://your-app.onrender.com)

---

## Features

- **User Authentication:** Register, login, and logout securely (Supabase Auth)
- **Chatbot:** Powered by Gemini API for intelligent responses
- **PDF Upload:** Upload a PDF, extract its text, and chat about its content
- **Chat History:** All conversations are stored and viewable per user
- **Responsive UI:** Clean, modern interface with PDF upload as a pin/clipart icon

---

## Tech Stack

- **Frontend:** Next.js (React)
- **Backend/API:** Next.js API routes
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** Supabase Auth (JWT)
- **PDF Parsing:** `pdf-parse` (Node.js)
- **AI Integration:** Gemini API

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/SAMMILLERR/ai-chatbot-with-pdf-upload.git
cd ai-chatbot-with-pdf-upload
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure environment variables

- Copy `.env.example` to `.env.local` and fill in your secrets:

```sh
cp .env.example .env.local
```

- Set your Supabase, Gemini, and database credentials.

### 4. Run locally

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Database Setup

- See [`lib/schema.sql`](lib/schema.sql) for the PostgreSQL schema.
- Run the SQL script on your Supabase/Postgres instance.

---

## Sample Chat Responses

See [`sample_chat.txt`](sample_chat.txt) for example user queries and chatbot responses.

---

## Deployment

This app is deployed on [Render](https://render.com/):

- Connect your GitHub repo to Render
- Add all environment variables from `.env.example` in the Render dashboard
- Set build command: `npm install && npm run build`
- Set start command: `npm start`
- Set root directory if your app is in a subfolder

---

## Citations

- [Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [pdf-parse](https://www.npmjs.com/package/pdf-parse)
- [Next.js Documentation](https://nextjs.org/docs)

---


