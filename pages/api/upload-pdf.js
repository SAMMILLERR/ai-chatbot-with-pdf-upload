import { formidable } from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";

// Disable Next.js default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error:", err);
      res.status(500).json({ error: "Error parsing the file" });
      return;
    }

    // Handle both array and object for files.pdf
    const fileField = files.pdf;
    const file = Array.isArray(fileField) ? fileField[0] : fileField;
    if (!file) {
      res.status(400).json({ error: "No PDF file uploaded" });
      return;
    }

    const filePath = file.filepath || file.path;
    if (!filePath) {
      console.error("No file path found on uploaded file:", file);
      res.status(500).json({ error: "File path not found" });
      return;
    }

    try {
      const data = fs.readFileSync(filePath);
      const pdfData = await pdfParse(data);
      res.status(200).json({ text: pdfData.text });
      return;
    } catch (e) {
      console.error("PDF parse error:", e);
      res.status(500).json({ error: "Failed to parse PDF" });
      return;
    }
  });
}