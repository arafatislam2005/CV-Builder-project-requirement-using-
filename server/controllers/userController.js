const User = require('../models/User');

// @desc    Create or update user profile after Firebase auth
// @route   POST /api/users/sync
const syncUser = async (req, res) => {
  try {
    const { uid, email, name, picture } = req.firebaseUser;

    let user = await User.findOne({ firebaseUID: uid });

    if (user) {
      user.name = name || req.body.name || user.name;
      user.email = email || user.email;
      user.photoURL = picture || req.body.photoURL || user.photoURL;
      await user.save();
    } else {
      user = await User.create({
        firebaseUID: uid,
        email: email,
        name: name || req.body.name || 'User',
        photoURL: picture || req.body.photoURL || '',
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/users/me
const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.firebaseUser.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/me
const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.firebaseUser.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, photoURL } = req.body;
    if (name) user.name = name;
    if (photoURL) user.photoURL = photoURL;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { syncUser, getMe, updateUser };
