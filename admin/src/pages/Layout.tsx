import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

const S = `
  .admin-shell{display:flex;min-height:100vh;}
  .sidebar{width:220px;background:#0A1628;display:flex;flex-direction:column;flex-shrink:0;position:fixed;top:0;left:0;bottom:0;}
  .sidebar-logo{padding:24px 20px 20px;border-bottom:1px solid rgba(255,255,255,0.08);}
  .sidebar-logo div{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:700;color:#fff;}
  .sidebar-logo span{font-size:11px;color:#E8873A;letter-spacing:0.06em;text-transform:uppercase;}
  .sidebar-nav{padding:16px 0;flex:1;}
  .sidebar-nav a{display:flex;align-items:center;gap:10px;padding:11px 20px;font-size:14px;color:rgba(255,255,255,0.65);transition:all .2s;border-left:3px solid transparent;}
  .sidebar-nav a:hover{color:#fff;background:rgba(255,255,255,0.06);}
  .sidebar-nav a.active{color:#fff;background:rgba(232,135,58,0.12);border-left-color:#E8873A;}
  .sidebar-footer{padding:16px 20px;border-top:1px solid rgba(255,255,255,0.08);}
  .sidebar-footer button{background:none;border:none;color:rgba(255,255,255,0.5);font-size:13px;cursor:pointer;padding:0;}
  .sidebar-footer button:hover{color:#fff;}
  .main-content{margin-left:220px;flex:1;padding:36px 40px;max-width:1100px;}
  .page-header{margin-bottom:32px;}
  .page-header h1{font-family:'Space Grotesk',sans-serif;font-size:24px;color:#0A1628;margin-bottom:4px;}
  .page-header p{font-size:14px;color:#8B95A1;}
  @media(max-width:768px){.sidebar{width:100%;position:relative;}.admin-shell{flex-direction:column;}.main-content{margin-left:0;padding:20px;}}
`;

const NAV = [
    { to: "/projects", label: "Projects", icon: "◆" },
    { to: "/services", label: "Services", icon: "⚙" },
    { to: "/team", label: "Team", icon: "◉" },
    { to: "/reports", label: "Client Reports", icon: "⊡" },
];

export default function Layout() {
    const { admin, logout } = useAuth();
    const nav = useNavigate();
    const handleLogout = () => { logout(); nav("/login"); };
    return (
        <>
            <style>{S}</style>
            <div className="admin-shell">
                <aside className="sidebar">
                    <div className="sidebar-logo">
                        <div>ANBE</div>
                        <span>Admin Panel</span>
                    </div>
                    <nav className="sidebar-nav">
                        {NAV.map(n => (
                            <NavLink key={n.to} to={n.to} className={({ isActive }) => isActive ? "active" : ""}>
                                <span>{n.icon}</span>{n.label}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="sidebar-footer">
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>{admin?.email || "admin"}</div>
                        <button onClick={handleLogout}>Sign out</button>
                    </div>
                </aside>
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </>
    );
}
