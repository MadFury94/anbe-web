import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

const S = `
  *{box-sizing:border-box;}

  .adm-shell{display:flex;min-height:100vh;background:#F7F5F0;}

  /* ── Sidebar ── */
  .adm-sidebar{
    width:240px;background:#0A1628;display:flex;flex-direction:column;
    flex-shrink:0;position:fixed;top:0;left:0;bottom:0;z-index:200;
    transition:transform .25s ease;
  }
  .adm-sidebar-logo{
    padding:28px 24px 22px;border-bottom:1px solid rgba(255,255,255,0.07);
    display:flex;align-items:center;gap:12px;
  }
  .adm-sidebar-logo img{height:40px;display:block;}
  .adm-sidebar-logo-text{display:flex;flex-direction:column;}
  .adm-sidebar-logo-name{
    font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:700;
    color:#fff;letter-spacing:0.02em;line-height:1.1;
  }
  .adm-sidebar-logo-sub{
    font-family:'IBM Plex Mono',monospace;font-size:9px;color:#E8873A;
    text-transform:uppercase;letter-spacing:0.12em;margin-top:2px;
  }
  .adm-sidebar-nav{padding:18px 0;flex:1;overflow-y:auto;}
  .adm-sidebar-nav a{
    display:flex;align-items:center;gap:12px;
    padding:12px 24px;font-family:'IBM Plex Mono',monospace;font-size:12px;
    color:rgba(255,255,255,0.55);transition:all .18s;
    border-left:3px solid transparent;text-decoration:none;letter-spacing:0.04em;
    text-transform:uppercase;
  }
  .adm-sidebar-nav a:hover{color:rgba(255,255,255,0.9);background:rgba(255,255,255,0.05);}
  .adm-sidebar-nav a.active{
    color:#fff;background:rgba(232,135,58,0.10);border-left-color:#E8873A;
  }
  .adm-sidebar-nav a svg{flex-shrink:0;opacity:0.7;}
  .adm-sidebar-nav a.active svg{opacity:1;}
  .adm-sidebar-footer{
    padding:18px 24px;border-top:1px solid rgba(255,255,255,0.07);
  }
  .adm-sidebar-email{
    font-family:'IBM Plex Mono',monospace;font-size:10px;
    color:rgba(255,255,255,0.35);margin-bottom:10px;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  .adm-signout{
    display:flex;align-items:center;gap:8px;
    background:none;border:1px solid rgba(255,255,255,0.12);
    color:rgba(255,255,255,0.5);font-family:'IBM Plex Mono',monospace;
    font-size:10px;text-transform:uppercase;letter-spacing:0.08em;
    padding:7px 12px;cursor:pointer;transition:all .18s;width:100%;
  }
  .adm-signout:hover{border-color:rgba(232,135,58,0.5);color:#E8873A;}

  /* ── Top bar ── */
  .adm-topbar{
    position:fixed;top:0;left:240px;right:0;height:60px;z-index:100;
    background:#fff;border-bottom:1px solid #e8e4dc;
    display:flex;align-items:center;padding:0 36px;
    justify-content:space-between;
  }
  .adm-topbar-title{
    font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:600;
    color:#0A1628;letter-spacing:0.01em;
  }
  .adm-topbar-breadcrumb{
    font-family:'IBM Plex Mono',monospace;font-size:10px;
    color:#8B95A1;text-transform:uppercase;letter-spacing:0.08em;
  }
  .adm-hamburger{
    display:none;background:none;border:none;cursor:pointer;
    padding:4px;color:#0A1628;
  }

  /* ── Main content ── */
  .adm-main{
    margin-left:240px;padding-top:60px;min-height:100vh;
    background:#F7F5F0;flex:1;
  }
  .adm-content{padding:36px 40px;max-width:1200px;}

  /* ── Page header (shared) ── */
  .page-header{margin-bottom:28px;}
  .page-header h1{
    font-family:'Space Grotesk',sans-serif;font-size:26px;font-weight:700;
    color:#0A1628;margin-bottom:4px;letter-spacing:-0.01em;
  }
  .page-header p{font-family:'Inter',sans-serif;font-size:14px;color:#8B95A1;}

  /* ── Toolbar (shared) ── */
  .toolbar{
    display:flex;justify-content:space-between;align-items:center;
    margin-bottom:24px;
  }
  .add-btn{
    padding:10px 20px;background:#E8873A;color:#0A1628;
    font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:600;
    border:none;cursor:pointer;text-transform:uppercase;letter-spacing:0.06em;
    transition:background .18s;
  }
  .add-btn:hover{background:#d97829;}

  /* ── Shared badge ── */
  .badge{
    display:inline-flex;align-items:center;gap:5px;
    padding:3px 10px;font-family:'IBM Plex Mono',monospace;
    font-size:10px;font-weight:500;letter-spacing:0.04em;
    border-radius:20px;
  }
  .badge-green{background:#e8f5ec;color:#276749;}
  .badge-gray{background:#f0f0ee;color:#8B95A1;}

  /* ── Shared action buttons ── */
  .action-btn{
    padding:6px 12px;font-family:'IBM Plex Mono',monospace;font-size:10px;
    font-weight:500;text-transform:uppercase;letter-spacing:0.04em;
    cursor:pointer;border:1px solid #e2ddd5;background:#fff;
    color:#0A1628;transition:all .15s;margin-right:6px;
  }
  .action-btn:hover{background:#F7F5F0;border-color:#c8c2b8;}
  .action-btn.danger:hover{background:#fff5f5;border-color:#fc8181;color:#c53030;}

  /* ── Empty / Loading ── */
  .empty{
    text-align:center;padding:60px 24px;
    font-family:'Inter',sans-serif;font-size:14px;color:#8B95A1;
  }

  /* ── Mobile overlay ── */
  .adm-overlay{
    display:none;position:fixed;inset:0;background:rgba(10,22,40,0.55);z-index:199;
  }

  /* ── Modal shared overrides ── */
  .btn-primary{
    padding:10px 22px;background:#E8873A;color:#0A1628;
    font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:600;
    border:none;cursor:pointer;text-transform:uppercase;letter-spacing:0.06em;
    transition:background .18s;
  }
  .btn-primary:hover{background:#d97829;}
  .btn-primary:disabled{opacity:0.55;cursor:not-allowed;}
  .btn-ghost{
    padding:10px 22px;background:#fff;color:#8B95A1;
    font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;
    border:1px solid #e2ddd5;cursor:pointer;text-transform:uppercase;letter-spacing:0.06em;
    transition:all .18s;
  }
  .btn-ghost:hover{border-color:#c8c2b8;color:#0A1628;}

  /* ── Form fields shared ── */
  .f-field{margin-bottom:18px;}
  .f-field label{
    display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;
    font-weight:600;color:#8B95A1;text-transform:uppercase;
    letter-spacing:0.08em;margin-bottom:7px;
  }
  .f-field input,.f-field textarea,.f-field select{
    width:100%;border:1px solid #e2ddd5;padding:10px 13px;
    font-family:'Inter',sans-serif;font-size:14px;color:#0A1628;
    outline:none;transition:border-color .18s;background:#fff;
    border-radius:0;
  }
  .f-field input:focus,.f-field textarea:focus,.f-field select:focus{
    border-color:#E8873A;
  }
  .f-field textarea{resize:vertical;min-height:90px;}
  .f-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}

  /* ── Mobile ── */
  @media(max-width:900px){
    .adm-sidebar{transform:translateX(-100%);}
    .adm-sidebar.open{transform:translateX(0);}
    .adm-overlay.open{display:block;}
    .adm-topbar{left:0;}
    .adm-main{margin-left:0;}
    .adm-hamburger{display:flex;}
    .adm-content{padding:24px 18px;}
    .f-row{grid-template-columns:1fr;}
  }
`;

