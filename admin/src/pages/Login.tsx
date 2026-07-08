import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

const S = `
  .login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0A1628;padding:24px;}
  .login-box{background:#fff;width:100%;max-width:420px;padding:48px 40px;border-top:3px solid #E8873A;}
  .login-logo{margin-bottom:32px;}
  .login-logo img{height:36px;}
  .login-box h1{font-family:'Space Grotesk',sans-serif;font-size:22px;color:#0A1628;margin-bottom:6px;}
  .login-box p{font-size:14px;color:#8B95A1;margin-bottom:32px;}
  .form-field{margin-bottom:20px;}
  .form-field label{display:block;font-size:11px;font-weight:600;color:#4A5568;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:7px;}
  .form-field input{width:100%;border:1px solid #e2e8f0;padding:11px 14px;font-size:14px;border-radius:4px;outline:none;transition:border-color .2s;}
  .form-field input:focus{border-color:#E8873A;}
  .login-btn{width:100%;padding:13px;background:#E8873A;color:#0A1628;font-size:14px;font-weight:600;border:none;border-radius:4px;cursor:pointer;transition:background .2s;margin-top:8px;}
  .login-btn:hover{background:#F0A669;}
  .login-btn:disabled{opacity:0.6;cursor:not-allowed;}
  .login-error{background:#fff5f5;border:1px solid #fed7d7;color:#c53030;padding:10px 14px;border-radius:4px;font-size:13px;margin-bottom:20px;}
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
        setError(""); setLoading(true);
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
            <div className="login-wrap">
                <div className="login-box">
                    <div className="login-logo">
                        <img src="/anbe-logo-dark.svg" alt="ANBE" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: "#0A1628" }}>ANBE Admin</div>
                    </div>
                    <h1>Sign in</h1>
                    <p>Manage projects, services and team members.</p>
                    {error && <div className="login-error">{error}</div>}
                    <form onSubmit={submit}>
                        <div className="form-field">
                            <label>Username / Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
                        </div>
                        <div className="form-field">
                            <label>Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        <button className="login-btn" disabled={loading}>{loading ? "Signing in…" : "Sign In →"}</button>
                    </form>
                </div>
            </div>
        </>
    );
}
