import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";

const API = import.meta.env.VITE_API_URL || "http://localhost:8787";

const S = `
  .rf-page { display: grid; grid-template-columns: 220px 1fr; min-height: calc(100vh - 64px); }
  .rf-sidebar { position: sticky; top: 64px; height: calc(100vh - 64px); overflow-y: auto; background: #f8fafc; border-right: 1px solid #e2e8f0; padding: 24px 0; }
  .rf-sidebar-title { font-size: 10px; font-weight: 700; color: #8B95A1; text-transform: uppercase; letter-spacing: 0.08em; padding: 0 20px 10px; }
  .rf-sidebar a { display: block; padding: 9px 20px; font-size: 13px; color: #4A5568; text-decoration: none; border-left: 2px solid transparent; transition: all .15s; cursor: pointer; }
  .rf-sidebar a:hover { color: #0A1628; background: #fff; }
  .rf-sidebar a.active { color: #0A1628; font-weight: 600; border-left-color: #E8873A; background: #fff; }
  .rf-main { padding: 36px 40px 100px; max-width: 860px; }
  .rf-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; flex-wrap: wrap; gap: 12px; }
  .rf-topbar h1 { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 600; color: #0A1628; }
  .rf-topbar .actions { display: flex; gap: 10px; }
  .btn-save { padding: 10px 22px; background: #E8873A; color: #0A1628; font-size: 13px; font-weight: 600; border: none; border-radius: 2px; cursor: pointer; font-family: 'Inter', sans-serif; }
  .btn-save:hover { background: #F0A669; }
  .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
  .btn-back { padding: 10px 18px; background: #fff; color: #4A5568; font-size: 13px; font-weight: 500; border: 1px solid #e2e8f0; border-radius: 2px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; }
  .btn-back:hover { border-color: #0A1628; color: #0A1628; }
  /* Saved banner */
  .saved-banner { background: #f0fff4; border: 1px solid #9ae6b4; color: #276749; padding: 12px 18px; border-radius: 2px; font-size: 13px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; }
  .saved-banner a { color: #E8873A; font-weight: 600; text-decoration: none; font-size: 13px; }
  /* Sections */
  .form-section { margin-bottom: 0; scroll-margin-top: 80px; }
  .form-section-head { font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 600; color: #0A1628; padding: 24px 0 16px; border-bottom: 2px solid #E8873A; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
  .form-section-head span.num { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #E8873A; background: rgba(232,135,58,0.1); padding: 3px 8px; }
  .section-divider { border: none; border-top: 1px solid #e2e8f0; margin: 36px 0; }
  /* Fields */
  .f-field { margin-bottom: 18px; }
  .f-field label { display: block; font-size: 11px; font-weight: 600; color: #4A5568; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 7px; font-family: 'Inter', sans-serif; }
  .f-field input, .f-field textarea, .f-field select { width: 100%; border: 1px solid #e2e8f0; padding: 10px 13px; font-size: 14px; outline: none; transition: border-color .2s; font-family: 'Inter', sans-serif; background: #fff; color: #0A1628; border-radius: 2px; }
  .f-field input:focus, .f-field textarea:focus, .f-field select:focus { border-color: #E8873A; }
  .f-field textarea { resize: vertical; min-height: 90px; }
  .f-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .f-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
  /* Sub-labels */
  .sub-section { margin-bottom: 24px; }
  .sub-label { font-size: 12px; font-weight: 700; color: #0A1628; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
  .sub-label::after { content: ""; flex: 1; height: 1px; background: #e2e8f0; }
  /* Dynamic tables */
  .dyn-wrap { overflow-x: auto; }
  .dyn-table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 400px; }
  .dyn-table th { background: #0A1628; color: #fff; font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 9px 12px; text-align: left; font-weight: 500; white-space: nowrap; }
  .dyn-table td { border: 1px solid #e2e8f0; padding: 0; }
  .dyn-table td input { width: 100%; border: none; padding: 8px 10px; font-size: 13px; font-family: 'Inter', sans-serif; background: transparent; outline: none; min-width: 60px; }
  .dyn-table td input:focus { background: #fff8f0; }
  .dyn-table td.del-cell { width: 36px; text-align: center; }
  .row-del { padding: 0; background: none; border: none; color: #fc8181; cursor: pointer; font-size: 16px; width: 36px; height: 100%; display: flex; align-items: center; justify-content: center; }
  .row-del:hover { color: #c53030; }
  .add-row-btn { font-size: 12px; color: #E8873A; border: 1px dashed #E8873A; background: none; padding: 7px 14px; cursor: pointer; font-weight: 600; margin-top: 8px; border-radius: 2px; font-family: 'Inter', sans-serif; }
  .add-row-btn:hover { background: rgba(232,135,58,0.06); }
  /* Bullet lists */
  .bullet-wrap { display: flex; flex-direction: column; gap: 7px; }
  .bullet-row { display: flex; gap: 8px; align-items: center; }
  .bullet-row input { flex: 1; border: 1px solid #e2e8f0; padding: 8px 12px; font-size: 13.5px; font-family: 'Inter', sans-serif; outline: none; border-radius: 2px; }
  .bullet-row input:focus { border-color: #E8873A; }
  .bullet-del { padding: 0 10px; border: 1px solid #e2e8f0; background: #fff; color: #fc8181; cursor: pointer; font-size: 16px; border-radius: 2px; height: 36px; display: flex; align-items: center; }
  /* Image upload */
  .img-zone { border: 2px dashed #e2e8f0; padding: 28px 20px; text-align: center; cursor: pointer; transition: border-color .2s; border-radius: 2px; }
  .img-zone:hover { border-color: #E8873A; background: rgba(232,135,58,0.02); }
  .img-zone p { font-size: 13px; color: #8B95A1; margin: 0; }
  .img-zone .hint { font-size: 11px; color: #b0bec5; margin-top: 6px; }
  .img-previews { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; margin-top: 14px; }
  .img-thumb { position: relative; aspect-ratio: 4/3; overflow: hidden; border: 1px solid #e2e8f0; border-radius: 2px; }
  .img-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .img-thumb button { position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.65); color: #fff; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1; }
  .uploading-indicator { font-size: 12px; color: #8B95A1; margin-top: 8px; font-family: 'IBM Plex Mono', monospace; }
  .url-inputs { margin-top: 12px; display: flex; flex-direction: column; gap: 7px; }
  .url-row { display: flex; gap: 8px; }
  .url-row input { flex: 1; border: 1px solid #e2e8f0; padding: 8px 12px; font-size: 13px; font-family: 'Inter', sans-serif; outline: none; border-radius: 2px; }
  .url-row input:focus { border-color: #E8873A; }
  /* Error */
  .err-bar { background: #fff5f5; border: 1px solid #fed7d7; color: #c53030; padding: 12px 16px; font-size: 13px; margin-bottom: 20px; border-radius: 2px; }
  /* Mobile */
  @media (max-width: 900px) {
    .rf-page { grid-template-columns: 1fr; }
    .rf-sidebar { display: none; }
    .rf-main { padding: 24px 20px 80px; }
    .f-row, .f-row-3 { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .rf-topbar { flex-direction: column; align-items: flex-start; }
    .rf-topbar .actions { width: 100%; }
    .btn-save, .btn-back { flex: 1; justify-content: center; }
  }
`;

