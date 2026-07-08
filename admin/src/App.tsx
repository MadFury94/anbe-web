import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/auth";
import LoginPage from "./pages/Login";
import Layout from "./pages/Layout";
import ProjectsPage from "./pages/Projects";
import ServicesPage from "./pages/Services";
import TeamPage from "./pages/Team";
import ReportsPage from "./pages/Reports";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { token, loading } = useAuth();
    if (loading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "Inter,sans-serif", color: "#8B95A1" }}>Loading…</div>;
    return token ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                    <Route index element={<Navigate to="/projects" replace />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="team" element={<TeamPage />} />
                    <Route path="reports" element={<ReportsPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AuthProvider>
    );
}
