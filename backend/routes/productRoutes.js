import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
import {
  getProductById,
  getProducts,
  deleteProduct,
} from '../controllers/productController.js';

router.route('/').get(getProducts);
//  ? this is equivalent to router.get('/', getProducts)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

export default router;
