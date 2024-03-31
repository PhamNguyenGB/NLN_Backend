import express from 'express';
import OrderDetailController from '../controllers/orderDetailController';

const router = express.Router();

const orderDetailRoute = (app) => {
    router.post('/addOrderDetail', OrderDetailController.addOrderDetail);
    router.get('/getOrderDetail/:id', OrderDetailController.getOrderDetail);

    return app.use('/api/Details', router);
};

export default orderDetailRoute;