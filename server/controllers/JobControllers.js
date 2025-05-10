const pool = require('../config/database');
const cloudinary = require('cloudinary');

exports.createJob = async (req, res) => {
    try {
        const { title, description, companyName, location, logo, skillsRequired, experience, salary, category, employmentType } = req.body;

        const myCloud = await cloudinary.v2.uploader.upload(logo, {
            folder: 'logo',
            crop: "scale",
        });

        const [result] = await pool.query(
            `INSERT INTO jobs 
            (title, description, company_name, company_logo_public_id, company_logo_url, 
             location, skills_required, experience, category, salary, employment_type, posted_by)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title,
                description,
                companyName,
                myCloud.public_id,
                myCloud.secure_url,
                location,
                skillsRequired,
                experience,
                category,
                salary,
                employmentType,
                req.user.user_id
            ]
        );

        const [newJob] = await pool.query(
            `SELECT * FROM jobs WHERE job_id = ?`,
            [result.insertId]
        );

        res.status(200).json({
            success: true,
            message: "Job created successfully",
            newJob: newJob[0]
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.allJobs = async (req, res) => {
    try {
        const [jobs] = await pool.query(
            `SELECT j.*, u.name as posted_by_name, u.email as posted_by_email 
             FROM jobs j
             JOIN users u ON j.posted_by = u.user_id`
        );

        res.status(200).json({
            success: true,
            jobs
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.oneJob = async (req, res) => {
    try {
        const [job] = await pool.query(
            `SELECT j.*, u.name as posted_by_name, u.email as posted_by_email 
             FROM jobs j
             JOIN users u ON j.posted_by = u.user_id
             WHERE j.job_id = ?`,
            [req.params.id]
        );

        if (job.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            job: job[0]
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.saveJob = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const jobId = req.params.id;

        // Check if job is already saved
        const [existingSave] = await pool.query(
            `SELECT * FROM saved_jobs 
             WHERE user_id = ? AND job_id = ?`,
            [userId, jobId]
        );

        if (existingSave.length > 0) {
            // Unsave the job
            await pool.query(
                `DELETE FROM saved_jobs 
                 WHERE user_id = ? AND job_id = ?`,
                [userId, jobId]
            );

            res.status(200).json({
                success: true,
                message: "Job Unsaved"
            });
        } else {
            // Save the job
            await pool.query(
                `INSERT INTO saved_jobs (user_id, job_id)
                 VALUES (?, ?)`,
                [userId, jobId]
            );

            res.status(200).json({
                success: true,
                message: "Job saved"
            });
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getSavedJobs = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const [savedJobs] = await pool.query(
            `SELECT j.* 
             FROM jobs j
             JOIN saved_jobs sj ON j.job_id = sj.job_id
             WHERE sj.user_id = ?`,
            [userId]
        );

        res.status(200).json({
            success: true,
            savedJobs
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};