const express = require('express');
const { getUserById, getUserByEmail } = require('../controllers/userController');

const router = express.Router();

// Route to get user by ID
router.get('/user/:id', getUserById);

// Optional: Route to get user by email
router.get('/user/email/:email', getUserByEmail);

module.exports = router;
