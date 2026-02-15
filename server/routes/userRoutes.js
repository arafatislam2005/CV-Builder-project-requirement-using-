const express = require('express');
const router = express.Router();
const { syncUser, getMe, updateUser } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/sync', authMiddleware, syncUser);
router.get('/me', authMiddleware, getMe);
router.put('/me', authMiddleware, updateUser);

module.exports = router;
