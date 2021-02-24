import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    // 401 means unauthorized
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export { authUser };
