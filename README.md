# Gemini PDF Chatbot

[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Version](https://img.shields.io/badge/version-1.0.0-blue)]()

A **full-stack chatbot** application built with **Next.js**, **Supabase**, and the **Gemini API**. Users can register, authenticate, upload PDF documents, and interact with an AI assistant whose responses are stored securely.

---

## 🚀 Live Demo

[🌐 View Live App on Render](https://ai-chatbot-with-pdf-upload-1.onrender.com)

---

## 📸 Screenshots

<!-- Place your screenshots under /public/screenshots/ -->

1. **Login Page**

![image](https://github.com/user-attachments/assets/0f298b15-1c79-45c6-acd3-9d4e741d29a9)


2. **Chat Interface**

![Chat Interface](![image](https://github.com/user-attachments/assets/bfa7279f-c40e-4d0c-92f0-aca2e05ffb54)
)

---

## 🎯 Features

* **Secure Authentication**: Email/password sign-ups and logins with Supabase Auth
* **AI Chatbot**: Conversational interface powered by Google Gemini (chat-bison-001)
* **PDF Uploader**: Extract text from PDFs and chat about document content
* **Persistent Chat**: Store and retrieve all user–bot exchanges in PostgreSQL
* **Responsive UI**: Clean design using CSS Modules for scoped styling

---

## 🛠️ Tech Stack

| Layer          | Technology                   |
| -------------- | ---------------------------- |
| Frontend       | Next.js, React               |
| Styling        | CSS Modules                  |
| Authentication | Supabase Auth                |
| API            | Next.js API Routes (Node.js) |
| Database       | PostgreSQL (Render-hosted)   |
| PDF Parsing    | pdf-parse                    |
| AI Integration | Google Gemini API (REST)     |

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/SAMMILLERR/ai-chatbot-with-pdf-upload.git
cd ai-chatbot-with-pdf-upload
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Populate `.env.local` with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
GEMINI_API_KEY="your-gemini-api-key"
DB_NAME="your-db-name"
DB_USER="your-db-username"
DB_PASSWORD="your-db-password"
DB_HOST="your-db-host"
DB_PORT="your-db-port"
DB_SSL="require"
SUPABASE_JWT_SECRET="your-supabase-jwt-secret"
```

### 4. Set Up Database Schema. Set Up Database Schema

Run the SQL migration:

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

### 5. Run the App Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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

1. **Register** through `/auth/register`
2. **Log in** via `/auth/login`
3. **Upload** a PDF to parse and set context
4. **Chat** with Gemini about your document or any topic
5. **Review** past conversations in your chat history

---

## 📖 References

* [Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
* [Supabase Documentation](https://supabase.com/docs)
* [pdf-parse (npm)](https://www.npmjs.com/package/pdf-parse)
* [Next.js Documentation](https://nextjs.org/docs)

---


