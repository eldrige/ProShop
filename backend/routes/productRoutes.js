import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from '../controllers/productController.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);

//  ? this is equivalent to router.get('/', getProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
