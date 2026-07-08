import { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth";

const S = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Design tokens ── */
  :root {
    --navy: #0A1628;
    --amber: #E8873A;
    --amber-soft: #F0A669;
    --paper: #F7F5F0;
    --steel: #8B95A1;
    --ink: #12181F;
    --border: #E2DDD5;
    --border-dark: rgba(255,255,255,0.08);
  }

  /* ── Shell ── */
  .adm-shell {
    display: flex;
    min-height: 100vh;
    background: var(--paper);
    font-family: 'Inter', sans-serif;
  }

  /* ═══════════════════════════════
     SIDEBAR
  ═══════════════════════════════ */
  .adm-sidebar {
    width: 240px;
    background: var(--navy);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 300;
    transition: transform 0.25s ease;
    overflow: hidden;
  }

  /* Logo area */
  .adm-logo {
    padding: 28px 24px 22px;
    border-bottom: 1px solid var(--border-dark);
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex-shrink: 0;
  }
  .adm-logo img {
    height: 42px;
    width: auto;
    display: block;
    object-fit: contain;
    object-position: left center;
  }
  .adm-logo-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    font-weight: 600;
    color: var(--amber);
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  /* Nav */
  .adm-nav {
    padding: 16px 0;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .adm-nav::-webkit-scrollbar { width: 0; }

  .adm-nav a {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 11px 24px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border-left: 3px solid transparent;
    transition: color 0.15s, background 0.15s, border-left-color 0.15s;
    white-space: nowrap;
  }
  .adm-nav a:hover {
    color: rgba(255,255,255,0.88);
    background: rgba(255,255,255,0.04);
  }
  .adm-nav a.active {
    color: #fff;
    background: rgba(232,135,58,0.10);
    border-left-color: var(--amber);
  }
  .adm-nav a .nav-icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    opacity: 0.65;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .adm-nav a.active .nav-icon { opacity: 1; }

  /* Divider */
  .adm-nav-divider {
    height: 1px;
    background: var(--border-dark);
    margin: 12px 24px;
  }

  /* View website */
  .adm-view-site {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 24px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: rgba(255,255,255,0.35) !important;
    text-decoration: none !important;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border-left: 3px solid transparent !important;
    transition: color 0.15s !important;
  }
  .adm-view-site:hover {
    color: rgba(255,255,255,0.6) !important;
    background: transparent !important;
  }

  /* Footer */
  .adm-sidebar-footer {
    padding: 18px 24px;
    border-top: 1px solid var(--border-dark);
    flex-shrink: 0;
  }
  .adm-email {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: rgba(255,255,255,0.3);
    margin-bottom: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.03em;
  }
  .adm-signout {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.45);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 8px 14px;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }
  .adm-signout:hover {
    border-color: rgba(232,135,58,0.45);
    color: var(--amber);
  }

  /* ═══════════════════════════════
     TOP BAR
  ═══════════════════════════════ */
  .adm-topbar {
    position: fixed;
    top: 0;
    left: 240px;
    right: 0;
    height: 64px;
    z-index: 200;
    background: #fff;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    padding: 0 36px;
    justify-content: space-between;
    gap: 16px;
  }
  .adm-topbar-left {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  }
  .adm-breadcrumb {
    min-width: 0;
  }
  .adm-breadcrumb-pre {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: var(--steel);
    text-transform: uppercase;
    letter-spacing: 0.10em;
    line-height: 1;
    margin-bottom: 3px;
  }
  .adm-breadcrumb-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--navy);
    letter-spacing: -0.01em;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .adm-admin-badge {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    font-weight: 600;
    color: var(--steel);
    text-transform: uppercase;
    letter-spacing: 0.10em;
    background: var(--paper);
    border: 1px solid var(--border);
    padding: 5px 10px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* Hamburger */
  .adm-hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: var(--navy);
    flex-shrink: 0;
  }

  /* ═══════════════════════════════
     MAIN CONTENT
  ═══════════════════════════════ */
  .adm-main {
    margin-left: 240px;
    padding-top: 64px;
    min-height: 100vh;
    background: var(--paper);
    flex: 1;
    min-width: 0;
  }
  .adm-content {
    padding: 40px;
    max-width: 1280px;
  }

  /* ═══════════════════════════════
     MOBILE OVERLAY
  ═══════════════════════════════ */
  .adm-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(10,22,40,0.6);
    z-index: 299;
    backdrop-filter: blur(2px);
  }
  .adm-overlay.open { display: block; }

  /* ═══════════════════════════════
     SHARED PAGE STYLES
  ═══════════════════════════════ */
  .page-header { margin-bottom: 28px; }
  .page-header h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--navy);
    letter-spacing: -0.02em;
    margin-bottom: 4px;
    line-height: 1.15;
  }
  .page-header p {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: var(--steel);
    line-height: 1.5;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    gap: 12px;
    flex-wrap: wrap;
  }

  /* Add button */
  .add-btn {
    padding: 10px 20px;
    background: var(--amber);
    color: var(--navy);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: background 0.15s;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .add-btn:hover { background: var(--amber-soft); }

  /* Action buttons */
  .action-btn {
    padding: 6px 12px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    border: 1px solid var(--border);
    background: #fff;
    color: var(--navy);
    transition: all 0.13s;
  }
  .action-btn:hover { background: var(--paper); border-color: #c8c2b8; }
  .action-btn.danger:hover { background: #fff5f5; border-color: #fca5a5; color: #c53030; }

  /* Badges */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 9px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .badge-green { background: #e8f5ec; color: #276749; }
  .badge-gray  { background: #f0f0ee; color: var(--steel); }

  /* Status dot */
  .status-dot {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .status-dot::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .status-dot.live  { color: #276749; }
  .status-dot.live::before  { background: #4CAF50; }
  .status-dot.draft { color: var(--steel); }
  .status-dot.draft::before { background: #c8c2b8; }

  /* Empty / loading */
  .empty {
    text-align: center;
    padding: 64px 24px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    color: var(--steel);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* Modal shared button styles */
  .btn-primary {
    padding: 10px 22px;
    background: var(--amber);
    color: var(--navy);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: background 0.15s;
  }
  .btn-primary:hover { background: var(--amber-soft); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-ghost {
    padding: 10px 22px;
    background: #fff;
    color: var(--steel);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid var(--border);
    cursor: pointer;
    transition: all 0.15s;
  }
  .btn-ghost:hover { border-color: #c8c2b8; color: var(--navy); }

  /* Form fields */
  .f-field { margin-bottom: 18px; }
  .f-field label {
    display: block;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    color: var(--steel);
    text-transform: uppercase;
    letter-spacing: 0.10em;
    margin-bottom: 7px;
  }
  .f-field input,
  .f-field textarea,
  .f-field select {
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 0;
    padding: 10px 13px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: var(--navy);
    background: #fff;
    outline: none;
    transition: border-color 0.15s;
    -webkit-appearance: none;
  }
  .f-field input:focus,
  .f-field textarea:focus,
  .f-field select:focus { border-color: var(--amber); }
  .f-field textarea { resize: vertical; min-height: 90px; }
  .f-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  /* Form error */
  .form-error {
    border-left: 3px solid var(--amber);
    background: #fff8f3;
    color: #c55a10;
    padding: 10px 14px;
    margin-bottom: 18px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    line-height: 1.45;
  }

  /* ═══════════════════════════════
     MOBILE
  ═══════════════════════════════ */
  @media (max-width: 768px) {
    .adm-sidebar { transform: translateX(-100%); }
    .adm-sidebar.open { transform: translateX(0); }
    .adm-topbar { left: 0; padding: 0 20px; }
    .adm-main { margin-left: 0; }
    .adm-hamburger { display: flex; }
    .adm-content { padding: 24px 18px; }
    .f-row { grid-template-columns: 1fr; }
    .toolbar { flex-wrap: wrap; }
  }
`;

const NAV_ITEMS = [
  {
    to: "/projects",
    label: "Projects",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="1.5" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="9" y="1.5" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="1.5" y="9" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="9" y="9" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    to: "/services",
    label: "Services",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M3.22 3.22l1.42 1.42M11.36 11.36l1.42 1.42M11.36 4.64l-1.42 1.42M4.64 11.36l-1.42 1.42" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    to: "/team",
    label: "Team",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M1 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
        <circle cx="12" cy="5" r="1.8" stroke="currentColor" strokeWidth="1.2" />
        <path d="M15 14c0-1.66-1.34-3-3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    to: "/reports",
    label: "Client Reports",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2.5" y="1.5" width="9" height="13" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 5h6M5 8h6M5 11h3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
        <path d="M13.5 4v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
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
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); nav("/login"); };
  const closeSidebar = () => setSidebarOpen(false);

  const currentTitle =
    Object.entries(PAGE_TITLES).find(([k]) => location.pathname.startsWith(k))?.[1] ?? "Admin";

  return (
    <>
      <style>{S}</style>
      <div className="adm-shell">

        {/* Mobile overlay */}
        <div
          className={`adm-overlay${sidebarOpen ? " open" : ""}`}
          onClick={closeSidebar}
        />

        {/* ── Sidebar ── */}
        <aside className={`adm-sidebar${sidebarOpen ? " open" : ""}`}>

          {/* Logo */}
          <div className="adm-logo">
            <img
              src="/anbe-logo.svg"
              alt="ANBE Nigeria Limited"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = "none";
              }}
            />
            <span className="adm-logo-label">Admin Portal</span>
          </div>

          {/* Nav links */}
          <nav className="adm-nav">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={closeSidebar}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}

            <div className="adm-nav-divider" />

            {/* View website */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="adm-view-site"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h7M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
              </svg>
              View Website
            </a>
          </nav>

          {/* Footer */}
          <div className="adm-sidebar-footer">
            <div className="adm-email">{admin?.email ?? "admin@anbe.ng"}</div>
            <button className="adm-signout" onClick={handleLogout}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 6h7M8 3l3 3-3 3M7 1.5H2v9h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
              </svg>
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── Top bar ── */}
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <button
              className="adm-hamburger"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M3 5.5h16M3 11h16M3 16.5h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
              </svg>
            </button>
            <div className="adm-breadcrumb">
              <div className="adm-breadcrumb-pre">ANBE Nigeria Limited</div>
              <div className="adm-breadcrumb-title">{currentTitle}</div>
            </div>
          </div>
          <div className="adm-admin-badge">ADMINISTRATOR</div>
        </header>

        {/* ── Main ── */}
        <main className="adm-main">
          <div className="adm-content">
            <Outlet />
          </div>
        </main>

      </div>
    </>
  );
}
