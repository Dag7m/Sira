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
exports.deleteWorkExperience = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM work_experience WHERE id = ?', [id]);
    res.status(200).json({ message: 'Work experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting work experience:', error);
    res.status(500).json({ error: 'Failed to delete work experience' });
  }
};

// DELETE Education
exports.deleteEducation = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM educations WHERE id = ?', [id]);
    res.status(200).json({ message: 'Education deleted successfully' });
  } catch (error) {
    console.error('Error deleting education:', error);
    res.status(500).json({ error: 'Failed to delete education' });
  }
};
exports.addEducation = async (req, res) => {
  const { degree, institution, start_year, end_year , field_of_study } = req.body;
  const userId = req.user.user_id;

  try {
    const [result] = await pool.query(
      'INSERT INTO educations (user_id, degree, institution, start_year, end_year, field_of_study) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, degree, institution, start_year, end_year, field_of_study]
    );
    res.status(201).json({ message: 'Education added', id: result.insertId });
  } catch (err) {
    console.error('Error adding education:', err);
    res.status(500).json({ error: 'Failed to add education' });
  }
};
exports.addExperience = async (req, res) => {
  const userId = req.user.user_id;
  const { company_name, job_title, start_date, end_date, description } = req.body;

  try {
    await pool.query(
      'INSERT INTO work_experience (user_id, company_name, job_title, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, company_name, job_title, start_date, end_date, description]
    );
    res.status(201).json({ message: 'Experience added successfully' });
  } catch (error) {
    console.error('Error adding experience:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
