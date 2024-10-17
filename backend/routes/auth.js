const express = require('express');
const { googleAuthController, refreshToken, logout} = require('../controllers/authController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

// Google login route
router.post('/google-login',googleAuthController );
// Route to refresh access token using refresh token
router.post('/refresh-token', refreshToken);
// Logout route to clear refresh token cookie
router.post('/logout', logout);
// Protected route example
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
