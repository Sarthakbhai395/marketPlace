import express from 'express';
import { getProducts, createProduct } from '../controllers/productController.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

// Import upload middleware
import upload from '../middleware/upload.js';

router.get('/', getProducts);
router.post('/', verifyToken, upload.single('image'), createProduct);

export default router;
