const posts = [
    { title: "The Engineering Case for Smokeless Flare Systems", cat: "Engineering", date: "June 2026", status: "Published" },
    { title: "Pipeline Integrity Management in the Niger Delta", cat: "Field Work", date: "May 2026", status: "Published" },
    { title: "Building Indigenous Engineering Capacity in Nigeria", cat: "Company", date: "April 2026", status: "Published" },
    { title: "Why Permit-to-Work Systems Save Lives", cat: "Safety", date: "March 2026", status: "Published" },
    { title: "ANBE Expands Port Harcourt Fabrication Workshop", cat: "Fabrication", date: "Feb 2026", status: "Published" },
    { title: "EPC Contracting in Nigeria's Oil & Gas Sector", cat: "Industry", date: "Jan 2026", status: "Published" },
];
export default function Posts() {
    return (
        <>
            <div className="admin-topbar"><h2>Blog Posts</h2><button className="btn-primary">+ New Post</button></div>
            <div className="admin-content">
                <table className="admin-table">
                    <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Status</th></tr></thead>
                    <tbody>{posts.map(p => (
                        <tr key={p.title}><td>{p.title}</td><td>{p.cat}</td><td>{p.date}</td><td><span className="badge badge-green">{p.status}</span></td></tr>
                    ))}</tbody>
                </table>
            </div>
        </>
    );
}
