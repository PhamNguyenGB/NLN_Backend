import express from 'express';
import OrderController from '../controllers/orderController';
import { verifyToken, checkVerifyTokenAdmin } from '../middleware/AuthStaff';

const router = express.Router();

const orderRoute = (app) => {
    router.get('/', checkVerifyTokenAdmin, OrderController.getAllOrders);
    router.post('/addOrder', OrderController.addCart);

    return app.use('/api/order', router);
};

export default orderRoute;