type Row = string[];
interface WorkSummary { mechanical: Row[]; civil: Row[]; ei: Row[]; }
interface Materials { mechanical: Row[]; civil: Row[]; ei: Row[]; }
interface Attachment { name: string; url: string; key?: string; type?: string; size?: number; }
interface ReportForm {
    project_title: string; client_name: string; client_company: string;
    contractor: string; location: string; report_date: string;
    introduction: string; scope_of_work: string; conclusion: string;
    achievements: string[];
    work_summary: WorkSummary;
    materials: Materials;
    hse_notes: string[]; hse_status: Row[];
    personnel: Row[]; equipment: Row[];
    signoff_contractor_name: string; signoff_contractor_desig: string; signoff_contractor_date: string; signoff_contractor_signature: string;
    signoff_client_name: string; signoff_client_desig: string; signoff_client_date: string;
    images: string[]; attachments: Attachment[]; expires_at: string;
}

const EMPTY: ReportForm = {
    project_title: "", client_name: "", client_company: "", contractor: "ANBE Nigeria Limited",
    location: "", report_date: "",
    introduction: "", scope_of_work: "", conclusion: "",
    achievements: [""],
    work_summary: { mechanical: [["", ""]], civil: [["", ""]], ei: [["", ""]] },
    materials: { mechanical: [["1", "", "", "", ""]], civil: [["1", "", "", "", ""]], ei: [["1", "", "", "", ""]] },
    hse_notes: [""], hse_status: [["", ""]],
    personnel: [["", ""]], equipment: [["", ""]],
    signoff_contractor_name: "", signoff_contractor_desig: "", signoff_contractor_date: "", signoff_contractor_signature: "",
    signoff_client_name: "", signoff_client_desig: "", signoff_client_date: "",
    images: [], attachments: [], expires_at: "",
};

const SECTIONS = [
    { id: "cover", label: "Cover Details" },
    { id: "intro", label: "1. Introduction" },
    { id: "scope", label: "2. Scope of Work" },
    { id: "worksummary", label: "3. Work Summary" },
    { id: "materials", label: "4. Materials Used" },
    { id: "hse", label: "5. HSE Performance" },
    { id: "personnel", label: "6. Personnel" },
    { id: "equipment", label: "7. Equipment" },
    { id: "achievements", label: "8. Achievements" },
    { id: "conclusion", label: "9. Conclusion" },
    { id: "signoff", label: "Sign-Off" },
    { id: "images", label: "Images" },
    { id: "attachments", label: "Attachments" },
];

// helpers
const addRow = (r: Row[], cols: number) => [...r, Array(cols).fill("")];
const delRow = (r: Row[], i: number) => r.filter((_, j) => j !== i);
const editCell = (r: Row[], ri: number, ci: number, v: string) =>
    r.map((row, i) => i === ri ? row.map((c, j) => j === ci ? v : c) : row);

