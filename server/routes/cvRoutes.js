const express = require('express');
const router = express.Router();
const {
  createCV,
  getMyCVs,
  getCVById,
  updateCV,
  deleteCV,
} = require('../controllers/cvController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.route('/').get(authMiddleware, getMyCVs).post(authMiddleware, createCV);
router
  .route('/:id')
  .get(authMiddleware, getCVById)
  .put(authMiddleware, updateCV)
  .delete(authMiddleware, deleteCV);

module.exports = router;
