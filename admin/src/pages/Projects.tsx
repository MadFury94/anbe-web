const projects = [
    { title: "Smokeless Flare Stack Retrofit", client: "Niger Delta Terminal", cat: "Flare Systems", status: "Completed" },
    { title: "18km Trunkline Replacement", client: "Delta State Flowline", cat: "Pipeline", status: "Completed" },
    { title: "Remote Ignition System Upgrade", client: "Rivers State Facility", cat: "Fabrication", status: "Completed" },
    { title: "Tie-In & Right-of-Way Reinstatement", client: "Bayelsa Flowstation", cat: "Pipeline", status: "Completed" },
    { title: "Vertical Smokeless Flare Installation", client: "Independent E&P Operator", cat: "Flare Systems", status: "Completed" },
    { title: "Combustion Equipment Overhaul", client: "Onshore Processing Facility", cat: "Maintenance", status: "Ongoing" },
];
export default function Projects() {
    return (
        <>
            <div className="admin-topbar"><h2>Projects</h2><button className="btn-primary">+ New Project</button></div>
            <div className="admin-content">
                <table className="admin-table">
                    <thead><tr><th>Title</th><th>Client</th><th>Category</th><th>Status</th></tr></thead>
                    <tbody>{projects.map(p => (
                        <tr key={p.title}><td>{p.title}</td><td>{p.client}</td><td>{p.cat}</td><td><span className={`badge ${p.status === "Completed" ? "badge-green" : "badge-amber"}`}>{p.status}</span></td></tr>
                    ))}</tbody>
                </table>
            </div>
        </>
    );
}
