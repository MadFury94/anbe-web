export default function Dashboard() {
    return (
        <>
            <div className="admin-topbar"><h2>Dashboard</h2><span style={{ fontSize: 13, color: "#8B95A1" }}>Welcome back</span></div>
            <div className="admin-content">
                <div className="stat-cards">
                    {[{ val: "140+", lbl: "Projects", change: "↑ 3 this month" }, { val: "6", lbl: "Blog Posts", change: "↑ 1 this month" }, { val: "24", lbl: "Messages", change: "↑ 5 this week" }, { val: "0", lbl: "LTI YTD", change: "✓ Clean record" }].map(s => (
                        <div key={s.lbl} className="stat-card"><div className="val">{s.val}</div><div className="lbl">{s.lbl}</div><div className="change">{s.change}</div></div>
                    ))}
                </div>
                <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Recent Activity</h3>
                <table className="admin-table">
                    <thead><tr><th>Event</th><th>Date</th><th>Status</th></tr></thead>
                    <tbody>
                        {[["Blog post published: Smokeless Flare Design", "June 2026", "Published"], ["New contact message received", "July 2026", "Unread"], ["Project added: Pipeline Integrity Repair", "May 2026", "Active"], ["Workshop expansion announcement", "Feb 2026", "Published"]].map(([e, d, s]) => (
                            <tr key={e}><td>{e}</td><td>{d}</td><td><span className={`badge ${s === "Published" ? "badge-green" : s === "Unread" ? "badge-amber" : "badge-navy"}`}>{s}</span></td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