function DynTable({ rows, headers, onChange }: { rows: Row[]; headers: string[]; onChange: (r: Row[]) => void; }) {
    return (
        <>
            <div className="dyn-wrap">
                <table className="dyn-table">
                    <thead><tr>
                        {headers.map(h => <th key={h}>{h}</th>)}
                        <th style={{ width: 36 }}></th>
                    </tr></thead>
                    <tbody>
                        {rows.map((row, ri) => (
                            <tr key={ri}>
                                {row.map((cell, ci) => (
                                    <td key={ci}><input value={cell} onChange={e => onChange(editCell(rows, ri, ci, e.target.value))} /></td>
                                ))}
                                <td className="del-cell"><button className="row-del" type="button" onClick={() => onChange(delRow(rows, ri))}>×</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="add-row-btn" type="button" onClick={() => onChange(addRow(rows, headers.length))}>+ Add Row</button>
        </>
    );
}

function BulletList({ items, onChange, placeholder }: { items: string[]; onChange: (v: string[]) => void; placeholder?: string; }) {
    return (
        <div className="bullet-wrap">
            {items.map((item, i) => (
                <div key={i} className="bullet-row">
                    <input value={item} placeholder={placeholder ?? "Enter item…"} onChange={e => onChange(items.map((v, j) => j === i ? e.target.value : v))} />
                    <button type="button" className="bullet-del" onClick={() => onChange(items.filter((_, j) => j !== i))}>×</button>
                </div>
            ))}
            <button className="add-row-btn" type="button" onClick={() => onChange([...items, ""])}>+ Add Item</button>
        </div>
    );
}

function SectionHead({ id, num, title }: { id: string; num?: string; title: string }) {
    return (
        <div id={id} className="form-section-head">
            {num && <span className="num">{num}</span>}
            {title}
        </div>
    );
}

function ImageUpload({ token, images, onChange }: { token: string; images: string[]; onChange: (imgs: string[]) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadErr, setUploadErr] = useState("");

    const doUpload = async (files: FileList | null) => {
        if (!files?.length) return;
        setUploading(true); setUploadErr("");
        const authToken = localStorage.getItem("anbe_admin_token") ?? "";
        const next = [...images];
        for (const file of Array.from(files)) {
            const fd = new FormData();
            fd.append("file", file);
            try {
                const res = await fetch(`${API}/api/reports/${token}/upload`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${authToken}` },
                    body: fd,
                });
                if (!res.ok) throw new Error("Upload failed");
                const { url } = await res.json();
                next.push(url);
            } catch (e) { setUploadErr((e as Error).message); }
        }
        onChange(next);
        setUploading(false);
    };

    return (
        <div>
            <div className="img-zone" onClick={() => inputRef.current?.click()}>
                <p>📎 Click to upload images (JPG, PNG, WEBP)</p>
                <p className="hint">Images are stored in Cloudflare R2 and linked automatically</p>
                <input ref={inputRef} type="file" multiple accept="image/*" style={{ display: "none" }}
                    onChange={e => doUpload(e.target.files)} />
            </div>
            {uploading && <p className="uploading-indicator">⏳ Uploading…</p>}
            {uploadErr && <p style={{ color: "#c53030", fontSize: 12, marginTop: 6 }}>{uploadErr}</p>}
            {images.filter(Boolean).length > 0 && (
                <div className="img-previews">
                    {images.filter(Boolean).map((src, i) => (
                        <div key={i} className="img-thumb">
                            <img src={src} alt={`upload ${i + 1}`} />
                            <button type="button" onClick={() => onChange(images.filter((_, j) => j !== i))}>×</button>
                        </div>
                    ))}
                </div>
            )}
            <p style={{ fontSize: 11, color: "#8B95A1", marginTop: 12 }}>Or paste image URLs directly:</p>
            <div className="url-inputs">
                {images.map((url, i) => (
                    <div key={i} className="url-row">
                        <input value={url} placeholder="https://... or /industrial-1.jpg"
                            onChange={e => onChange(images.map((v, j) => j === i ? e.target.value : v))} />
                        <button type="button" className="bullet-del" onClick={() => onChange(images.filter((_, j) => j !== i))}>×</button>
                    </div>
                ))}
                <button className="add-row-btn" type="button" onClick={() => onChange([...images, ""])}>+ Add URL</button>
            </div>
        </div>
    );
}

// ── AI Document Autofill ──────────────────────────────────────────────────
function formatBytes(size?: number) {
    if (!size) return "";
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function AttachmentUpload({ token, attachments, onChange }: { token?: string | null; attachments: Attachment[]; onChange: (files: Attachment[]) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadErr, setUploadErr] = useState("");
    const canUpload = Boolean(token);

    const doUpload = async (files: FileList | null) => {
        if (!files?.length || !token) return;
        setUploading(true);
        setUploadErr("");
        const authToken = localStorage.getItem("anbe_admin_token") ?? "";
        const next = [...attachments];
        for (const file of Array.from(files)) {
            const fd = new FormData();
            fd.append("file", file);
            try {
                const res = await fetch(`${API}/api/reports/${token}/attachments`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${authToken}` },
                    body: fd,
                });
                const data = await res.json() as { attachment?: Attachment; error?: string };
                if (!res.ok || data.error || !data.attachment) throw new Error(data.error ?? "Upload failed");
                next.push(data.attachment);
            } catch (e) {
                setUploadErr((e as Error).message);
            }
        }
        onChange(next);
        setUploading(false);
    };

    return (
        <div>
            {!canUpload && (
                <p style={{ fontSize: 12, color: "#8B95A1", marginBottom: 10 }}>
                    Save the report first, then upload supporting documents.
                </p>
            )}
            <div
                className="img-zone"
                onClick={() => canUpload && inputRef.current?.click()}
                style={{ cursor: canUpload ? "pointer" : "not-allowed", opacity: canUpload ? 1 : 0.6 }}
            >
                <p>Attach supporting documents</p>
                <p className="hint">PDF, Word, Excel, drawings, certificates, schedules or other project files</p>
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.jpg,.jpeg,.png,.webp,.zip"
                    style={{ display: "none" }}
                    onChange={e => { doUpload(e.target.files); e.target.value = ""; }}
                    disabled={!canUpload}
                />
            </div>
            {uploading && <p className="uploading-indicator">Uploading documents...</p>}
            {uploadErr && <p style={{ color: "#c53030", fontSize: 12, marginTop: 6 }}>{uploadErr}</p>}
            {attachments.length > 0 && (
                <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                    {attachments.map((file, i) => (
                        <div key={`${file.url}-${i}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, border: "1px solid #e2e8f0", padding: "10px 12px", borderRadius: 2 }}>
                            <div style={{ minWidth: 0 }}>
                                <a href={file.url} target="_blank" rel="noreferrer" style={{ color: "#0A1628", fontSize: 13, fontWeight: 600, textDecoration: "none", wordBreak: "break-word" }}>
                                    {file.name || `Attachment ${i + 1}`}
                                </a>
                                <div style={{ fontFamily: "'IBM Plex Mono',monospace", color: "#8B95A1", fontSize: 10, marginTop: 3 }}>
                                    {[file.type, formatBytes(file.size)].filter(Boolean).join(" / ")}
                                </div>
                            </div>
                            <button type="button" className="bullet-del" onClick={() => onChange(attachments.filter((_, j) => j !== i))}>x</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function AutofillUpload({ onFill }: { onFill: (data: Record<string, unknown>) => void }) {
    const [prompt, setPrompt] = useState("");
    const [generating, setGenerating] = useState(false);
    const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
    const [msg, setMsg] = useState("");
    const [mode, setMode] = useState<"prompt" | "upload">("prompt");
    const inputRef = useRef<HTMLInputElement>(null);
    const token_ = localStorage.getItem("anbe_admin_token") ?? "";

    const generateFromPrompt = async () => {
        if (!prompt.trim()) return;
        setGenerating(true); setStatus("idle"); setMsg("");
        try {
            const res = await fetch(`${API}/api/autofill`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token_}` },
                body: JSON.stringify({ prompt }),
            });
            const data = await res.json() as { data?: Record<string, unknown>; error?: string };
            if (!res.ok || data.error) throw new Error(data.error ?? "Generation failed");
            onFill(data.data!);
            setStatus("ok");
            setMsg("✓ Report generated successfully. Review all fields before saving.");
        } catch (e) {
            setStatus("err");
            setMsg((e as Error).message);
        } finally { setGenerating(false); }
    };

    const uploadDoc = async (file: File) => {
        setGenerating(true); setStatus("idle"); setMsg("");
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch(`${API}/api/autofill`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token_}` },
                body: fd,
            });
            const data = await res.json() as { data?: Record<string, unknown>; error?: string };
            if (!res.ok || data.error) throw new Error(data.error ?? "Extraction failed");
            onFill(data.data!);
            setStatus("ok");
            setMsg(`✓ Fields extracted from "${file.name}". Review before saving.`);
        } catch (e) {
            setStatus("err");
            setMsg((e as Error).message);
        } finally { setGenerating(false); }
    };

    return (
        <div style={{ marginBottom: 32, border: "2px solid #E8873A", borderRadius: 2 }}>
            {/* Header */}
            <div style={{ background: "#E8873A", padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 18 }}>🤖</span>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, color: "#0A1628" }}>AI Report Generator</span>
                    <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "rgba(10,22,40,0.6)", background: "rgba(10,22,40,0.1)", padding: "2px 8px", borderRadius: 10 }}>Powered by Cloudflare AI</span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                    {(["prompt", "upload"] as const).map(m => (
                        <button key={m} type="button" onClick={() => setMode(m)}
                            style={{ padding: "5px 14px", fontSize: 12, fontFamily: "'Inter',sans-serif", fontWeight: 600, border: "none", borderRadius: 2, cursor: "pointer", background: mode === m ? "#0A1628" : "rgba(10,22,40,0.15)", color: mode === m ? "#fff" : "#0A1628" }}>
                            {m === "prompt" ? "✏️ Describe Project" : "📄 Upload Document"}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ padding: "20px 18px" }}>
                {mode === "prompt" && (
                    <>
                        <p style={{ fontSize: 13, color: "#4A5568", fontFamily: "'Inter',sans-serif", marginBottom: 12 }}>
                            Describe the project in plain English — client, location, scope, duration, and any key details. AI will generate the entire report for you.
                        </p>
                        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 2, padding: "10px 14px", marginBottom: 12 }}>
                            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "#8B95A1", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Example prompt</p>
                            <p style={{ fontSize: 12, color: "#4A5568", fontFamily: "'Inter',sans-serif", fontStyle: "italic", lineHeight: 1.6 }}>
                                "Pipeline repair project for Heirs Energies at Umuechem Flow Station, Rivers State. 8-week scope replacing 120m of corroded 6-inch flowline. Tie-in completed during planned shutdown. 10 personnel deployed, zero LTI. Materials included 6-inch SCH40 pipe, fittings, and coating system."
                            </p>
                        </div>
                        <textarea
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            rows={5}
                            placeholder="Describe the project here — client name, location, scope of work, duration, personnel count, key outcomes…"
                            style={{ width: "100%", border: "1px solid #e2e8f0", padding: "12px 14px", fontSize: 14, fontFamily: "'Inter',sans-serif", outline: "none", resize: "vertical", borderRadius: 2, color: "#0A1628", lineHeight: 1.6 }}
                            onFocus={e => e.target.style.borderColor = "#E8873A"}
                            onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                        />
                        <button type="button" onClick={generateFromPrompt} disabled={generating || !prompt.trim()}
                            style={{ marginTop: 12, padding: "12px 28px", background: generating ? "#8B95A1" : "#0A1628", color: "#fff", border: "none", fontSize: 14, fontWeight: 700, fontFamily: "'Inter',sans-serif", cursor: generating || !prompt.trim() ? "not-allowed" : "pointer", borderRadius: 2, display: "flex", alignItems: "center", gap: 10, transition: "background .2s" }}>
                            {generating ? (
                                <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</span> Generating report…</>
                            ) : (
                                <><span>⚡</span> Generate Full Report</>
                            )}
                        </button>
                    </>
                )}

                {mode === "upload" && (
                    <>
                        <p style={{ fontSize: 13, color: "#4A5568", fontFamily: "'Inter',sans-serif", marginBottom: 16 }}>
                            Upload an existing close-out report (PDF, DOCX, or TXT) and AI will extract and structure all the data into the form fields.
                        </p>
                        <div onClick={() => inputRef.current?.click()}
                            style={{ border: "2px dashed #e2e8f0", borderRadius: 2, padding: "32px 20px", textAlign: "center", cursor: "pointer", transition: "border-color .2s" }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = "#E8873A")}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = "#e2e8f0")}>
                            <p style={{ fontSize: 32, marginBottom: 8 }}>📄</p>
                            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 14, color: "#0A1628", marginBottom: 4 }}>Click to upload a document</p>
                            <p style={{ fontSize: 12, color: "#8B95A1", fontFamily: "'Inter',sans-serif" }}>PDF, DOCX, DOC, or TXT — max 5MB</p>
                            <input ref={inputRef} type="file" accept=".pdf,.doc,.docx,.txt" style={{ display: "none" }}
                                onChange={e => { const f = e.target.files?.[0]; if (f) uploadDoc(f); e.target.value = ""; }} />
                        </div>
                    </>
                )}

                {generating && (
                    <div style={{ marginTop: 14, padding: "12px 16px", background: "rgba(232,135,58,0.06)", border: "1px solid rgba(232,135,58,0.2)", borderRadius: 2, fontSize: 13, color: "#92400e", fontFamily: "'Inter',sans-serif", display: "flex", alignItems: "center", gap: 10 }}>
                        <span>⏳</span> AI is generating your report… this takes 10–20 seconds.
                    </div>
                )}

                {msg && !generating && (
                    <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 2, fontSize: 13, fontFamily: "'Inter',sans-serif", background: status === "ok" ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${status === "ok" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, color: status === "ok" ? "#166534" : "#991b1b" }}>
                        {msg}
                    </div>
                )}
            </div>
        </div>
    );
}


// ── Signature Pad ─────────────────────────────────────────────────────────
function SignaturePad({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawing = useRef(false);
    const [mode, setMode] = useState<"draw" | "upload">("draw");

    const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        if ("touches" in e) {
            return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
        }
        return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
    };

    const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        const canvas = canvasRef.current; if (!canvas) return;
        drawing.current = true;
        const ctx = canvas.getContext("2d")!;
        const pos = getPos(e, canvas);
        ctx.beginPath(); ctx.moveTo(pos.x, pos.y);
    };
    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        if (!drawing.current) return;
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext("2d")!;
        ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.strokeStyle = "#0A1628";
        const pos = getPos(e, canvas);
        ctx.lineTo(pos.x, pos.y); ctx.stroke();
    };
    const endDraw = () => {
        drawing.current = false;
        const canvas = canvasRef.current; if (!canvas) return;
        onChange(canvas.toDataURL("image/png"));
    };
    const clear = () => {
        const canvas = canvasRef.current; if (!canvas) return;
        canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
        onChange("");
    };
    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => onChange(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    return (
        <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <button type="button" onClick={() => setMode("draw")}
                    style={{ padding: "6px 14px", fontSize: 12, fontFamily: "'Inter',sans-serif", border: "1px solid #e2e8f0", background: mode === "draw" ? "#0A1628" : "#fff", color: mode === "draw" ? "#fff" : "#4A5568", cursor: "pointer", borderRadius: 2 }}>
                    ✏️ Draw
                </button>
                <button type="button" onClick={() => setMode("upload")}
                    style={{ padding: "6px 14px", fontSize: 12, fontFamily: "'Inter',sans-serif", border: "1px solid #e2e8f0", background: mode === "upload" ? "#0A1628" : "#fff", color: mode === "upload" ? "#fff" : "#4A5568", cursor: "pointer", borderRadius: 2 }}>
                    📎 Upload
                </button>
                {value && <button type="button" onClick={clear}
                    style={{ padding: "6px 14px", fontSize: 12, fontFamily: "'Inter',sans-serif", border: "1px solid rgba(220,38,38,0.3)", background: "#fff", color: "#dc2626", cursor: "pointer", borderRadius: 2, marginLeft: "auto" }}>
                    Clear
                </button>}
            </div>
            {mode === "draw" && (
                <canvas ref={canvasRef} width={400} height={120}
                    onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
                    onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
                    style={{ border: "1px solid #e2e8f0", borderRadius: 2, cursor: "crosshair", touchAction: "none", width: "100%", height: 120, background: "#fafafa", display: "block" }} />
            )}
            {mode === "upload" && (
                <div>
                    <input type="file" accept="image/*" onChange={uploadFile}
                        style={{ fontSize: 13, fontFamily: "'Inter',sans-serif" }} />
                </div>
            )}
            {value && (
                <div style={{ marginTop: 8, padding: "8px 12px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 2 }}>
                    <p style={{ fontSize: 10, color: "#8B95A1", fontFamily: "'IBM Plex Mono',monospace", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Preview</p>
                    <img src={value} alt="Signature preview" style={{ maxHeight: 60, maxWidth: "100%", objectFit: "contain" }} />
                </div>
            )}
        </div>
    );
}

export default function ReportFormPage() {
    const { token: editToken } = useParams<{ token?: string }>();
    const navigate = useNavigate();
    const [form, setForm] = useState<ReportForm>(EMPTY);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [savedToken, setSavedToken] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState("cover");
    const [loading, setLoading] = useState(!!editToken);

    // Load existing report if editing
    useEffect(() => {
        if (!editToken) return;
        api.getReport(editToken).then(d => {
            setForm({ ...EMPTY, ...(d.report as unknown as ReportForm), attachments: ((d.report as { attachments?: Attachment[] }).attachments ?? []) });
            setSavedToken(editToken);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [editToken]);

    // ── Autosave — fires 3s after last change, only when we have a token ──
    const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [autoSaving, setAutoSaving] = useState(false);
    const formRef = useRef(form);
    formRef.current = form;

    useEffect(() => {
        if (!savedToken) return; // only autosave once report exists
        if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
        autosaveTimer.current = setTimeout(async () => {
            setAutoSaving(true);
            try {
                await api.updateReport(savedToken, formRef.current as unknown as Record<string, unknown>);
                setLastSaved(new Date());
            } catch { /* silent */ }
            finally { setAutoSaving(false); }
        }, 3000);
        return () => { if (autosaveTimer.current) clearTimeout(autosaveTimer.current); };
    }, [form, savedToken]);

    // ── Pre-fill from project ─────────────────────────────────────────────
    const [projects, setProjects] = useState<{ slug: string; title: string; client: string; client_company?: string; location: string; description: string; scope: string; duration: string; category: string }[]>([]);
    useEffect(() => {
        api.getProjects().then(r => setProjects(r.projects as typeof projects)).catch(() => { });
    }, []);

    const prefillFromProject = (slug: string) => {
        const p = projects.find(x => x.slug === slug);
        if (!p) return;
        setForm(prev => ({
            ...prev,
            project_title: p.title || prev.project_title,
            client_name: prev.client_name || p.client || "",
            client_company: prev.client_company || "",
            location: p.location || prev.location,
            scope_of_work: prev.scope_of_work || p.description || "",
            work_summary: prev.work_summary,
        }));
    };

    // Track active section via scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
            { rootMargin: "-40% 0px -55% 0px" }
        );
        SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
        return () => observer.disconnect();
    }, [loading]);

    const f = (k: keyof ReportForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(p => ({ ...p, [k]: e.target.value }));
    const set = (k: keyof ReportForm, v: unknown) => setForm(p => ({ ...p, [k]: v }));

    const siteBase = import.meta.env.VITE_SITE_URL ?? (window.location.hostname === "localhost" ? "http://localhost:5173" : "https://anbe-web.pages.dev");

    const save = async () => {
        if (!form.project_title || !form.client_name) { setError("Project title and client name are required."); return; }
        setSaving(true); setError("");
        try {
            if (editToken) {
                await api.updateReport(editToken, form as unknown as Record<string, unknown>);
                setSavedToken(editToken);
            } else {
                const result = await api.createReport(form as unknown as Record<string, unknown>);
                setSavedToken(result.token);
                navigate(`/reports/edit/${result.token}`, { replace: true });
            }
        } catch (e) { setError((e as Error).message); }
        finally { setSaving(false); }
    };

    if (loading) return (
        <div style={{ padding: 60, textAlign: "center", color: "#8B95A1", fontFamily: "'IBM Plex Mono',monospace", fontSize: 13 }}>
            Loading report…
        </div>
    );

    const reportUrl = savedToken ? `${siteBase}/report/${savedToken}` : null;

    return (
        <>
            <style>{S}</style>
            <div className="rf-page">

                {/* Sticky sidebar nav */}
                <aside className="rf-sidebar">
                    <div className="rf-sidebar-title">Sections</div>
                    {SECTIONS.map(s => (
                        <a key={s.id} className={activeSection === s.id ? "active" : ""}
                            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                            {s.label}
                        </a>
                    ))}
                </aside>

                {/* Form content */}
                <div className="rf-main">
                    <div className="rf-topbar">
                        <div>
                            <h1>{editToken ? "Edit Report" : "New Client Report"}</h1>
                            <p style={{ fontSize: 13, color: "#8B95A1", marginTop: 4 }}>
                                {autoSaving ? "⏳ Saving…" : lastSaved ? `✓ Last saved ${lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Changes save automatically after you stop typing."}
                            </p>
                        </div>
                        <div className="actions">
                            <a className="btn-back" onClick={() => navigate("/reports")}>← Back to Reports</a>
                            <button className="btn-save" onClick={save} disabled={saving}>
                                {saving ? "Saving…" : "Save Report"}
                            </button>
                        </div>
                    </div>

                    {error && <div className="err-bar">{error}</div>}

                    {savedToken && reportUrl && (
                        <div className="saved-banner">
                            <span>✓ Saved — client link: <strong>{reportUrl}</strong></span>
                            <div style={{ display: "flex", gap: 12 }}>
                                <a href={reportUrl} target="_blank" rel="noreferrer">Preview →</a>
                                <a href="#" onClick={e => { e.preventDefault(); navigator.clipboard.writeText(reportUrl); }}>Copy Link</a>
                            </div>
                        </div>
                    )}

                    {/* AI AUTOFILL BANNER */}
                    <AutofillUpload onFill={(data) => setForm(prev => ({ ...prev, ...data, attachments: prev.attachments }))} />

                    {/* COVER */}
                    <div className="form-section">
                        <SectionHead id="cover" title="Cover Details" />

                        {/* Pre-fill from existing project */}
                        {projects.length > 0 && !editToken && (
                            <div style={{ background: "rgba(232,135,58,0.06)", border: "1px solid rgba(232,135,58,0.2)", padding: "14px 16px", marginBottom: 24, borderRadius: 2 }}>
                                <label style={{ display: "block", fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, fontWeight: 600, color: "#E8873A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                                    ⚡ Pre-fill from existing project
                                </label>
                                <select
                                    defaultValue=""
                                    onChange={e => { if (e.target.value) prefillFromProject(e.target.value); }}
                                    style={{ width: "100%", border: "1px solid rgba(232,135,58,0.3)", background: "#fff", padding: "10px 12px", fontSize: 13, fontFamily: "'Inter',sans-serif", color: "#0A1628", outline: "none", borderRadius: 2, cursor: "pointer" }}
                                >
                                    <option value="" disabled>Select a project to auto-fill title, client, location and scope…</option>
                                    {projects.map(p => (
                                        <option key={p.slug} value={p.slug}>{p.title} — {p.client}</option>
                                    ))}
                                </select>
                                <p style={{ fontSize: 11, color: "#8B95A1", marginTop: 6, fontFamily: "'Inter',sans-serif" }}>Only empty fields will be filled. Your existing entries won't be overwritten.</p>
                            </div>
                        )}
                        <div className="f-row">
                            <div className="f-field"><label>Project Title *</label><input value={form.project_title} onChange={f("project_title")} placeholder="e.g. Interconnecting Piping for EP-6 Pump" /></div>
                            <div className="f-field"><label>Report Date</label><input type="date" value={form.report_date} onChange={f("report_date")} /></div>
                        </div>
                        <div className="f-row">
                            <div className="f-field"><label>Client Name *</label><input value={form.client_name} onChange={f("client_name")} placeholder="Contact person name" /></div>
                            <div className="f-field"><label>Client Company</label><input value={form.client_company} onChange={f("client_company")} placeholder="e.g. Heirs Energies Limited" /></div>
                        </div>
                        <div className="f-row">
                            <div className="f-field"><label>Contractor</label><input value={form.contractor} onChange={f("contractor")} /></div>
                            <div className="f-field"><label>Location / Flow Station</label><input value={form.location} onChange={f("location")} placeholder="e.g. Umuechem Flow Station" /></div>
                        </div>
                    </div>
                    <hr className="section-divider" />

                    {/* INTRODUCTION */}
                    <div className="form-section">
                        <SectionHead id="intro" num="1" title="Introduction" />
                        <div className="f-field">
                            <label>Introductory narrative</label>
                            <textarea rows={5} value={form.introduction} onChange={f("introduction")} placeholder="Brief introduction to the project, background and context…" />
                        </div>
                    </div>
                    <hr className="section-divider" />

                    {/* SCOPE */}
                    <div className="form-section">
                        <SectionHead id="scope" num="2" title="Scope of Work" />
                        <div className="f-field">
                            <label>Scope description</label>
                            <textarea rows={5} value={form.scope_of_work} onChange={f("scope_of_work")} placeholder="Describe all work included in this contract scope…" />
                        </div>
                    </div>
                    <hr className="section-divider" />

                    {/* WORK SUMMARY */}
                    <div className="form-section">
                        <SectionHead id="worksummary" num="3" title="Work Summary Executed" />
                        <div className="sub-section">
                            <div className="sub-label">Mechanical / Piping</div>
                            <DynTable headers={["Activity", "Quantity"]} rows={form.work_summary.mechanical}
                                onChange={rows => set("work_summary", { ...form.work_summary, mechanical: rows })} />
                        </div>
                        <div className="sub-section">
                            <div className="sub-label">Civil Works</div>
                            <DynTable headers={["Activity", "Quantity"]} rows={form.work_summary.civil}
                                onChange={rows => set("work_summary", { ...form.work_summary, civil: rows })} />
                        </div>
                        <div className="sub-section">
                            <div className="sub-label">E&amp;I Works</div>
                            <DynTable headers={["Activity", "Quantity"]} rows={form.work_summary.ei}
                                onChange={rows => set("work_summary", { ...form.work_summary, ei: rows })} />
                        </div>
                    </div>
                    <hr className="section-divider" />

                    {/* MATERIALS */}
                    <div className="form-section">
                        <SectionHead id="materials" num="4" title="List of Materials Used" />
                        {(["mechanical", "civil", "ei"] as const).map(type => (
                            <div key={type} className="sub-section">
                                <div className="sub-label">{type === "ei" ? "E&I" : type.charAt(0).toUpperCase() + type.slice(1)}</div>
                                <DynTable headers={["S/N", "Description", "Qty Supplied", "Qty Used", "Balance"]}
                                    rows={form.materials[type]}
                                    onChange={rows => set("materials", { ...form.materials, [type]: rows })} />
                            </div>
                        ))}
                    </div>
                    <hr className="section-divider" />

                    {/* HSE */}
                    <div className="form-section">
                        <SectionHead id="hse" num="5" title="HSE Performance" />
                        <div className="f-field">
                            <label>HSE Highlights (bullet points)</label>
                            <BulletList items={form.hse_notes} onChange={v => set("hse_notes", v)} placeholder="e.g. Zero Lost Time Incidents recorded throughout the project" />
                        </div>
                        <div className="f-field" style={{ marginTop: 20 }}>
                            <label>HSE Status Table</label>
                            <DynTable headers={["HSE Item", "Status"]} rows={form.hse_status} onChange={rows => set("hse_status", rows)} />
                        </div>
                    </div>
                    <hr className="section-divider" />

                    {/* PERSONNEL */}
                    <div className="form-section">
                        <SectionHead id="personnel" num="6" title="Project Personnel Summary" />
                        <p style={{ fontSize: 12, color: "#8B95A1", marginBottom: 12, fontFamily: "'Inter',sans-serif" }}>Enter each role and the number of personnel in that role.</p>
                        <DynTable headers={["Role", "Number"]} rows={form.personnel} onChange={rows => set("personnel", rows)} />
                    </div>
                    <hr className="section-divider" />

                    {/* EQUIPMENT */}
                    <div className="form-section">
                        <SectionHead id="equipment" num="7" title="Equipment Deployed" />
                        <DynTable headers={["Equipment", "Quantity"]} rows={form.equipment} onChange={rows => set("equipment", rows)} />
                    </div>
                    <hr className="section-divider" />

                    {/* ACHIEVEMENTS */}
                    <div className="form-section">
                        <SectionHead id="achievements" num="8" title="Project Achievements" />
                        <BulletList items={form.achievements} onChange={v => set("achievements", v)} placeholder="e.g. Project completed 2 weeks ahead of schedule" />
                    </div>
                    <hr className="section-divider" />

                    {/* CONCLUSION */}
                    <div className="form-section">
                        <SectionHead id="conclusion" num="9" title="Conclusion" />
                        <div className="f-field">
                            <textarea rows={5} value={form.conclusion} onChange={f("conclusion")} placeholder="Summarise the project outcome and close-out status…" />
                        </div>
                    </div>
                    <hr className="section-divider" />

                    {/* SIGN-OFF */}
                    <div className="form-section">
                        <SectionHead id="signoff" title="Sign-Off" />
                        <div style={{ marginBottom: 20 }}>
                            <div className="sub-label">For Contractor — ANBE Nigeria Limited</div>
                            <div className="f-row-3">
                                <div className="f-field"><label>Name</label><input value={form.signoff_contractor_name} onChange={f("signoff_contractor_name")} /></div>
                                <div className="f-field"><label>Designation</label><input value={form.signoff_contractor_desig} onChange={f("signoff_contractor_desig")} /></div>
                                <div className="f-field"><label>Date</label><input type="date" value={form.signoff_contractor_date} onChange={f("signoff_contractor_date")} /></div>
                            </div>
                            <div className="f-field">
                                <label>Signature</label>
                                <SignaturePad value={form.signoff_contractor_signature} onChange={v => set("signoff_contractor_signature", v)} />
                            </div>
                        </div>
                        <div>
                            <div className="sub-label">For Client</div>
                            <div className="f-row-3">
                                <div className="f-field"><label>Name</label><input value={form.signoff_client_name} onChange={f("signoff_client_name")} /></div>
                                <div className="f-field"><label>Designation</label><input value={form.signoff_client_desig} onChange={f("signoff_client_desig")} /></div>
                                <div className="f-field"><label>Date</label><input type="date" value={form.signoff_client_date} onChange={f("signoff_client_date")} /></div>
                            </div>
                        </div>
                    </div>
                    <hr className="section-divider" />

                    {/* IMAGES */}
                    <div className="form-section">
                        <SectionHead id="images" title="Images" />
                        <ImageUpload
                            token={savedToken ?? editToken ?? "new"}
                            images={form.images}
                            onChange={imgs => set("images", imgs)}
                        />
                    </div>
                    <hr className="section-divider" />

                    {/* ATTACHMENTS */}
                    <div className="form-section">
                        <SectionHead id="attachments" title="Supporting Documents" />
                        <AttachmentUpload
                            token={savedToken ?? editToken}
                            attachments={form.attachments ?? []}
                            onChange={files => set("attachments", files)}
                        />
                    </div>
                    <hr className="section-divider" />

                    {/* EXPIRY */}
                    <div className="f-field" style={{ maxWidth: 300 }}>
                        <label>Link Expiry Date (optional — leave blank to never expire)</label>
                        <input type="date" value={form.expires_at} onChange={f("expires_at")} />
                    </div>

                    {/* Bottom save bar */}
                    <div style={{ position: "sticky", bottom: 0, background: "#fff", borderTop: "1px solid #e2e8f0", padding: "16px 0", marginTop: 40, display: "flex", gap: 12, alignItems: "center" }}>
                        <button className="btn-save" onClick={save} disabled={saving} style={{ minWidth: 140 }}>
                            {saving ? "Saving…" : "Save Report"}
                        </button>
                        {savedToken && reportUrl && (
                            <a href={reportUrl} target="_blank" rel="noreferrer"
                                style={{ fontSize: 13, color: "#E8873A", fontWeight: 600, textDecoration: "none" }}>
                                Preview client view →
                            </a>
                        )}
                        {error && <span style={{ fontSize: 13, color: "#c53030" }}>{error}</span>}
                    </div>
                </div>
            </div>
        </>
    );
}
