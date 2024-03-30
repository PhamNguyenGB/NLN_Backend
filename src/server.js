require("dotenv").config();
import express from 'express';
import configViewEngine from './config/viewEnginre';
import configCors from './config/configCors';
import cookieParser from "cookie-parser";
import StaffRoute from './routes/staffRoute';
import ProductRoute from './routes/productRoute';
import UserRoute from './routes/userRoute';
import OrderRoute from './routes/orderRoute';
import OrderDetailRoute from './routes/orderDetailRoute';

const app = express();

configViewEngine(app);

const PORT = process.env.PORT || 3000;

configCors(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('src/assets'));
app.use(cookieParser());

UserRoute(app);
StaffRoute(app);
ProductRoute(app);
OrderRoute(app);
OrderDetailRoute(app);

app.use((req, res) => {
    return res.send("404 not found");
})

app.listen(PORT, () => {
    console.log("Backend is running on port " + PORT);
});