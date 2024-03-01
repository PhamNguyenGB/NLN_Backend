import express from 'express';
import StaffController from '../controllers/staffController';

const router = express.Router();

const StaffRoute = (app) => {
    router.get('/testApi', StaffController.testApi);

    return app.use("/api/staff", router);
}

export default StaffRoute;