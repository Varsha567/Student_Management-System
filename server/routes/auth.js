// server/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// ✅ Corrected routes
router.post('/register', authController.register);
router.post('/login', authController.login);  // NOT '/auth/login' or '/'
router.get('/logout', authController.logout);

module.exports = router;