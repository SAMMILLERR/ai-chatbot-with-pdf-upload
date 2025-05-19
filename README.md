


# Gemini PDF Chatbot

[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Version](https://img.shields.io/badge/version-1.0.0-blue)]()

A **full-stack chatbot** application built with **Next.js**, **Supabase**, and the **Gemini API**. Users can register, authenticate, upload PDF documents, and interact with an AI assistant whose responses are stored securely.

---

## 🚀 Live Demo

[🌐 View Live App on Render](https://ai-chatbot-with-pdf-upload-1.onrender.com)

---

## 🎯 Features

- **Secure Authentication**: Email/password sign-up and login via Supabase Auth  
- **AI Chatbot**: Conversational interface powered by Google Gemini (`chat-bison-001`)  
- **PDF Uploader**: Extract text from PDFs and chat about document content  
- **Persistent Chat**: Store and retrieve all user–bot exchanges in PostgreSQL  
- **Responsive UI**: Modern layout with CSS Modules for scoped styling  

---

## 🛠️ Tech Stack

| Layer          | Technology                         |
| -------------- | ---------------------------------- |
| Frontend       | Next.js, React                     |
| Styling        | CSS Modules                        |
| Authentication | Supabase Auth                      |
| API            | Next.js API Routes (Node.js)       |
| Database       | PostgreSQL (Render-hosted)         |
| PDF Parsing    | `pdf-parse`                        |
| AI Integration | Google Gemini API (REST)           |

---

## 🚀 Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/SAMMILLERR/ai-chatbot-with-pdf-upload.git
   cd ai-chatbot-with-pdf-upload


2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your keys:

   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   GEMINI_API_KEY=
   DATABASE_URL=
   ```

4. **Set up the database schema**

   ```bash
   psql "$DATABASE_URL" -f db/schema.sql
   ```

5. **Run locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```
├── components/        # Reusable UI components
├── lib/               # Supabase client & utilities
├── pages/
│   ├── api/           # Serverless API routes
│   ├── auth/          # Registration & login pages
│   ├── chat.js        # Main chat interface
│   └── _app.js        # App wrapper with auth provider
├── styles/            # CSS Modules & global styles
├── db/                # SQL migrations (schema.sql)
├── scripts/           # Utility scripts (list models, tests)
└── sample_chat.txt    # Example user–bot dialogues
```

---

## 💡 Usage

1. **Register** at `/auth/register`
2. **Log in** at `/auth/login`
3. **Upload** a PDF to set context
4. **Chat** with the AI assistant
5. **Review** your chat history

---

## 📖 References

* [Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
* [Supabase Documentation](https://supabase.com/docs)
* [pdf-parse (npm)](https://www.npmjs.com/package/pdf-parse)
* [Next.js Documentation](https://nextjs.org/docs)

---






