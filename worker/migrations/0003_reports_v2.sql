-- Drop old reports table and recreate with full close-out report structure
DROP TABLE IF EXISTS project_reports;

CREATE TABLE project_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT UNIQUE NOT NULL,

  -- Cover block
  project_title   TEXT NOT NULL,
  client_name     TEXT NOT NULL,
  client_company  TEXT,
  contractor      TEXT DEFAULT 'ANBE Nigeria Limited',
  location        TEXT,
  report_date     TEXT,

  -- Narrative sections (stored as plain text)
  introduction    TEXT,
  scope_of_work   TEXT,
  conclusion      TEXT,
  achievements    TEXT,   -- JSON array of strings (bullet points)

  -- Structured sections (JSON)
  work_summary    TEXT,   -- {mechanical:[[act,qty],...], civil:[[act,qty],...], ei:[[act,qty],...]}
  materials       TEXT,   -- {mechanical:[[sn,desc,supplied,used,balance],...], civil:[...], ei:[...]}
  hse_notes       TEXT,   -- JSON array of bullet strings
  hse_status      TEXT,   -- JSON array of [item, status] rows
  personnel       TEXT,   -- JSON array of {name, designation, role}
  equipment       TEXT,   -- JSON array of {item, quantity}

  -- Sign-off
  signoff_contractor_name  TEXT,
  signoff_contractor_desig TEXT,
  signoff_contractor_date  TEXT,
  signoff_client_name      TEXT,
  signoff_client_desig     TEXT,
  signoff_client_date      TEXT,

  -- Images (JSON array of R2 URLs)
  images          TEXT DEFAULT '[]',

  -- Meta
  expires_at      TEXT,
  views           INTEGER DEFAULT 0,
  created_at      TEXT DEFAULT (datetime('now')),
  updated_at      TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_reports_token ON project_reports(token);
