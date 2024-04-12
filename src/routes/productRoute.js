import express from 'express';
import ProductController from '../controllers/productController';
import { verifyToken, checkVerifyTokenAdmin } from '../middleware/AuthStaff';
import upload from '../middleware/upLoadFile';

const router = express.Router();

const productRoute = (app) => {
    router.get('/', ProductController.findAllProducts);
    router.post('/create', checkVerifyTokenAdmin, upload.single('image'), ProductController.createProduct);
    router.delete('/delete/:idProduct', checkVerifyTokenAdmin, ProductController.deleteProduct);
    router.put('/update', checkVerifyTokenAdmin, upload.single('image'), ProductController.updateProduct);
    router.get('/:type', ProductController.getTypeProducts);
    router.get('/oneProduct/:id', ProductController.getByProductID);
    router.get('/similar/:type/:id', ProductController.getSimilarProduct);
    router.get('/filter/:type/:price', ProductController.filterProductsPrice);
    router.get('/search/:name', ProductController.searchProduct);

    return app.use('/api/products', router);
}

export default productRoute;