-- Initial database schema for Todo application
-- This creates the basic tables we'll need. We'll add more in the next commits.

-- Enable UUID extension for better IDs (more secure than auto-increment)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create updated_at trigger function
-- This automatically updates the updated_at column whenever a row changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- We'll add categories and todos tables in the next commits
-- This file establishes the foundation

