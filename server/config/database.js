const mysql = require('mysql2/promise');
require('dotenv').config({ path: './config/config.env' });

// Create the connection pool
const createPool = () => mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
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
        role ENUM('job_seeker', 'admin') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        await connection.query(`
    CREATE TABLE IF NOT EXISTS Profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  bio TEXT,
  resume_url VARCHAR(255),
  skills JSON,
  avatar VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  UNIQUE(user_id)
)
     `);
            await connection.query(`
  CREATE TABLE IF NOT EXISTS Educations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  degree VARCHAR(100),
  institution VARCHAR(150),
  start_year YEAR,
  end_year YEAR,
  field_of_study VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
)   `);
    await connection.query(`
   CREATE TABLE IF NOT EXISTS Work_Experience (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  company_name VARCHAR(150),
  job_title VARCHAR(100),
  start_date DATE,
  end_date DATE,
  description TEXT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
)`);

     await connection.query(`
    CREATE TABLE IF NOT EXISTS job_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
     )
    `);
    
      await connection.query(` 
  CREATE TABLE IF NOT EXISTS companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) `);

    

    await connection.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        job_id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        company_id INT NOT NULL,
        company_logo_public_id VARCHAR(255),
        company_logo_url VARCHAR(255),
        location VARCHAR(255) NOT NULL,
        skills_required TEXT,
        experience VARCHAR(100),
        category_id INT NULL,
        salary VARCHAR(100),
        employment_type VARCHAR(100),
        posted_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (posted_by) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES job_categories(id) ON DELETE SET NULL,
        FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
      )
    `);
    
    
    
    await connection.query(`
    CREATE TABLE IF NOT EXISTS applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    applicant_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE CASCADE,
    FOREIGN KEY (applicant_id) REFERENCES users(user_id) ON DELETE CASCADE
      )
    `);
      
    
   
    
    
    await connection.query(`
    CREATE TABLE IF NOT EXISTS job_category_mappings (
    job_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (job_id, category_id),
    FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES job_categories(id) ON DELETE CASCADE
    )
   `);
  await connection.query(`
  CREATE TABLE IF NOT EXISTS saved_jobs (
  user_id INT NOT NULL,
  job_id INT NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, job_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE CASCADE
)`);


  await connection.query(` 
  CREATE TABLE IF NOT EXISTS companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) `);
  await connection.query(`
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
)`);




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