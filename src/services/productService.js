import db from '../models/index';

const getAllProducts = async () => {
    try {
        const products = await db.Product.findAll();
        if (products) {
            return {
                Mess: 'Find all products successfully',
                ErrC: 0,
                Data: products,
            }
        }
        return {
            Mess: 'products not found',
            ErrC: 0,
            Data: [],
        }
    } catch (error) {
        console.log(error);
        return {
            Mess: 'error getting users',
            ErrC: 1,
            Data: [],
        };
    }
};

module.exports = {
    getAllProducts,
}