import { Client } from "pg";
import jwt from "jsonwebtoken";

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 1. Verify JWT
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, SUPABASE_JWT_SECRET);
    // Optionally, check: if (decoded.sub !== req.body.user_id) { ... }
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  // ...existing Gemini and database logic...
  const { message, user_id } = req.body;
  const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=${process.env.DB_SSL || "require"}`;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const apiRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      }),
    });
    const data = await apiRes.json();

    if (data.error) {
      return res.status(500).json({ response: `Gemini error: ${data.error.message}` });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      data.candidates?.[0]?.content?.text ||
      "No response from Gemini.";

    // Store chat in PostgreSQL
    if (user_id) {
      const client = new Client({ connectionString });
      await client.connect();
      await client.query(
        "INSERT INTO chat_history (user_id, message, response, created_at) VALUES ($1, $2, $3, NOW())",
        [user_id, message, reply]
      );
      await client.end();
    }

    return res.status(200).json({ response: reply });
  } catch (err) {
    console.error("Request failed:", err);
    return res.status(500).json({ error: "Failed to contact Gemini API or database." });
  }
}