import express from 'express';

const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/login', authUser);
router.route('/').post(registerUser).get(protect, admin, getUsers);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
router
  .route('/profile')
  // the protect is the middleware that protects the respective route
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
