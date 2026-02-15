const Application = require('../models/Application');
const User = require('../models/User');

// @desc    Create a new job application
// @route   POST /api/applications
const createApplication = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.firebaseUser.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const application = await Application.create({
      userId: user._id,
      ...req.body,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all applications for current user
// @route   GET /api/applications
const getMyApplications = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.firebaseUser.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const applications = await Application.find({ userId: user._id })
      .populate('cvId', 'title')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id
const updateApplication = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.firebaseUser.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const application = await Application.findOne({
      _id: req.params.id,
      userId: user._id,
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const updated = await Application.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
const deleteApplication = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.firebaseUser.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const application = await Application.findOne({
      _id: req.params.id,
      userId: user._id,
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createApplication, getMyApplications, updateApplication, deleteApplication };
