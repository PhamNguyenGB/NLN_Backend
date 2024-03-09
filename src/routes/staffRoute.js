import express from 'express';
import StaffController from '../controllers/staffController';

const router = express.Router();

const StaffRoute = (app) => {
    router.post('/register', StaffController.reristerStaff);
    router.post('/login', StaffController.login);
    router.post('/logout', StaffController.logout);
    router.post('/refresh', StaffController.refreshToken);

    return app.use("/api/staff", router);
}

export default StaffRoute;