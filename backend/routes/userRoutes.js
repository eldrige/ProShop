import express from 'express';

const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';

router.post('/login', authUser);
router.route('/').post(registerUser).get(protect, protectAdmin, getUsers);
// router.route('/profile').get(getUserProfile)
router
  .route('/profile')
  // the protect is the middleware that protects the respective route
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
