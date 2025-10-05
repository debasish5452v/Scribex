// Database setup script - Run this once to create all necessary tables
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function setupDatabase() {
    try {
        console.log('🔄 Setting up database...');

        // Create creations table
        await sql`
            CREATE TABLE IF NOT EXISTS creations (
                id SERIAL PRIMARY KEY,
                user_id VARCHAR(255) NOT NULL,
                prompt TEXT NOT NULL,
                content TEXT NOT NULL,
                type VARCHAR(50) NOT NULL,
                publish BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log('✅ Created "creations" table');

        // Create indexes
        await sql`CREATE INDEX IF NOT EXISTS idx_creations_user_id ON creations(user_id)`;
        console.log('✅ Created index on user_id');

        await sql`CREATE INDEX IF NOT EXISTS idx_creations_created_at ON creations(created_at DESC)`;
        console.log('✅ Created index on created_at');

        await sql`CREATE INDEX IF NOT EXISTS idx_creations_publish ON creations(publish) WHERE publish = true`;
        console.log('✅ Created index on publish');

        console.log('🎉 Database setup completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Database setup failed:', error);
        process.exit(1);
    }
}

setupDatabase();
