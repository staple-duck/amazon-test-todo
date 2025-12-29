-- Categories table
-- Simple structure: just an id and name for now
-- We can always add more fields later if needed
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

-- Add some default categories to get started
INSERT INTO categories (name) VALUES 
    ('Work'),
    ('Personal'),
    ('Shopping')
ON CONFLICT (name) DO NOTHING;

