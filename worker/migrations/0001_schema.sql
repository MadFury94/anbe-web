-- Admin user
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  image TEXT,
  read_time TEXT,
  published INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  client TEXT,
  category TEXT,
  tag TEXT,
  description TEXT,
  image TEXT,
  location TEXT,
  duration TEXT,
  scope TEXT,
  published INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  idx TEXT,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  features TEXT,
  sort_order INTEGER DEFAULT 0,
  published INTEGER DEFAULT 1,
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Team members
CREATE TABLE IF NOT EXISTS team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT,
  image TEXT,
  bio TEXT,
  sort_order INTEGER DEFAULT 0,
  published INTEGER DEFAULT 1,
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Client Project Reports (shareable via unique token, not shown on public site)
CREATE TABLE IF NOT EXISTS project_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT UNIQUE NOT NULL,          -- random 24-char URL-safe token
  title TEXT NOT NULL,                  -- project title shown to client
  client_name TEXT NOT NULL,            -- who this report is for
  client_company TEXT,
  category TEXT,                        -- flare | pipeline | fabrication | maintenance
  location TEXT,
  start_date TEXT,
  end_date TEXT,
  scope TEXT,                           -- what was done (rich text / paragraphs as JSON)
  outcomes TEXT,                        -- key outcomes / achievements (JSON array)
  images TEXT,                          -- JSON array of image paths/URLs
  milestones TEXT,                      -- JSON array of {label, date, done}
  hse_note TEXT,                        -- safety/HSE summary
  prepared_by TEXT,                     -- e.g. "Ernest Azukaeme, CEO"
  expires_at TEXT,                      -- optional expiry date (ISO)
  views INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_reports_token ON project_reports(token);
