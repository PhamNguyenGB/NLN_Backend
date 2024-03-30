import OrderService from '../services/orderService';

const addCart = async (req, res) => {
    try {
        console.log("check req", req.body);
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

module.exports = {
    addCart,
}