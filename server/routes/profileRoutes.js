const express = require('express');
const router = express.Router();
const { addExperience,addEducation,deleteEducation,deleteWorkExperience,getEducations, getExperiences } = require('../controllers/profileController');
const { isAuthenticated } = require('../middlewares/auth');
router.post('/work-experience', isAuthenticated, addExperience);
router.post('/education', isAuthenticated, addEducation);
router.get('/educations', isAuthenticated, getEducations);
router.get('/experiences', isAuthenticated, getExperiences);
router.delete('/work-experience/:id',isAuthenticated,deleteWorkExperience);
router.delete('/education/:id',isAuthenticated, deleteEducation);

module.exports = router;