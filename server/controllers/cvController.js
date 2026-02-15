const CV = require('../models/CV');
const User = require('../models/User');

// @desc    Create a new CV
// @route   POST /api/cvs
const createCV = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.firebaseUser.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please sync your profile first.' });
    }

    const cv = await CV.create({
      userId: user._id,
      ...req.body,
    });

    res.status(201).json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all CVs for current user
// @route   GET /api/cvs
const getMyCVs = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.firebaseUser.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cvs = await CV.find({ userId: user._id }).sort({ updatedAt: -1 });
    res.json(cvs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single CV by ID
// @route   GET /api/cvs/:id
const getCVById = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.firebaseUser.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cv = await CV.findOne({ _id: req.params.id, userId: user._id });
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    res.json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a CV
// @route   PUT /api/cvs/:id
const updateCV = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.firebaseUser.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cv = await CV.findOne({ _id: req.params.id, userId: user._id });
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    const updatedCV = await CV.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedCV);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a CV
// @route   DELETE /api/cvs/:id
const deleteCV = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.firebaseUser.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cv = await CV.findOne({ _id: req.params.id, userId: user._id });
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    await CV.findByIdAndDelete(req.params.id);
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCV, getMyCVs, getCVById, updateCV, deleteCV };
