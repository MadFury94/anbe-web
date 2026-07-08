import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

const S = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .login-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0A1628;
    padding: 24px;
    position: relative;
    overflow: hidden;
  }

  /* Subtle grid */
  .login-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(139,149,161,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139,149,161,0.06) 1px, transparent 1px);
    background-size: 52px 52px;
    pointer-events: none;
  }

  /* Animated amber glow top-right */
  .login-glow {
    position: absolute;
    top: -160px;
    right: -160px;
    width: 580px;
    height: 580px;
    background: radial-gradient(ellipse at center, rgba(232,135,58,0.20) 0%, transparent 65%);
    filter: blur(60px);
    pointer-events: none;
    animation: glowPulse 6s ease-in-out infinite;
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50%       { opacity: 1;   transform: scale(1.06); }
  }

  /* Corner accents */
  .login-corner-tl,
  .login-corner-br {
    position: absolute;
    width: 80px;
    height: 80px;
    pointer-events: none;
  }
  .login-corner-tl { top: 24px; left: 24px; border-top: 1px solid rgba(232,135,58,0.25); border-left: 1px solid rgba(232,135,58,0.25); }
  .login-corner-br { bottom: 24px; right: 24px; border-bottom: 1px solid rgba(232,135,58,0.25); border-right: 1px solid rgba(232,135,58,0.25); }

  /* Card */
  .login-card {
    position: relative;
    z-index: 2;
    background: #fff;
    width: 100%;
    max-width: 420px;
    padding: 48px 44px 44px;
    border-top: 3px solid #E8873A;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.04),
      0 32px 80px rgba(0,0,0,0.45),
      0 4px 20px rgba(0,0,0,0.25);
  }

  /* Logo + label */
  .login-logo-wrap {
    margin-bottom: 36px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .login-logo-wrap img {
    height: 48px;
    width: auto;
    display: block;
  }
  .login-portal-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    color: #E8873A;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  /* Heading */
  .login-card h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #0A1628;
    letter-spacing: -0.02em;
    margin-bottom: 6px;
    line-height: 1.1;
  }
  .login-sub {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #8B95A1;
    margin-bottom: 32px;
    line-height: 1.5;
  }

  /* Error */
  .login-error {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    border: 1px solid #fca5a5;
    background: #fff5f5;
    color: #c53030;
    padding: 11px 14px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    margin-bottom: 22px;
    line-height: 1.45;
    border-left: 3px solid #fc8181;
  }

  /* Field */
  .login-field { margin-bottom: 20px; }
  .login-field label {
    display: block;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    color: #8B95A1;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 8px;
  }
  .login-field input {
    width: 100%;
    border: 1px solid #E2DDD5;
    border-radius: 0;
    padding: 12px 14px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #0A1628;
    background: #fff;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    -webkit-appearance: none;
  }
  .login-field input:focus {
    border-color: #E8873A;
    box-shadow: 0 0 0 3px rgba(232,135,58,0.10);
  }
  .login-field input.error {
    border-color: #fc8181;
  }

  /* Submit */
  .login-btn {
    width: 100%;
    padding: 13px 20px;
    background: #E8873A;
    color: #0A1628;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    border: none;
    cursor: pointer;
    transition: background 0.15s;
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .login-btn:hover:not(:disabled) { background: #F0A669; }
  .login-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  /* Back link */
  .login-back {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 28px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    color: #8B95A1;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    transition: color 0.15s;
  }
  .login-back:hover { color: #0A1628; }

  @media (max-width: 480px) {
    .login-card { padding: 36px 24px 32px; }
    .login-card h1 { font-size: 24px; }
  }
`;

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      nav("/projects", { replace: true });
    } catch (err) {
      setError((err as Error).message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{S}</style>
      <div className="login-root">
        <div className="login-grid" />
        <div className="login-glow" />
        <div className="login-corner-tl" />
        <div className="login-corner-br" />

        <div className="login-card">
          {/* Logo */}
          <div className="login-logo-wrap">
            <img
              src="/anbe-logo.svg"
              alt="ANBE Nigeria Limited"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="login-portal-label">Admin Portal</span>
          </div>

          <h1>Sign in</h1>
          <p className="login-sub">Manage ANBE Nigeria Limited's content.</p>

          {error && (
            <div className="login-error">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="7" cy="7" r="6" stroke="#c53030" strokeWidth="1.4" />
                <path d="M7 4v3.5M7 9.5v.5" stroke="#c53030" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={submit}>
            <div className="login-field">
              <label>Email / Username</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={error ? "error" : ""}
                required
                autoFocus
                autoComplete="username"
              />
            </div>
            <div className="login-field">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error ? "error" : ""}
                required
                autoComplete="current-password"
              />
            </div>
            <button className="login-btn" disabled={loading}>
              {loading ? (
                "Signing in…"
              ) : (
                <>
                  Sign In
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h9M8 3.5l3.5 3.5-3.5 3.5" stroke="#0A1628" strokeWidth="1.6" strokeLinecap="square" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <a href="/" className="login-back">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10 6H2M5.5 2.5L2 6l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
            </svg>
            Back to website
          </a>
        </div>
      </div>
    </>
  );
}
