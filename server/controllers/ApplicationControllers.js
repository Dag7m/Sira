
const cloudinary = require('cloudinary');
const { initializeDatabase } = require('../config/database');

let pool; // Pool will be initialized once

// Initialize the pool when the module is loaded
(async () => {
  pool = await initializeDatabase();
})();

// Create a new application
exports.createApplication = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user.user_id;

        // Check if user already applied
        const [applied] = await pool.query(
            'SELECT * FROM applications WHERE job_id = ? AND applicant_id = ?',
            [jobId, userId]
        );

        if (applied.length > 0) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job."
            });
        }




        // Insert application
        const [result] = await pool.query(
            `INSERT INTO applications (job_id, applicant_id)
             VALUES (?, ?)`,
            [jobId, userId]
        );

        res.status(200).json({
            success: true,
            message: "Application created",
            application_id: result.insertId
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get a single application
exports.getSingleApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;

        const [[application]] = await pool.query(
            `SELECT a.*, j.title AS job_title, u.name AS applicant_name, u.email AS applicant_email
             FROM applications a
             JOIN jobs j ON a.job_id = j.job_id
             JOIN users u ON a.applicant_id = u.user_id
             WHERE a.application_id = ?`,
            [applicationId]
        );

        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        res.status(200).json({ success: true, application });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get all applications by a user
exports.getUsersAllApplications = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const [applications] = await pool.query(
            `SELECT a.*, j.title AS job_title
             FROM applications a
             JOIN jobs j ON a.job_id = j.job_id
             WHERE a.applicant_id = ?`,
            [userId]
        );

        res.status(200).json({ success: true, allApplications: applications });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete application
exports.deleteApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const userId = req.user.user_id;

        // Check if the application exists and belongs to the user
        const [[application]] = await pool.query(
            'SELECT * FROM applications WHERE application_id = ? AND applicant_id = ?',
            [applicationId, userId]
        );

        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found or unauthorized" });
        }

        // Delete the application
        await pool.query('DELETE FROM applications WHERE application_id = ?', [applicationId]);

        res.status(200).json({ success: true, message: "Application deleted" });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
