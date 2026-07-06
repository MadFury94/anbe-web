const messages = [
    { name: "John Adeyemi", email: "jadeyemi@example.com", scope: "Pipeline Construction", date: "July 2026", status: "Unread" },
    { name: "Emeka Obi", email: "eobi@example.com", scope: "Flare Systems", date: "June 2026", status: "Read" },
    { name: "Fatima Bello", email: "fbello@example.com", scope: "Fabrication", date: "June 2026", status: "Read" },
];
export default function Messages() {
    return (
        <>
            <div className="admin-topbar"><h2>Contact Messages</h2></div>
            <div className="admin-content">
                <table className="admin-table">
                    <thead><tr><th>Name</th><th>Email</th><th>Scope</th><th>Date</th><th>Status</th></tr></thead>
                    <tbody>{messages.map(m => (
                        <tr key={m.email}><td>{m.name}</td><td>{m.email}</td><td>{m.scope}</td><td>{m.date}</td><td><span className={`badge ${m.status === "Unread" ? "badge-amber" : "badge-navy"}`}>{m.status}</span></td></tr>
                    ))}</tbody>
                </table>
            </div>
        </>
    );
}
