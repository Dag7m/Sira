const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');


// Create token with id and email
exports.createToken = (id, email) => {
    const token = jwt.sign(
        { id, email },
        process.env.SECRET,
        { expiresIn: '5d' }
    );
    return token;
};

// Middleware to check if user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                isLogin: false,
                message: "Missing Token"
            });
        }

        jwt.verify(token, process.env.SECRET, async (err, user) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    isLogin: false,
                    message: err.message
                });
            }

            // Fetch user from MySQL
const [rows] = await pool.execute('SELECT * FROM users WHERE user_id = ?', [user.id]);


            if (rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            req.user = rows[0]; // attach user to request
            next();
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Middleware to check for authorized roles
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
