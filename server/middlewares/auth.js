const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');
const util = require('util'); // to convert callback to promise

// Promisify jwt.verify so we can use async/await
const verifyToken = util.promisify(jwt.verify);

// Create token
exports.createToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.SECRET, { expiresIn: '5d' });
};

// Middleware: isAuthenticated
exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, isLogin: false, message: "Missing Token" });
    }

    const user = await verifyToken(token, process.env.SECRET);
    
    const pool = req.app.locals.db; // ✅ get pool from app context

    const [rows] = await pool.execute('SELECT * FROM users WHERE user_id = ?', [user.id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    req.user = rows[0];
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ success: false, message: err.message });
  }
};

exports.authorizationRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role ${req.user.role} is not allowed to access this resource`
            });
        }
        next();
    };
};
