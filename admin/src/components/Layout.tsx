import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

interface LayoutProps {
    title: string;
    action?: React.ReactNode;
    children: React.ReactNode;
}

const navItems = [
    { to: "/projects", label: "Projects", icon: "🔧" },
    { to: "/services", label: "Services", icon: "⚙️" },
    { to: "/team", label: "Team", icon: "👥" },
];

export default function Layout({ title, action, children }: LayoutProps) {
    const { logout, admin } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <aside
                style={{
                    width: 220,
                    background: "#0A1628",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    flexShrink: 0,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    zIndex: 100,
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        padding: "28px 24px 20px",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    <div
                        style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#E8873A",
                            fontFamily: "'Space Grotesk', sans-serif",
                            letterSpacing: "0.04em",
                        }}
                    >
                        ANBE
                    </div>
                    <div
                        style={{
                            fontSize: "10px",
                            color: "rgba(255,255,255,0.35)",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            marginTop: "2px",
                        }}
                    >
                        Admin Panel
                    </div>
                </div>

                {/* Nav */}
                <nav style={{ padding: "12px 0", flex: 1 }}>
                    {navItems.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            style={({ isActive }) => ({
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "11px 24px",
                                fontSize: "14px",
                                color: isActive ? "#E8873A" : "rgba(255,255,255,0.6)",
                                background: isActive ? "rgba(232,135,58,0.1)" : "transparent",
                                borderRight: isActive ? "2px solid #E8873A" : "2px solid transparent",
                                transition: "all 0.15s",
                            })}
                        >
                            <span style={{ fontSize: "16px" }}>{icon}</span>
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom: user + logout */}
                <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    {admin && (
                        <div
                            style={{
                                fontSize: "12px",
                                color: "rgba(255,255,255,0.4)",
                                marginBottom: "12px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {admin?.email}
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.6)",
                            padding: "8px 16px",
                            borderRadius: "2px",
                            fontSize: "13px",
                            cursor: "pointer",
                            width: "100%",
                            textAlign: "left",
                        }}
                    >
                        ← Log out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div style={{ marginLeft: 220, flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                {/* Top bar */}
                <div
                    style={{
                        background: "#fff",
                        borderBottom: "1px solid rgba(10,22,40,0.1)",
                        padding: "0 32px",
                        height: "64px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "sticky",
                        top: 0,
                        zIndex: 50,
                    }}
                >
                    <h2
                        style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#0A1628",
                            fontFamily: "'Space Grotesk', sans-serif",
                        }}
                    >
                        {title}
                    </h2>
                    {action && <div>{action}</div>}
                </div>

                {/* Page content */}
                <div style={{ padding: "32px", flex: 1 }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
