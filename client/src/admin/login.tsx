"use client";
import { useState } from "react";

const API = import.meta.env.VITE_API_URL ?? "https://anbe-api.workers.dev";

const S = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Inter',sans-serif;background:#0A1628;min-height:100vh;}
  .login-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:linear-gradient(135deg,#0A1628 0%,#10203A 60%,#16283F 100%);position:relative;overflow:hidden;}
  .login-page::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(139,149,161,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(139,149,161,0.06) 1px,transparent 1px);background-size:64px 64px;}
  .glow{position:absolute;right:10%;top:15%;width:400px;height:400px;background:radial-gradient(circle,rgba(232,135,58,0.2) 0%,transparent 70%);filter:blur(40px);pointer-events:none;}
  .login-box{position:relative;z-index:2;width:100%;max-width:420px;background:rgba(247,245,240,0.03);border:1px solid rgba(247,245,240,0.1);backdrop-filter:blur(12px);padding:48px 40px;}
  .login-logo{margin-bottom:32px;display:flex;flex-direction:column;gap:8px;}
  .login-logo img{height:44px;width:auto;}
  .login-logo .sub{font-family:'IBM Plex Mono',monospace;font-size:10px;color:#8B95A1;letter-spacing:0.12em;text-transform:uppercase;}
  .login-title{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:600;color:#fff;margin-bottom:6px;}
  .login-sub{font-size:13px;color:#8B95A1;margin-bottom:32px;font-family:'Inter',sans-serif;}
  .field{margin-bottom:18px;}
  .field label{display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;color:#8B95A1;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;}
  .field input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(247,245,240,0.14);padding:12px 14px;font-family:'Inter',sans-serif;font-size:14px;color:#fff;outline:none;transition:border-color .2s;}
  .field input:focus{border-color:#E8873A;}
  .field input::placeholder{color:#4A5568;}
  .btn-login{width:100%;padding:14px;background:#E8873A;color:#0A1628;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;border:none;cursor:pointer;letter-spacing:0.02em;transition:background .25s;margin-top:8px;}
  .btn-login:hover{background:#F0A669;}
  .btn-login:disabled{opacity:0.6;cursor:not-allowed;}
  .error{background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#f87171;font-size:13px;padding:10px 14px;margin-bottom:18px;font-family:'Inter',sans-serif;}
  .divider{border-top:1px solid rgba(247,245,240,0.1);margin:32px 0 24px;}
  .back{display:block;text-align:center;font-family:'IBM Plex Mono',monospace;font-size:11px;color:#8B95A1;text-decoration:none;letter-spacing:0.06em;transition:color .2s;}
  .back:hover{color:#E8873A;}
`;

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`${API}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Login failed");
            localStorage.setItem("anbe_token", data.token);
            localStorage.setItem("anbe_admin", JSON.stringify(data.admin));
            window.location.href = "/admin/dashboard";
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{S}</style>
            <div className="login-page">
                <div className="glow" aria-hidden="true" />
                <div className="login-box">
                    <div className="login-logo">
                        <img src="/anbe-logo.svg" alt="ANBE Nigeria Limited" />
                        <span className="sub">Admin Portal</span>
                    </div>
                    <div className="login-title">Sign in</div>
                    <div className="login-sub">Enter your credentials to access the admin dashboard.</div>

                    {error && <div className="error">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email" type="email" required autoComplete="email"
                                placeholder="admin@anbenig.com"
                                value={email} onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password" type="password" required autoComplete="current-password"
                                placeholder="••••••••"
                                value={password} onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? "Signing in…" : "Sign In →"}
                        </button>
                    </form>

                    <div className="divider" />
                    <a href="/" className="back">← Back to Website</a>
                </div>
            </div>
        </>
    );
}
