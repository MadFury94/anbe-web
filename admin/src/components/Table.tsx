import React from "react";

interface TableProps {
    headers: string[];
    rows: React.ReactNode[][];
    emptyMessage?: string;
}

export default function Table({ headers, rows, emptyMessage = "No records found." }: TableProps) {
    return (
        <div style={{ overflowX: "auto" }}>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    background: "#fff",
                    border: "1px solid rgba(10,22,40,0.1)",
                }}
            >
                <thead>
                    <tr style={{ background: "#F7F5F0" }}>
                        {headers.map((h, i) => (
                            <th
                                key={i}
                                style={{
                                    padding: "12px 16px",
                                    textAlign: "left",
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                    color: "#8B95A1",
                                    borderBottom: "1px solid rgba(10,22,40,0.1)",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr>
                            <td
                                colSpan={headers.length}
                                style={{
                                    padding: "40px 16px",
                                    textAlign: "center",
                                    color: "#8B95A1",
                                    fontSize: "14px",
                                }}
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        rows.map((cells, ri) => (
                            <tr key={ri} style={{ borderBottom: "1px solid rgba(10,22,40,0.06)" }}>
                                {cells.map((cell, ci) => (
                                    <td key={ci} style={{ padding: "14px 16px", fontSize: "14px", color: "#0A1628" }}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
