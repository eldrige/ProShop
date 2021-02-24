import express from 'express';

const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/login', authUser);
router.route('/').post(registerUser);
// router.route('/profile').get(getUserProfile)
router.route('/profile').get(protect, getUserProfile);

export default router;
