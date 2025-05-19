import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function Chatbot() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [sending, setSending] = useState(false);
  const fileInputRef = useRef();

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.replace("/auth/auth");
  };

  // Protect route and get user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        setUser(null);
        setLoading(false);
      } else {
        setUser(data.user);
        setLoading(false);
      }
    });
  }, [router]);

  // Fetch chat history from backend
  useEffect(() => {
    if (user) {
      fetch(`/api/chat-history?user_id=${user.id}`)
        .then(res => res.json())
        .then(({ data }) => {
          if (data) {
            setChat(
              data.flatMap(row => [
                { sender: "user", text: row.message, time: row.created_at },
                { sender: "bot", text: row.response, time: row.created_at }
              ])
            );
          }
        });
    }
  }, [user]);

  // Send message to Gemini API
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const { data: { session } } = await supabase.auth.getSession();
    const userMessage = { sender: "user", text: input, time: new Date().toISOString() };
    setChat((prev) => [...prev, userMessage]);
    setSending(true);
    setInput("");
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ message: input, user_id: user.id }),
      });
      const data = await res.json();
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: data.response || "No response.", time: new Date().toISOString() },
      ]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Error contacting Gemini API.", time: new Date().toISOString() },
      ]);
    }
    setSending(false);
  };

  // Handle PDF upload and parsing
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch("/api/upload-pdf", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.text) {
      setInput(data.text.slice(0, 1000)); // Load first 1000 chars into input for demo
      alert("PDF text loaded! You can now chat about it.");
    } else {
      alert("Failed to parse PDF.");
    }
  };

  if (loading) return <div>Loading...</div>;

  // If not logged in, show login button
  if (!user) {
    return (
      <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
        <h2>Please log in to use the chatbot.</h2>
        <button onClick={() => router.push("/auth/auth")}>Login</button>
      </div>
    );
  }

  // Get first letter of email for avatar
  const avatarLetter = user.email ? user.email[0].toUpperCase() : "?";

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>
      {/* Top Bar */}
      <div style={{
        width: "100%",
        height: 60,
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#6366f1",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 20,
            boxShadow: "0 2px 8px #6366f122"
          }}>
            {avatarLetter}
          </div>
          <span style={{ fontWeight: 500, color: "#222" }}>{user.email}</span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 20px",
            fontWeight: 500,
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Chat Window */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "calc(100vh - 60px)",
        background: "#f3f4f6"
      }}>
        <div style={{
          width: "100%",
          maxWidth: 540,
          margin: "32px 0",
          padding: 16,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          minHeight: 400
        }}>
          {/* PDF Upload as Pin/Clipart */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
            <label
              htmlFor="pdf-upload"
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: 6,
                borderRadius: "50%",
                transition: "background 0.2s",
                background: "#f3f4f6",
                width: 36,
                height: 36,
                justifyContent: "center"
              }}
              title="Upload PDF"
            >
              {/* Paperclip SVG */}
              <svg width="22" height="22" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M21.44 11.05l-9.19 9.19a5 5 0 01-7.07-7.07l10.6-10.6a3 3 0 014.24 4.24l-10.6 10.6a1 1 0 01-1.42-1.42l9.19-9.19"/>
              </svg>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={handlePdfUpload}
                style={{ display: "none" }}
              />
            </label>
            <span style={{ fontSize: 14, color: "#888", marginLeft: 8 }}>Attach PDF</span>
          </div>
          {/* Chat Messages */}
          <div style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 12,
            height: 420,
            overflowY: "auto",
            background: "#fafafa",
            marginBottom: 8
          }}>
            {chat.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "8px 0"
                }}
              >
                <span style={{
                  display: "inline-block",
                  background: msg.sender === "user" ? "#0070f3" : "#e5e5ea",
                  color: msg.sender === "user" ? "#fff" : "#000",
                  padding: "8px 12px",
                  borderRadius: msg.sender === "user"
                    ? "16px 16px 0 16px"
                    : "16px 16px 16px 0",
                  maxWidth: "80%"
                }}>
                  {msg.text}
                </span>
                {msg.time && (
                  <span style={{ fontSize: "0.8em", color: "#888", marginLeft: 8 }}>
                    {new Date(msg.time).toLocaleString()}
                  </span>
                )}
              </div>
            ))}
          </div>
          {/* Input */}
          <form onSubmit={sendMessage} style={{ display: "flex", marginTop: 8 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: 8,
                border: "1px solid #ccc",
                borderRadius: 4,
                marginRight: 8
              }}
              disabled={sending}
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              style={{
                background: "#0070f3",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: 4,
                cursor: sending ? "not-allowed" : "pointer"
              }}
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}