-- Migration: Create categories table
-- Run this after running init.sql

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to auto-update the updated_at timestamp
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

