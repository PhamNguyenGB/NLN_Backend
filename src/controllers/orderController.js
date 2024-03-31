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

module.exports = {
    addCart,
    getAllOrders,
}