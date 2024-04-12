import db, { sequelize } from '../models/index';
import { Op, fn, col, or } from 'sequelize';

const addOrderService = async (data) => {
    try {
        await db.Order.create({
            userId: data.userId,
            address: data.address,
            phone: data.phone,
            totalCost: data.totalAmout,
            pay: data.shipping,
            status: 'Chưa xác nhận',
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

const updateStatusOrderServie = async (idOrder, status) => {
    try {
        let order = await db.Order.findOne({
            where: { id: idOrder },
        });
        if (order) {
            await order.update({
                status: status,
            });
        }
        return {
            Mess: 'Update order status successfully',
            ErrC: 0,
            Data: '',
        }
    } catch (error) {
        console.log(error);
        return {
            Mess: 'Update order status failed',
            ErrC: 1,
            Data: '',
        }
    }
}

const findOrderById = async (idUser) => {
    try {
        let order = await db.Order.findAll({
            where: { userId: idUser, }
        });
        return {
            Mess: 'find order by id successfully',
            ErrC: 0,
            Data: order,
        }
    } catch (error) {
        console.log(error);
        return {
            Mess: 'find order by id failed',
            ErrC: 1,
            Data: '',
        }
    }
}

const statisticMoneyMonth = async (month) => {
    try {
        const currentYear = new Date().getFullYear();
        let data = await db.Order.findAll({
            where: {
                status: {
                    [Op.notIn]: [
                        'Đã hủy đơn',
                        'Chưa xác nhận'
                    ]
                },
                createdAt: {
                    [Op.and]: [
                        sequelize.literal(`MONTH(createdAt) = ${month}`),
                        sequelize.literal(`YEAR(createdAt) = ${currentYear}`)
                    ]
                }
            }
        });
        return {
            Mess: 'statistics money month',
            ErrC: 0,
            Data: data,
        }
    } catch (error) {
        console.log(error);
        return {
            Mess: 'statistic money month failed',
            ErrC: 1,
            Data: '',
        }
    }
};

const statisticMoneyYear = async (year) => {
    try {
        let data = await db.Order.findAll({
            where: {
                status: {
                    [Op.notIn]: [
                        'Đã hủy đơn',
                        'Chưa xác nhận'
                    ]
                },
                createdAt: {
                    [Op.and]: [
                        sequelize.literal(`YEAR(createdAt) = ${year}`)
                    ]
                }
            }
        });
        return {
            Mess: 'statistics money year',
            ErrC: 0,
            Data: data,
        }
    } catch (error) {
        console.log(error);
        return {
            Mess: 'statistic money year failed',
            ErrC: 1,
            Data: '',
        }
    }
};

const getDataStatisticMoneyMonth = async (month) => {
    try {
        const currentYear = new Date().getFullYear();
        let data = await db.Order.findAll({
            where: {
                status: {
                    [Op.in]: [
                        'Đã xác nhận'
                    ]
                },
                createdAt: {
                    [Op.and]: [
                        sequelize.literal(`MONTH(\`Order\`.\`createdAt\`) = ${month}`),
                        sequelize.literal(`YEAR(\`Order\`.\`createdAt\`) = ${currentYear}`)
                    ]
                }
            },
            include: { model: db.User, attributes: ['username'] }
        })
        return data;
    } catch (error) {
        console.log(error);
        return 'error get data statistic money month';
    }
};

const getDataStatisticMoneyYear = async (year) => {
    try {
        let data = await db.Order.findAll({
            where: {
                status: {
                    [Op.in]: [
                        'Đã xác nhận'
                    ]
                },
                createdAt: {
                    [Op.and]: [
                        sequelize.literal(`YEAR(\`Order\`.\`createdAt\`) = ${year}`)
                    ]
                }
            },
            include: { model: db.User, attributes: ['username'] }
        })
        return data;
    } catch (error) {
        console.log(error);
        return 'error get data statistic money year';
    }
};


module.exports = {
    addOrderService,
    getAllOrdersService,
    updateStatusOrderServie,
    statisticMoneyMonth,
    findOrderById,
    statisticMoneyYear,
    getDataStatisticMoneyMonth,
    getDataStatisticMoneyYear,
}