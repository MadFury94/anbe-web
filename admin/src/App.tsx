import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import Projects from "./pages/Projects";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

export default function App() {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="brand">
                    <h1>ANBE Admin</h1>
                    <span>Nigeria Limited</span>
                </div>
                <nav className="admin-nav">
                    <NavLink to="/" end>⬛ Dashboard</NavLink>
                    <NavLink to="/posts">📝 Blog Posts</NavLink>
                    <NavLink to="/projects">🔧 Projects</NavLink>
                    <NavLink to="/messages">✉️ Messages</NavLink>
                    <NavLink to="/settings">⚙️ Settings</NavLink>
                </nav>
            </aside>
            <div className="admin-main">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </div>
    );
}
