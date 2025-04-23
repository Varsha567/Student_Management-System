const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// @route   POST /api/auth/register
router.post('/register', authController.register);

// @route   POST /api/auth/login
router.post('/login', authController.login);  // Changed from '/auth/login'

// @route   GET /api/auth/logout
router.get('/logout', authController.logout);

module.exports = router;