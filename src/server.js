require("dotenv").config();
import express from 'express';
import configViewEngine from './config/viewEnginre';
import configCors from './config/configCors';
import cookieParser from "cookie-parser";
import StaffRoute from './routes/staffRoute';
import ProductRoute from './routes/productRoute';

const app = express();

configViewEngine(app);

const PORT = process.env.PORT || 3000;

configCors(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('src/assets'));
app.use(cookieParser());

StaffRoute(app);
ProductRoute(app);

app.use((req, res) => {
    return res.send("404 not found");
})

app.listen(PORT, () => {
    console.log("Backend is running on port " + PORT);
});