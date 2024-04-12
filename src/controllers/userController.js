require("dotenv").config();
import UserService from '../services/userService';
import jwt from 'jsonwebtoken';

let refreshTokensArr = [];

const rerister = async (req, res) => {
    try {
        if (!req.body.username && !req.body.password && !req.body.address && !req.body.phone) {
            return res.status(200).json({
                Mess: 'Bạn chưa điền đủ thông tin!',
                Data: '',
            });
        }
        if (req.body.password && req.body.password.length < 5) {
            return res.status(200).json({
                Mess: 'Mật khẩu phải dài hơn 5 ký tự',
                Data: '',
            });
        }
        if (req.body.phone && req.body.phone.length < 10) {
            return res.status(200).json({
                Mess: 'Số điện thoại không hợp lệ!!!',
                Data: '',
            });
        }

        let data = await UserService.registerUser(req.body);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'error from server registerUser',
            ErrC: -1,
            Data: '',
        })
    }
};

const loginUser = async (req, res) => {
    try {
        let data = await UserService.loginUser(req.body.username, req.body.password);
        refreshTokensArr.push(data.refreshToken);
        res.cookie("refresh_token", data.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        })
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: data.Data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'error from server login staff',
            ErrC: -1,
            Data: '',
        })
    }
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return res.status(401).json({
                Mess: 'Bạn chưa đăng nhập',
                ErrC: 1,
            });
        }
        if (!refreshTokensArr.includes(refreshToken)) {
            return res.status(403).json({
                Mess: 'Lỗi đăng nhập',
            })
        }
        jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokensArr = refreshTokensArr.filter(
                (token) => token !== refreshToken
            );
            // create new access token
            let payload = {
                id: user.id,
                username: user.username,
                address: user.address,
                phone: user.phone,
                role: user.role,
            }
            const newAccessToken = UserService.createJWT(payload);
            const newFrefreshToken = UserService.refreshToken(payload);
            refreshTokensArr.push(newFrefreshToken);
            res.cookie("refresh_token", newFrefreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
            });
            return res.status(200).json({
                access_token: newAccessToken,
            });
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({
            Mess: 'Error from refresh',
            ErrC: -1,
        })
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("refresh_token");
        refreshTokensArr = refreshTokensArr.filter(
            (token) => token !== req.cookies.refreshToken
        );
        return res.status(200).json({
            Mess: 'Đăng xuất thành công',
            ErrC: 0,
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({
            Mess: 'Error from logout user',
            ErrC: -1,
        })
    }
};

const statisticUsers = async (req, res) => {
    try {
        const totalUsers = await UserService.statisticUsers();
        return res.status(200).json({ totalUsers });
    } catch (error) {
        console.log(error);
        return res.status(500).json('error from statisticUsers');
    }
};

const getAllUsers = async (req, res) => {
    try {
        const data = await UserService.getAllUsersService();
        return res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        return res.status(500).json('error from getAllUsers');
    }
};

module.exports = {
    rerister,
    loginUser,
    refreshToken,
    logout,
    statisticUsers,
    getAllUsers,
}