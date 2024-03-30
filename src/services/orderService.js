import db from '../models/index';

const addOrderService = async (data) => {
    try {
        await db.Order.create({
            userId: data.userId,
            address: data.address,
            phone: data.phone,
            totalCost: data.totalAmout,
            pay: data.shipping,
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

module.exports = {
    addOrderService
}