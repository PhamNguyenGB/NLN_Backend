import OrderService from '../services/orderService';

const addCart = async (req, res) => {
    try {
        let data = await OrderService.addOrderService(req.body);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: data.Data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'Error adding order',
            ErrC: -1,
            Data: '',
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        let data = await OrderService.getAllOrdersService();
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: data.Data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'Error getting all orders',
            ErrC: -1,
            Data: '',
        });
    }
};

const updateStautsOrder = async (req, res) => {
    try {
        let data = await OrderService.updateStatusOrderServie(req.body.orderId, req.body.status);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: data.Data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'Error updating statuts order',
            ErrC: -1,
            Data: '',
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        let data = await OrderService.findOrderById(req.user.id);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: data.Data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'Error get order by id',
            ErrC: -1,
            Data: '',
        });
    }
};

const statisticMoneyMonth = async (req, res) => {
    try {
        let data = await OrderService.statisticMoneyMonth(req.body.month);
        let totalCost = 0;
        data.Data.map((item) => {
            totalCost += item.totalCost;
        });
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: totalCost,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'Error statistic money month',
            ErrC: -1,
            Data: '',
        });
    }
};

const statisticMoneyYear = async (req, res) => {
    try {
        let data = await OrderService.statisticMoneyYear(req.body.year);
        let totalCost = 0;
        data.Data.map((item) => {
            totalCost += item.totalCost;
        });
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: totalCost,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'Error statistic money year',
            ErrC: -1,
            Data: '',
        });
    }
};

const getDataStatisticMoneyMonth = async (req, res) => {
    try {
        let data = await OrderService.getDataStatisticMoneyMonth(req.body.month);
        return res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        return res.status(500).json('error get data statistic money month');
    }
};

const getDataStatisticMoneyYear = async (req, res) => {
    try {
        let data = await OrderService.getDataStatisticMoneyYear(req.body.year);
        return res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        return res.status(500).json('error get data statistic money year');
    }
};

module.exports = {
    addCart,
    getAllOrders,
    updateStautsOrder,
    statisticMoneyMonth,
    getOrderById,
    statisticMoneyYear,
    getDataStatisticMoneyMonth,
    getDataStatisticMoneyYear,
}