import { Client } from "pg";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id } = req.query;

  // Build connection string from env variables
  const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=${process.env.DB_SSL || "require"}`;

  try {
    const client = new Client({ connectionString });
    await client.connect();
    const result = await client.query(
      "SELECT * FROM chat_history WHERE user_id = $1 ORDER BY created_at ASC",
      [user_id]
    );
    await client.end();
    res.status(200).json({ data: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chat history." });
  }
}