-- Add downloadable supporting documents to client project reports
ALTER TABLE project_reports ADD COLUMN attachments TEXT DEFAULT '[]';
