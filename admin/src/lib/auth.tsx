import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "./api";

interface AuthCtx {
    token: string | null;
    admin: { email: string; name: string } | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("anbe_admin_token"));
    const [admin, setAdmin] = useState<{ email: string; name: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) { setLoading(false); return; }
        api.verify().then(r => {
            if (!r.valid) { logout(); }
            setLoading(false);
        }).catch(() => { logout(); setLoading(false); });
    }, []);

    const login = async (email: string, password: string) => {
        const r = await api.login(email, password);
        localStorage.setItem("anbe_admin_token", r.token);
        setToken(r.token);
        setAdmin(r.admin);
    };

    const logout = () => {
        localStorage.removeItem("anbe_admin_token");
        setToken(null);
        setAdmin(null);
    };

    return <Ctx.Provider value={{ token, admin, login, logout, loading }}>{children}</Ctx.Provider>;
}

export function useAuth() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;
}
