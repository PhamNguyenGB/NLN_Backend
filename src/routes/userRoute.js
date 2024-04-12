import express from 'express';
import UserController from '../controllers/userController';
import { checkVerifyTokenUser, checkVerifyTokenAdmin } from '../middleware/AuthStaff';

const router = express.Router();

const userRoute = (app) => {
    router.post('/register', UserController.rerister);
    router.post('/login', UserController.loginUser);
    router.post('/logout', checkVerifyTokenUser, UserController.logout);
    router.post('/refresh', UserController.refreshToken);
    router.get('/statictis/users', checkVerifyTokenAdmin, UserController.statisticUsers);
    router.get('/statictis/getAllUsers', checkVerifyTokenAdmin, UserController.getAllUsers);

    return app.use('/api/user', router);
};

export default userRoute;