import express from "express";
import cors from "cors";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;
const DATA_FILE = join(__dirname, "messages.json");

app.use(cors());
app.use(express.json());

// Serve admin dashboard
app.get("/admin", (_req, res) => {
  res.sendFile(join(__dirname, "admin.html"));
});

// Ensure messages file exists
if (!existsSync(DATA_FILE)) {
  writeFileSync(DATA_FILE, "[]", "utf-8");
}

// GET /api/messages — return all messages (for admin dashboard)
app.get("/api/messages", (_req, res) => {
  try {
    const data = readFileSync(DATA_FILE, "utf-8");
    res.json(JSON.parse(data));
  } catch {
    res.json([]);
  }
});

// POST /api/contact — receive a new message
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const entry = {
    id: Date.now(),
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
  };

  try {
    const raw = readFileSync(DATA_FILE, "utf-8");
    const messages = JSON.parse(raw);
    messages.push(entry);
    writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2), "utf-8");
    res.status(201).json({ success: true, entry });
  } catch {
    res.status(500).json({ error: "Failed to save message." });
  }
});

// DELETE /api/messages/:id — delete a message
app.delete("/api/messages/:id", (req, res) => {
  try {
    const raw = readFileSync(DATA_FILE, "utf-8");
    let messages = JSON.parse(raw);
    const id = Number(req.params.id);
    messages = messages.filter((m) => m.id !== id);
    writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2), "utf-8");
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete message." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
  console.log(`   📩 Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`   📋 Admin Panel: http://localhost:${PORT}/admin`);
});