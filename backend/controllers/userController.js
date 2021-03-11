import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

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
      token: generateToken(user._id),
    });
  } else {
    // 401 means unauthorized
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc GET user profile
// @route POST /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Register a new user
// @route POST /api/users/
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  // res.send("Success")
  const { email, name, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    // 400 means bad request
    res.status(400);
    throw new Error('User already exist');
  }
  // create is syntactic sugar, it basiclly acts like a save
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // 201 means a new resource was created
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // we send back the token as well, so as to authenticate after immediately
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
