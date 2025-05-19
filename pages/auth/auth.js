import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setMessage("Login failed: " + error.message);
      } else {
        setMessage("Login successful! Redirecting...");
        setTimeout(() => router.push("/chatbot"), 1000);
      }
    } else {
      // Register
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) {
        setMessage("Registration failed: " + error.message);
      } else {
        setMessage("Registration successful! Redirecting...");
        setTimeout(() => router.push("/chatbot"), 1000);
      }
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #e0e7ff 0%, #f9fafb 100%)"
    }}>
      <div style={{
        maxWidth: 400,
        width: "100%",
        padding: 32,
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        boxShadow: "0 4px 24px #e0e7ff55",
        background: "#fff"
      }}>
        <h2 style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: 28,
          marginBottom: 24,
          color: "#1e293b"
        }}>
          {mode === "login" ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              padding: 12,
              borderRadius: 6,
              border: "1px solid #cbd5e1",
              fontSize: 16,
              marginBottom: 4
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              padding: 12,
              borderRadius: 6,
              border: "1px solid #cbd5e1",
              fontSize: 16,
              marginBottom: 4
            }}
          />
          <button
            type="submit"
            style={{
              padding: 12,
              borderRadius: 6,
              border: "none",
              background: "#6366f1",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
              marginTop: 8,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1
            }}
            disabled={loading}
          >
            {loading
              ? (mode === "login" ? "Logging in..." : "Registering...")
              : (mode === "login" ? "Login" : "Register")}
          </button>
        </form>
        <div style={{ marginTop: 20, textAlign: "center" }}>
          {mode === "login" ? (
            <span>
              Don't have an account?{" "}
              <button
                style={{
                  color: "#6366f1",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 500
                }}
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                style={{
                  color: "#6366f1",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 500
                }}
                onClick={() => setMode("login")}
              >
                Login
              </button>
            </span>
          )}
        </div>
        {message && (
          <div style={{
            marginTop: 18,
            color: message.includes("successful") ? "#059669" : "#dc2626",
            textAlign: "center",
            fontWeight: 500
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}