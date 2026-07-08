const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8787";

function getToken(): string | null {
    return localStorage.getItem("anbe_admin_token");
}

async function req<T>(method: string, path: string, body?: unknown): Promise<T> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error((err as { error: string }).error || "Request failed");
    }
    return res.json();
}

export const api = {
    // Auth
    login: (email: string, password: string) =>
        req<{ token: string; admin: { email: string; name: string } }>("POST", "/api/auth/login", { email, password }),
    verify: () => req<{ valid: boolean }>("POST", "/api/auth/verify"),

    // Projects
    getProjects: () => req<{ projects: Project[] }>("GET", "/api/projects"),
    createProject: (data: Partial<Project>) => req<{ ok: boolean }>("POST", "/api/projects", data),
    updateProject: (slug: string, data: Partial<Project>) => req<{ ok: boolean }>("PUT", `/api/projects/${slug}`, data),
    deleteProject: (slug: string) => req<{ ok: boolean }>("DELETE", `/api/projects/${slug}`),

    // Services
    getServices: () => req<{ services: Service[] }>("GET", "/api/services"),
    createService: (data: Partial<Service>) => req<{ ok: boolean }>("POST", "/api/services", data),
    updateService: (id: number, data: Partial<Service>) => req<{ ok: boolean }>("PUT", `/api/services/${id}`, data),
    deleteService: (id: number) => req<{ ok: boolean }>("DELETE", `/api/services/${id}`),

    // Team
    getTeam: () => req<{ team: TeamMember[] }>("GET", "/api/team"),
    createTeamMember: (data: Partial<TeamMember>) => req<{ ok: boolean }>("POST", "/api/team", data),
    updateTeamMember: (id: number, data: Partial<TeamMember>) => req<{ ok: boolean }>("PUT", `/api/team/${id}`, data),
    deleteTeamMember: (id: number) => req<{ ok: boolean }>("DELETE", `/api/team/${id}`),

    // Reports
    getReports: () => req<{ reports: ReportSummary[] }>("GET", "/api/reports"),
    getReport: (token: string) => req<{ report: Record<string, unknown> }>("GET", `/api/reports/${token}`),
    createReport: (data: Record<string, unknown>) => req<{ token: string; url: string }>("POST", "/api/reports", data),
    updateReport: (token: string, data: Record<string, unknown>) => req<{ ok: boolean }>("PUT", `/api/reports/${token}`, data),
    deleteReport: (token: string) => req<{ ok: boolean }>("DELETE", `/api/reports/${token}`),
};

export interface Project {
    id: number; slug: string; title: string; client: string; category: string;
    tag: string; description: string; image: string; location: string;
    duration: string; scope: string; published: number;
}
export interface Service {
    id: number; idx: string; title: string; description: string;
    features: string[]; image: string; sort_order: number; published: number;
}
export interface TeamMember {
    id: number; name: string; role: string; image: string;
    bio: string; sort_order: number; published: number;
}

export interface ReportSummary {
    id: number; token: string; project_title: string; client_name: string;
    client_company: string; category: string; location: string; report_date: string;
    views: number; created_at: string; expires_at: string;
}
