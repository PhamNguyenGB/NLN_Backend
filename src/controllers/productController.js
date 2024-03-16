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

const createProduct = async (req, res) => {
    try {
        let data = await ProductService.addProduct(req.body, req.file);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: data.Data,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server create product',
            EC: -1,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        let idProduct = req.body.id;
        await ProductService.deleteFile(idProduct);
        let data = await ProductService.deleteProductService(idProduct);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: '',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server delete product',
            EC: -1,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        let data = await ProductService.updateProductService(req.body.id, req.body, req.file);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: data.Data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'error update product',
            ErrC: -1,
        });
    }
};

module.exports = {
    findAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
}