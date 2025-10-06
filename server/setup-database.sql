-- Scribex Database Setup Script
-- Run this in your Neon SQL Editor to create the necessary tables

-- Create creations table to store all AI-generated content
CREATE TABLE IF NOT EXISTS creations (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    prompt TEXT NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    publish BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_creations_user_id ON creations(user_id);

-- Create index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_creations_created_at ON creations(created_at DESC);

-- Create index on publish for community page queries
CREATE INDEX IF NOT EXISTS idx_creations_publish ON creations(publish) WHERE publish = true