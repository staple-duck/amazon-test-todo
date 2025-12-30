-- Consolidated database initialization script for Todo application
-- This script combines all migrations and runs automatically on first Docker startup
-- All operations are idempotent (safe to run multiple times)

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

-- ============================================================================
-- Categories Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to auto-update the updated_at timestamp
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Index for faster lookups by name
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);

-- Add some default categories
INSERT INTO categories (name) VALUES 
    ('Work'),
    ('Personal'),
    ('Shopping')
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- Todos Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS todos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to auto-update the updated_at timestamp
DROP TRIGGER IF EXISTS update_todos_updated_at ON todos;
CREATE TRIGGER update_todos_updated_at
    BEFORE UPDATE ON todos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_todos_category_id ON todos(category_id);
CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);
CREATE INDEX IF NOT EXISTS idx_todos_due_date ON todos(due_date);
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at);

-- Partial index for active todos (most common query)
CREATE INDEX IF NOT EXISTS idx_todos_active ON todos(category_id, created_at) 
WHERE completed = false;

