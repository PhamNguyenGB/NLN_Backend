import ProductService from '../services/productService';

const findAllProducts = async (req, res) => {
    try {
        let products = await ProductService.getAllProducts();
        return res.status(200).json({
            Mess: products.Mess,
            ErrC: products.ErrC,
            Data: products.Data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'Error from findAllProduct',
            ErrC: -1,
        });
    }
};

module.exports = {
    findAllProducts,
}