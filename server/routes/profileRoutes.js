const express = require('express');
const router = express.Router();
const {   getMyProfile,
  updateProfile,
  createProfile,addExperience,addEducation,deleteEducation,deleteWorkExperience,getEducations, getExperiences } = require('../controllers/profileController');
const { isAuthenticated } = require('../middlewares/auth');
router.post('/work-experience', isAuthenticated, addExperience);
router.post('/education', isAuthenticated, addEducation);
router.get('/educations', isAuthenticated, getEducations);
router.get('/experiences', isAuthenticated, getExperiences);
router.delete('/work-experience/:id',isAuthenticated,deleteWorkExperience);
router.delete('/education/:id',isAuthenticated, deleteEducation);
router.get('/me', isAuthenticated, getMyProfile);
router.patch('/update', isAuthenticated, updateProfile);
router.post('/create', isAuthenticated, createProfile);
module.exports = router;