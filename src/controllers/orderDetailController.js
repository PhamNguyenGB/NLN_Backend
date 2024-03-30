import OrderDetailService from '../services/orderDetailService';

const addOrderDetail = async (req, res) => {
    try {
        let data = await OrderDetailService.addOrderDetailService(req.body, req.user);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: '',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: '',
        });
    }
};

module.exports = {
    addOrderDetail,
};