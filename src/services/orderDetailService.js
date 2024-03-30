import db from '../models/index';

const addOrderDetailService = async (data) => {
    try {
        let yourOrder = await db.Order.findOne({
            where: { userId: data.userId }
        });
        if (yourOrder) {
            let newYourOrder = await db.Order.findOne({
                where: { userId: yourOrder.dataValues.userId },
                order: [['createdAt', 'DESC']],
            });
            if (newYourOrder) {
                data.products.map(async (item) => {
                    await db.Order_Detail.create({
                        orderId: newYourOrder.id,
                        ProductId: item.id,
                        price: item.price,
                        quantity: item.quantity,
                    });
                });
                return {
                    Mess: 'Added order detail successfully',
                    ErrC: 0,
                    Data: '',
                }
            }
        }
        return {
            Mess: 'error add order detail',
            ErrC: 1,
            Data: '',
        };
    } catch (error) {
        console.log(error);
        return {
            Mess: 'error add order detail',
            ErrC: -1,
            Data: '',
        };
    }
};

module.exports = {
    addOrderDetailService,
}