-- Add contractor signature field to project_reports
ALTER TABLE project_reports ADD COLUMN signoff_contractor_signature TEXT DEFAULT '';
