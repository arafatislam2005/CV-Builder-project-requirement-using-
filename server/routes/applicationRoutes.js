const express = require('express');
const router = express.Router();
const {
  createApplication,
  getMyApplications,
  updateApplication,
  deleteApplication,
} = require('../controllers/applicationController');
const { authMiddleware } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(authMiddleware, getMyApplications)
  .post(authMiddleware, createApplication);

router
  .route('/:id')
  .put(authMiddleware, updateApplication)
  .delete(authMiddleware, deleteApplication);

module.exports = router;
