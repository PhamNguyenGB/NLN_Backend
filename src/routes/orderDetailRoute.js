import express from 'express';
import OrderDetailController from '../controllers/orderDetailController';

const router = express.Router();

const orderDetailRoute = (app) => {
    router.post('/addOrderDetail', OrderDetailController.addOrderDetail);

    return app.use('/api/orderDetails', router);
};

export default orderDetailRoute;