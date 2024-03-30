import express from 'express';
import OrderController from '../controllers/orderController';

const router = express.Router();

const orderRoute = (app) => {
    router.post('/addOrder', OrderController.addCart);

    return app.use('/api/order', router);
};

export default orderRoute;