import type { ReactNode } from "react";

const S = `
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(10,22,40,0.65);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    backdrop-filter: blur(2px);
  }
  .modal-box {
    background: #fff;
    width: 100%;
    max-width: 560px;
    max-height: 90vh;
    overflow-y: auto;
    border-top: 3px solid #E8873A;
    box-shadow: 0 24px 64px rgba(10,22,40,0.30), 0 2px 12px rgba(10,22,40,0.12);
  }
  .modal-box::-webkit-scrollbar { width: 4px; }
  .modal-box::-webkit-scrollbar-track { background: transparent; }
  .modal-box::-webkit-scrollbar-thumb { background: #E2DDD5; }

  .modal-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #E2DDD5;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 2;
  }
  .modal-head h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #0A1628;
    letter-spacing: -0.01em;
  }
  .modal-close {
    background: none;
    border: 1px solid #E2DDD5;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #8B95A1;
    cursor: pointer;
    transition: border-color 0.13s, color 0.13s;
    flex-shrink: 0;
    line-height: 1;
  }
  .modal-close:hover { border-color: #c8c2b8; color: #0A1628; }

  .modal-body { padding: 24px; }
  .modal-footer {
    padding: 16px 24px;
    border-top: 1px solid #E2DDD5;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    background: #FAFAF8;
  }

  /* Shared field styles (used by all page modals) */
  .f-field { margin-bottom: 18px; }
  .f-field label {
    display: block;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    color: #8B95A1;
    text-transform: uppercase;
    letter-spacing: 0.10em;
    margin-bottom: 7px;
  }
  .f-field input,
  .f-field textarea,
  .f-field select {
    width: 100%;
    border: 1px solid #E2DDD5;
    border-radius: 0;
    padding: 10px 13px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #0A1628;
    background: #fff;
    outline: none;
    transition: border-color 0.15s;
    -webkit-appearance: none;
  }
  .f-field input:focus,
  .f-field textarea:focus,
  .f-field select:focus { border-color: #E8873A; }
  .f-field textarea { resize: vertical; min-height: 90px; }
  .f-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 540px) { .f-row { grid-template-columns: 1fr; } }

  .form-error {
    border-left: 3px solid #E8873A;
    background: #fff8f3;
    color: #c55a10;
    padding: 10px 14px;
    margin-bottom: 18px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    line-height: 1.45;
  }

  /* Shared button styles */
  .btn-primary {
    padding: 10px 22px;
    background: #E8873A;
    color: #0A1628;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: background 0.15s;
  }
  .btn-primary:hover { background: #F0A669; }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-ghost {
    padding: 10px 22px;
    background: #fff;
    color: #8B95A1;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid #E2DDD5;
    cursor: pointer;
    transition: all 0.15s;
  }
  .btn-ghost:hover { border-color: #c8c2b8; color: #0A1628; }
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
            <div
                className="modal-backdrop"
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
                <div className="modal-box" style={width ? { maxWidth: width } : undefined}>
                    <div className="modal-head">
                        <h2>{title}</h2>
                        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
                    </div>
                    <div className="modal-body">{children}</div>
                    {footer && <div className="modal-footer">{footer}</div>}
                </div>
            </div>
        </>
    );
}
