import type { ReactNode } from "react";

const S = `
  .modal-backdrop{position:fixed;inset:0;background:rgba(10,22,40,0.6);z-index:1000;display:flex;align-items:center;justify-content:center;padding:24px;}
  .modal-box{background:#fff;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;border-radius:4px;border-top:3px solid #E8873A;}
  .modal-head{display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid #e2e8f0;}
  .modal-head h2{font-family:'Space Grotesk',sans-serif;font-size:18px;color:#0A1628;}
  .modal-close{background:none;border:none;font-size:20px;color:#8B95A1;cursor:pointer;line-height:1;padding:0;}
  .modal-body{padding:24px;}
  .modal-footer{padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;gap:10px;justify-content:flex-end;}
  .f-field{margin-bottom:18px;}
  .f-field label{display:block;font-size:11px;font-weight:600;color:#4A5568;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;}
  .f-field input,.f-field textarea,.f-field select{width:100%;border:1px solid #e2e8f0;padding:10px 12px;font-size:14px;border-radius:4px;outline:none;transition:border-color .2s;font-family:'Inter',sans-serif;}
  .f-field input:focus,.f-field textarea:focus,.f-field select:focus{border-color:#E8873A;}
  .f-field textarea{resize:vertical;min-height:90px;}
  .f-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .btn-primary{padding:10px 20px;background:#E8873A;color:#0A1628;font-size:13px;font-weight:600;border:none;border-radius:4px;cursor:pointer;}
  .btn-primary:hover{background:#F0A669;}
  .btn-primary:disabled{opacity:0.6;cursor:not-allowed;}
  .btn-ghost{padding:10px 20px;background:#fff;color:#4A5568;font-size:13px;font-weight:500;border:1px solid #e2e8f0;border-radius:4px;cursor:pointer;}
  .btn-ghost:hover{border-color:#cbd5e0;}
`;

interface Props {
    title: string;
    onClose: () => void;
    children: ReactNode;
    footer?: ReactNode;
    width?: number;
}

export default function Modal({ title, onClose, children, footer, width }: Props) {
    return (
        <>
            <style>{S}</style>
            <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
                <div className="modal-box" style={width ? { maxWidth: width } : undefined}>
                    <div className="modal-head">
                        <h2>{title}</h2>
                        <button className="modal-close" onClick={onClose}>✕</button>
                    </div>
                    <div className="modal-body">{children}</div>
                    {footer && <div className="modal-footer">{footer}</div>}
                </div>
            </div>
        </>
    );
}
