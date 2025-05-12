const mysql = require('mysql2/promise');
require('dotenv').config({ path: './config/config.env' });

// Create the connection pool
const createPool = () => mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ||  trion3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Table creation function
const createTables = async (pool) => {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('job_seeker', 'employer') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        job_id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        company_logo_public_id VARCHAR(255),
        company_logo_url VARCHAR(255),
        location VARCHAR(255) NOT NULL,
        skills_required TEXT,
        experience VARCHAR(100),
        category VARCHAR(100),
        salary VARCHAR(100),
        employment_type VARCHAR(100),
        posted_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (posted_by) REFERENCES users(user_id) ON DELETE CASCADE
      )
    `);
    console.log('Database tables verified/created');
  } catch (error) {
    console.error('Error creating tables:', error.message);
    throw error;
  } finally {
    connection.release();
  }
};

// Initialize database
const initializeDatabase = async () => {
  try {
    const pool = createPool();
    // Test connection
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    
    // Create tables
    await createTables(pool);
    
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw error;
  }
};

module.exports = {
  initializeDatabase
};
