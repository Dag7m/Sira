const express = require('express');
const router = express.Router();
const { getEducations, getExperiences } = require('../controllers/profileController');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/educations', isAuthenticated, getEducations);
router.get('/experiences', isAuthenticated, getExperiences);

module.exports = router;