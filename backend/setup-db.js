const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    const schema = fs.readFileSync(
      path.join(__dirname, 'database', 'schema.sql'),
      'utf8'
    );

    // Split by ; but be careful with multiline statements
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--'));
    
    for (const statement of statements) {
      try {
        await connection.query(statement);
      } catch (error) {
        if (error.code === 'ER_DB_CREATE_EXISTS' || error.code === 'ER_TABLE_EXISTS_ERROR') {
          console.log(`⚠️  ${error.message}`);
        } else {
          throw error;
        }
      }
    }

    console.log('✅ Database schema created successfully!');
    
    // Insert games data
    try {
      await connection.query(`
        INSERT IGNORE INTO games (name, slug, description, status)
        VALUES 
          ('Fortnite Launcher', 'fortnitelauncher', 'Fortnite Launcher - Epic Games', 'available'),
          ('Visual Studio Code', 'visual-studio-code', 'Code Editor by Microsoft', 'available')
      `);
      console.log('✅ Games inserted successfully!');
    } catch (error) {
      console.warn('⚠️ Could not insert games:', error.message);
    }
    
    await connection.end();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupDatabase();
