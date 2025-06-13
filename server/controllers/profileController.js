const cloudinary = require('cloudinary');
const { initializeDatabase } = require('../config/database');

let pool; // Pool will be initialized once

// Initialize the pool when the module is loaded
(async () => {
  pool = await initializeDatabase();
})();

// GET /api/profile/educations
exports.getEducations = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM Educations WHERE user_id = ?',
      [req.user.user_id]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching education:', error);
    res.status(500).json({ message: 'Failed to fetch education data' });
  }
};

// GET /api/profile/experiences
exports.getExperiences = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM Work_Experience WHERE user_id = ?',
      [req.user.user_id]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ message: 'Failed to fetch experience data' });
  }
};