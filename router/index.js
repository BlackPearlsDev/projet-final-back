import express from 'express';
import userRoutes from './user.routes.js';
import categoryRoutes from './category.routes.js';
import productRoutes from './product.routes.js';
import purchaseRoutes from './purchase.routes.js';

const router = express.Router();

router.use("/api/v1/user", userRoutes);
router.use("/api/v1/category", categoryRoutes);
router.use("/api/v1/product", productRoutes);
router.use("/api/v1/purchase", purchaseRoutes);

export default router;