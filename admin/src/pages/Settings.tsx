export default function Settings() {
    return (
        <>
            <div className="admin-topbar"><h2>Settings</h2></div>
            <div className="admin-content">
                <div style={{ background: "#fff", border: "1px solid rgba(10,22,40,0.1)", padding: 32, maxWidth: 560 }}>
                    <h3 style={{ marginBottom: 24, fontSize: 16 }}>Site Configuration</h3>
                    {[["Site Name", "ANBE Nigeria Limited"], ["Contact Email", "info@anbenig.com"], ["Phone", "  +234 803 310 0539"], ["Location", "Port Harcourt, Rivers State"]].map(([l, v]) => (
                        <div key={l} style={{ marginBottom: 20 }}>
                            <label style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8B95A1", marginBottom: 6 }}>{l}</label>
                            <input defaultValue={v} style={{ width: "100%", border: "1px solid rgba(10,22,40,0.12)", padding: "11px 14px", fontSize: 14, outline: "none" }} />
                        </div>
                    ))}
                    <button className="btn-primary">Save Changes</button>
                </div>
            </div>
        </>
    );
}
