const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

console.log('Available methods:', Object.keys(authController));
// Should show: ['register', 'login', 'logout']

// @route   POST /api/auth/register
// @desc    Register new user
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', authController.login);

// @route   GET /api/auth/logout
// @desc    Logout user
router.get('/logout', authController.logout);

module.exports = router;