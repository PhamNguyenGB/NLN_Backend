import db from '../models/index';
import bcrypt from 'bcryptjs';

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

module.exports = {
    reristerStaff,

};