import db from '../models/index';

const addOrderService = async (data) => {
    try {
        await db.Order.create({
            userId: data.userId,
            address: data.address,
            phone: data.phone,
            totalCost: data.totalAmout,
            pay: data.shipping,
            status: 'Unconfirmed',
        })
        return {
            Mess: 'Đặt hàng thành công',
            ErrC: 0,
            Data: '',
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error add cart',
            EC: 1,
            DT: '',
        };
    }
}

const getAllOrdersService = async () => {
    try {
        let data = await db.Order.findAll({
            include: { model: db.User, attributes: ['username'] }
        });
        return {
            Mess: 'Get all orders successfully',
            ErrC: 0,
            Data: data,
        }
    } catch (error) {
        return {
            Mess: 'Get all orders failed',
            ErrC: 1,
            Data: '',
        }
    }
}

module.exports = {
    addOrderService,
    getAllOrdersService,
}