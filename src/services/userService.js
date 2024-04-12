require('dotenv').config();
import db from '../models/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const salt = bcrypt.genSaltSync(10);

const funHashPassWord = (password) => {
    let hash = bcrypt.hashSync(password, salt);
    return hash
}

const checkUserName = async (username) => {
    let user = await db.User.findOne({
        where: { username: username },
    })
    if (user) {
        return true;
    }
    return false;
}

const checkYourPhone = async (phone) => {
    let yourPhone = await db.User.findOne({
        where: { phone: phone },
    })
    if (yourPhone) {
        return true;
    }
    return false;
}

const registerUser = async (user) => {
    try {
        let checkName = await checkUserName(user.username);
        if (checkName === true) {
            return {
                Mess: 'Tên tài khoản đã tồn tại',
                ErrC: 1,
                Data: '',
            }
        }
        let checkPhone = await checkYourPhone(user.phone);
        if (checkPhone === true) {
            return {
                Mess: 'Số điện thoại đã được sử dụng',
                ErrC: 1,
                Data: ''
            }
        }
        let hashPass = await funHashPassWord(user.password);
        await db.User.create({
            username: user.username,
            password: hashPass,
            address: user.address,
            phone: user.phone,
        })
        return {
            Mess: 'Tạo tài khoản thành công',
            ErrC: 0
        }

    } catch (error) {
        console.log(error);
        return {
            Mess: 'Lỗi tạo tài khoản người dùng',
            ErrC: -2
        }
    }
};

const checkPassword = (hashPass, password) => {
    return bcrypt.compareSync(password, hashPass);
};


const loginUser = async (username, password) => {
    try {
        let user = await db.User.findOne({
            where: { username: username }
        });
        if (user) {
            let isCorrectPassword = await checkPassword(user.password, password);
            if (isCorrectPassword === true) {
                let payload = {
                    id: user.dataValues.id,
                    username: user.dataValues.username,
                    address: user.dataValues.address,
                    phone: user.dataValues.phone,
                    role: 'user',
                }
                let token = createJWT(payload);
                let refresh_token = refreshToken(payload);
                return {
                    Mess: 'Đăng nhập thành công',
                    ErrC: 0,
                    Data: {
                        access_token: token,
                        username: user.dataValues.username,
                        id: user.dataValues.id,
                        address: user.dataValues.address,
                        phone: user.dataValues.phone,
                    },
                    refreshToken: refresh_token,
                }
            }
        }
        return {
            Mess: 'Tài khoản hoặc mật khẩu không chính xác',
            ErrC: 1,
            Data: '',
        }
    } catch (error) {
        console.log(error);
        return {
            Mess: 'Error from login staff',
            ErrC: -1,
        }
    }
}

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
    } catch (error) {
        console.log(error);
    }
    return token;
}

const refreshToken = (payload) => {
    let key = process.env.JWT_SECRET_REFRESH;
    let refreshToken = null;
    try {
        refreshToken = jwt.sign(payload, key, { expiresIn: process.env.JWT_REFRESH_IN });
    } catch (error) {
        console.log(error);
    }
    return refreshToken;
};

const statisticUsers = async () => {
    try {
        let users = await db.User.findAll({});
        let usersCount = 0;
        users.map((user, index) => {
            usersCount += 1;
        })
        return usersCount;
    } catch (error) {
        console.log(error);
        return;
    }
};

const getAllUsersService = async () => {
    try {
        let users = await db.User.findAll({});
        return users;
    } catch (error) {
        console.log(error);
        return;
    }
};

module.exports = {
    registerUser,
    loginUser,
    createJWT,
    refreshToken,
    statisticUsers,
    getAllUsersService,
}