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
        let idProduct = req.params.idProduct;
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

const fetchNewProducts = async (req, res) => {
    try {
        let data = await ProductService.getAllProducts();
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: data.Data,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'error fetch new products',
            ErrC: -1,
        });
    }
};

const getTypeProducts = async (req, res) => {
    try {
        let type = req.params.type;
        type = type.replace(/-/g, ' ');
        let data = await ProductService.getTypeProductService(type);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: data.Data,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'error get type products',
            ErrC: -1,
            Data: '',
        });
    }
};

const getByProductID = async (req, res) => {
    try {
        let idProduct = req.params.id;
        let data = await ProductService.getProductByIDService(idProduct);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: data.Data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'error get products',
            ErrC: -1,
            Data: '',
        });
    }
};

const getSimilarProduct = async (req, res) => {
    try {
        let type = req.params.type;
        type = type.replace(/-/g, ' ');
        let idProduct = req.params.id;
        let data = await ProductService.getSimilarProductService(type, idProduct);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: data.Data,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'error getSimilar products',
            ErrC: -1,
            Data: '',
        });
    }
};

const filterProductsPrice = async (req, res) => {
    try {
        let type = req.params.type;
        type = type.replace(/-/g, ' ');
        let price = req.params.price;
        let data = await ProductService.filterProductsPriceService(type, price);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: data.Data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'error filter products',
            ErrC: -1,
            Data: '',
        });
    }
}

const searchProduct = async (req, res) => {
    try {
        const data = await ProductService.handleSearchProduct(req.params.name);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: data.Data,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'error searching products',
            ErrC: -1,
            Data: '',
        });
    }
}

module.exports = {
    findAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    fetchNewProducts,
    getTypeProducts,
    getByProductID,
    getSimilarProduct,
    filterProductsPrice,
    searchProduct,
}