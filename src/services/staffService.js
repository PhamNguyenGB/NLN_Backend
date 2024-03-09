require("dotenv").config();
import db from '../models/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const salt = bcrypt.genSaltSync(10);

const funHashPassWord = (password) => {
    let hash = bcrypt.hashSync(password, salt);
    return hash
}

const checkStaffName = async (staffName) => {
    let staff = await db.Staff.findOne({
        where: { staffname: staffName },
    })
    if (staff) {
        return true;
    }
    return false;
}

const checkYourPhone = async (phone) => {
    let yourPhone = await db.Staff.findOne({
        where: { phone: phone },
    })
    if (yourPhone) {
        return true;
    }
    return false;
}

const reristerStaff = async (staffData) => {
    try {
        let checkName = await checkStaffName(staffData.staffname);
        console.log(checkName);
        if (checkName === true) {
            return {
                Mess: 'Tên tài khoản đã tồn tại',
                ErrC: 1,
                Data: '',
            }
        }
        let checkPhone = await checkYourPhone(staffData.phone);
        if (checkPhone === true) {
            return {
                Mess: 'Số điện thoại đã được sử dụng',
                ErrC: 1,
                Data: ''
            }
        }
        let hashPass = await funHashPassWord(staffData.password);
        console.log("check hash", hashPass);

        await db.Staff.create({
            staffname: staffData.staffname,
            password: hashPass,
            address: staffData.address,
            phone: staffData.phone,
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

const loginStaff = async (staffname, password) => {
    try {
        let staff = await db.Staff.findOne({
            where: { staffname: staffname }
        });
        if (staff) {
            let isCorrectPassword = await checkPassword(staff.password, password);
            if (isCorrectPassword === true) {
                let payload = {
                    id: staff.dataValues.id,
                    staffname: staff.dataValues.staffname,
                    address: staff.dataValues.address,
                    phone: staff.dataValues.phone,
                    role: 'admin',
                }
                let token = createJWT(payload);
                let refresh_token = refreshToken(payload);
                return {
                    Mess: 'Đăng nhập thành công',
                    ErrC: 0,
                    Data: {
                        access_token: token,
                        staffname: staff.dataValues.staffname,
                        id: staff.dataValues.id,
                        address: staff.dataValues.address,
                        phone: staff.dataValues.phone,
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
};

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

module.exports = {
    reristerStaff,
    loginStaff,
    createJWT,
    refreshToken,
};