const NAV_ITEMS = [
    {
        to: "/projects",
        label: "Projects",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
                <rect x="9" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
                <rect x="1" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
                <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        to: "/services",
        label: "Services",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                <path d="M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M11.53 4.47l-1.42 1.42M4.47 11.53l-1.42 1.42" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
            </svg>
        ),
    },
    {
        to: "/team",
        label: "Team",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M1 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                <circle cx="12" cy="5" r="1.8" stroke="currentColor" strokeWidth="1.3" />
                <path d="M15 13c0-1.66-1.34-3-3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
            </svg>
        ),
    },
    {
        to: "/reports",
        label: "Client Reports",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="1" width="10" height="14" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
                <path d="M14 4v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
        ),
    },
];

const PAGE_TITLES: Record<string, string> = {
    "/projects": "Projects",
    "/services": "Services",
    "/team": "Team",
    "/reports": "Client Reports",
};

export default function Layout() {
    const { admin, logout } = useAuth();
    const nav = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => { logout(); nav("/login"); };
    const closeSidebar = () => setSidebarOpen(false);

    // Determine current page title from pathname
    const path = window.location.pathname;
    const currentTitle =
        Object.entries(PAGE_TITLES).find(([k]) => path.startsWith(k))?.[1] ?? "Admin";

    return (
        <>
            <style>{S}</style>
            <div className="adm-shell">
                {/* Overlay for mobile */}
                <div
                    className={`adm-overlay${sidebarOpen ? " open" : ""}`}
                    onClick={closeSidebar}
                />

                {/* Sidebar */}
                <aside className={`adm-sidebar${sidebarOpen ? " open" : ""}`}>
                    <div className="adm-sidebar-logo">
                        <img
                            src="/anbe-logo.svg"
                            alt="ANBE"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                        <div className="adm-sidebar-logo-text">
                            <span className="adm-sidebar-logo-name">ANBE</span>
                            <span className="adm-sidebar-logo-sub">Admin Portal</span>
                        </div>
                    </div>

                    <nav className="adm-sidebar-nav">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => (isActive ? "active" : "")}
                                onClick={closeSidebar}
                            >
                                {item.icon}
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="adm-sidebar-footer">
                        <div className="adm-sidebar-email">{admin?.email ?? "admin@anbe.ng"}</div>
                        <button className="adm-signout" onClick={handleLogout}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M4 6h7M8 3l3 3-3 3M7 1H2v10h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
                            </svg>
                            Sign out
                        </button>
                    </div>
                </aside>

                {/* Top bar */}
                <header className="adm-topbar">
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <button
                            className="adm-hamburger"
                            onClick={() => setSidebarOpen((v) => !v)}
                            aria-label="Toggle navigation"
                        >
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path d="M3 6h16M3 11h16M3 16h16" stroke="#0A1628" strokeWidth="1.8" strokeLinecap="square" />
                            </svg>
                        </button>
                        <div>
                            <div className="adm-topbar-breadcrumb">ANBE Nigeria Limited</div>
                            <div className="adm-topbar-title">{currentTitle}</div>
                        </div>
                    </div>
                    <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "#8B95A1", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        {admin?.name ?? "Administrator"}
                    </div>
                </header>

                {/* Main */}
                <main className="adm-main">
                    <div className="adm-content">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}
