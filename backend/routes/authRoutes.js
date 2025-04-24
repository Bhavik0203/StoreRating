// routes/authRoutes.js
const express = require('express');
const { register, login, getCurrentUser, updatePassword } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.put('/update-password', protect, updatePassword);

module.exports = router;