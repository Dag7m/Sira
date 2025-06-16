
const { initializeDatabase } = require('../config/database');

let pool; // Pool will be initialized once

// Initialize the pool when the module is loaded
(async () => {
  pool = await initializeDatabase();
})();

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const [jobs] = await pool.query('SELECT * FROM jobs');
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT * FROM users');
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all applications
exports.getAllApp = async (req, res) => {
  try {
    const [applications] = await pool.query(`
      SELECT applications.*, jobs.title AS job_title, users.name AS applicant_name
      FROM applications
      JOIN jobs ON applications.job_id = jobs.job_id
      JOIN users ON applications.applicant_id = users.user_id
    `);
    res.status(200).json({ success: true, applications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single application
exports.getApplication = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM applications WHERE application_id = ?`,
      [req.params.id]
    );
    res.status(200).json({ success: true, application: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update application status
exports.updateApplication = async (req, res) => {
  try {
    await pool.query(
      `UPDATE applications SET status = ? WHERE application_id = ?`,
      [req.body.status, req.params.id]
    );
    res.status(200).json({ success: true, message: 'Application Updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete application
exports.deleteApplication = async (req, res) => {
  try {
    await pool.query(`DELETE FROM applications WHERE application_id = ?`, [req.params.id]);
    res.status(200).json({ success: true, message: 'Application Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single user
exports.getUser = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM users WHERE user_id = ?`, [
      req.params.id,
    ]);
    res.status(200).json({ success: true, user: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update user role
exports.updateUser = async (req, res) => {
  try {
    await pool.query(`UPDATE users SET role = ? WHERE user_id = ?`, [
      req.body.role,
      req.params.id,
    ]);
    res.status(200).json({ success: true, message: 'User Updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    await pool.query(`DELETE FROM users WHERE user_id = ?`, [req.params.id]);
    res.status(200).json({ success: true, message: 'User Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single job
exports.getJob = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM jobs WHERE job_id = ?`, [
      req.params.id,
    ]);
    res.status(200).json({ success: true, job: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update job (with Cloudinary image update)
const cloudinary = require('cloudinary');

exports.updateJob = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM jobs WHERE job_id = ?`, [
      req.params.id,
    ]);
    const job = rows[0];

    if (job && job.company_logo_public_id) {
      await cloudinary.v2.uploader.destroy(job.company_logo_public_id);
    }

    const uploaded = await cloudinary.v2.uploader.upload(
      req.body.companyLogo,
      {
        folder: 'logo',
        crop: 'scale',
      }
    );

    await pool.query(
      `UPDATE jobs SET title = ?, description = ?, location = ?, company_logo_url = ?, company_logo_public_id = ? WHERE job_id = ?`,
      [
        req.body.title,
        req.body.description,
        req.body.location,
        uploaded.secure_url,
        uploaded.public_id,
        req.params.id,
      ]
    );

    res.status(200).json({ success: true, message: 'Job Updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    await pool.query(`DELETE FROM jobs WHERE job_id = ?`, [req.params.id]);
    res.status(200).json({ success: true, message: 'Job Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const [companies] = await pool.query('SELECT * FROM companies');
    res.status(200).json({ success: true, companies });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Add a company
exports.addCompany = async (req, res) => {
  try {
    const { name, description } = req.body;
    await pool.query(
      'INSERT INTO companies (name, description) VALUES (?, ?)',
      [name, description]
    );
    res.status(201).json({ success: true, message: 'Company Added' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a company
exports.deleteCompany = async (req, res) => {
  try {
    await pool.query(`DELETE FROM companies WHERE id = ?`, [req.params.id]);
    res.status(200).json({ success: true, message: 'Company Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};