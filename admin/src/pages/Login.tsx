import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

const S = `
  .login-root{
    min-height:100vh;display:flex;align-items:center;justify-content:center;
    background:#0A1628;padding:24px;position:relative;overflow:hidden;
  }

  /* Grid overlay */
  .login-grid{
    position:absolute;inset:0;
    background-image:
      linear-gradient(rgba(139,149,161,0.07) 1px,transparent 1px),
      linear-gradient(90deg,rgba(139,149,161,0.07) 1px,transparent 1px);
    background-size:48px 48px;
    pointer-events:none;
  }

  /* Amber flare */
  .login-flare{
    position:absolute;top:-120px;right:-120px;
    width:520px;height:520px;
    background:radial-gradient(ellipse at center,rgba(232,135,58,0.22) 0%,transparent 65%);
    filter:blur(40px);pointer-events:none;
  }

  /* Card */
  .login-card{
    position:relative;z-index:2;
    background:#fff;width:100%;max-width:420px;
    border-left:3px solid #E8873A;
    padding:48px 44px 44px;
    box-shadow:0 32px 64px rgba(0,0,0,0.35),0 4px 16px rgba(0,0,0,0.2);
  }

  .login-logo-wrap{margin-bottom:32px;display:flex;flex-direction:column;align-items:flex-start;gap:6px;}
  .login-logo-wrap img{height:48px;display:block;}
  .login-portal-label{
    font-family:'IBM Plex Mono',monospace;font-size:10px;
    color:#E8873A;text-transform:uppercase;letter-spacing:0.14em;
  }

  .login-card h1{
    font-family:'Space Grotesk',sans-serif;font-size:26px;font-weight:700;
    color:#0A1628;margin:0 0 6px;letter-spacing:-0.01em;
  }
  .login-sub{
    font-family:'Inter',sans-serif;font-size:14px;color:#8B95A1;
    margin-bottom:32px;line-height:1.5;
  }

  .login-field{margin-bottom:20px;}
  .login-field label{
    display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;
    font-weight:600;color:#8B95A1;text-transform:uppercase;letter-spacing:0.10em;
    margin-bottom:8px;
  }
  .login-field input{
    width:100%;border:1px solid #e2ddd5;padding:12px 14px;
    font-family:'Inter',sans-serif;font-size:14px;color:#0A1628;
    outline:none;transition:border-color .18s;background:#fff;
    border-radius:0;
  }
  .login-field input:focus{border-color:#E8873A;}

  .login-btn{
    width:100%;padding:13px;background:#E8873A;color:#0A1628;
    font-family:'IBM Plex Mono',monospace;font-size:12px;font-weight:700;
    border:none;cursor:pointer;text-transform:uppercase;letter-spacing:0.10em;
    transition:background .18s;margin-top:8px;display:flex;
    align-items:center;justify-content:center;gap:8px;
  }
  .login-btn:hover{background:#d97829;}
  .login-btn:disabled{opacity:0.55;cursor:not-allowed;}

  .login-error{
    border-left:3px solid #E8873A;background:#fff8f3;
    color:#c55a10;padding:10px 14px;
    font-family:'Inter',sans-serif;font-size:13px;
    margin-bottom:20px;line-height:1.45;
  }

  @media(max-width:480px){
    .login-card{padding:36px 24px;}
    .login-card h1{font-size:22px;}
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
            setError((err as Error).message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{S}</style>
            <div className="login-root">
                <div className="login-grid" />
                <div className="login-flare" />

                <div className="login-card">
                    <div className="login-logo-wrap">
                        <img
                            src="/anbe-logo.svg"
                            alt="ANBE Nigeria Limited"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                        <span className="login-portal-label">Admin Portal</span>
                    </div>

                    <h1>Sign in</h1>
                    <p className="login-sub">Manage ANBE Nigeria Limited's content.</p>

                    {error && <div className="login-error">{error}</div>}

                    <form onSubmit={submit}>
                        <div className="login-field">
                            <label>Email / Username</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                        <path d="M2 7h10M8 3l4 4-4 4" stroke="#0A1628" strokeWidth="1.5" strokeLinecap="square" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
