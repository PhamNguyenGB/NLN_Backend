import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

const userRoute = (app) => {
    router.post('/register', UserController.rerister);
    router.post('/login', UserController.loginUser);
    router.post('/logout', UserController.logout);
    router.post('/refresh', UserController.refreshToken);

    return app.use('/api/user', router);
};

export default userRoute;