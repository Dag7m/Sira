const bcrypt = require('bcrypt');
const { createToken } = require('../middlewares/auth');
const cloudinary = require('cloudinary');
const { initializeDatabase } = require('../config/database');

let pool; // Pool will be initialized once

// Initialize the pool when the module is loaded
(async () => {
  pool = await initializeDatabase();
})();

exports.register = async (req, res) => {
  try {
    if (!pool) {
      throw new Error('Database pool is not initialized');
    }

    const { name, email, password,role } = req.body;

    // Hash the password
    const hashPass = await bcrypt.hash(password, 10);


    // MySQL query to insert user
    const [result] = await pool.query(
      `INSERT INTO users (name, email, password,role) 
       VALUES (?, ?, ?, ?)`,
      [
        name,
        email,
        hashPass,
        role,
      ]
    );

    // Get the inserted user
    const [userRows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [
      result.insertId,
    ]);

    if (userRows.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve created user',
      });
    }

    const user = userRows[0];

    // Create token
    const token = createToken(user.user_id, user.email);

    res.status(201).json({
      success: true,
      message: 'User Created',
      user,
      token,
    });
  } catch (err) {
    console.error('Registration error:', err);

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [userRows] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (userRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });
        }

        const user = userRows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Wrong Password"
            });
        }

        // Parse skills back to array for response
        user.skills = JSON.parse(user.skills || '[]');

        const token = createToken(user.user_id, user.email);

        res.status(200).json({
            success: true,
            message: "User logged In Successfully",
            token,
            user
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.isLogin = async (req, res) => {
    try {
        const [userRows] = await pool.query(
            'SELECT * FROM users WHERE user_id = ?',
            [req.user.id]
        );

        res.status(200).json({
            success: true,
            isLogin: userRows.length > 0
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.me = async (req, res) => {
    try {
        const [userRows] = await pool.query(
            'SELECT * FROM users WHERE user_id = ?',
            [req.user.id]
        );

        if (userRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const user = userRows[0];
        user.skills = JSON.parse(user.skills || '[]');

        res.status(200).json({
            success: true,
            user
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        // Get user from database
        const [userRows] = await pool.query(
            'SELECT * FROM users WHERE user_id = ?',
            [req.user.id]
        );

        if (userRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const user = userRows[0];
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password is wrong"
            });
        }

        if (newPassword === oldPassword) {
            return res.status(400).json({
                success: false,
                message: "New password is same as old Password"
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "New Password and Confirm Password are not matching"
            });
        }

        const hashPass = await bcrypt.hash(newPassword, 10);

        // Update password in database
        await pool.query(
            'UPDATE users SET password = ? WHERE user_id = ?',
            [hashPass, req.user.id]
        );

        res.status(200).json({
            success: true,
            message: "User password changed"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { newName, newEmail, newAvatar, newResume, newSkills } = req.body;

        // Get current user data
        const [userRows] = await pool.query(
            'SELECT * FROM users WHERE user_id = ?',
            [req.user.id]
        );

        if (userRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const user = userRows[0];

        // Delete old files from Cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar_public_id);
        await cloudinary.v2.uploader.destroy(user.resume_public_id);

        // Upload new files to Cloudinary
        const myCloud1 = await cloudinary.v2.uploader.upload(newAvatar, {
            folder: 'avatar',
            crop: "scale",
        });

        const myCloud2 = await cloudinary.v2.uploader.upload(newResume, {
            folder: 'resume',
            crop: "fit",
        });

        // Update user in database
        await pool.query(
            `UPDATE users SET 
                name = ?,
                email = ?,
                skills = ?,
                avatar_public_id = ?,
                avatar_url = ?,
                resume_public_id = ?,
                resume_url = ?
             WHERE user_id = ?`,
            [
                newName,
                newEmail,
                JSON.stringify(newSkills),
                myCloud1.public_id,
                myCloud1.secure_url,
                myCloud2.public_id,
                myCloud2.secure_url,
                req.user.id
            ]
        );

        res.status(200).json({
            success: true,
            message: "Profile Updated"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        // Get user from database
        const [userRows] = await pool.query(
            'SELECT * FROM users WHERE user_id = ?',
            [req.user.id]
        );

        if (userRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const user = userRows[0];
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Password does not match!"
            });
        }

        // Delete files from Cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar_public_id);
        await cloudinary.v2.uploader.destroy(user.resume_public_id);

        // Delete user from database
        await pool.query(
            'DELETE FROM users WHERE user_id = ?',
            [req.user.id]
        );

        res.status(200).json({
            success: true,
            message: "Account Deleted"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};