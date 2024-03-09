import express from 'express';
import ProductController from '../controllers/productController';
import { verifyToken, checkVerifyTokenAdmin } from '../middleware/AuthStaff';

const router = express.Router();

const productRoute = (app) => {
    router.get('/', checkVerifyTokenAdmin, ProductController.findAllProducts);

    return app.use('/api/products', router);
}

export default productRoute;