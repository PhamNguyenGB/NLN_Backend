import db from '../models/index';
import path from 'path';
import fs from 'fs';
import { Op } from 'sequelize';

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

const addProduct = async (data, file) => {
    try {
        await db.Product.create({
            name: data.name,
            destruction: data.destruction,
            type: data.type,
            price: data.price,
            image: 'http://localhost:8080/image/' + file.filename,

        })
        return {
            Mess: 'add product successful',
            ErrC: 0,
            Data: [],
        };
    } catch (error) {
        console.log(error);
        return {
            Mess: 'error getting add product',
            ErrC: 1,
            Data: '',
        };
    }
};

const deleteProductService = async (idProduct) => {
    try {
        let product = await db.Product.findOne({
            where: { id: idProduct },
        });
        if (product) {
            await product.destroy();
            return {
                Mess: 'delete product successfully',
                ErrC: 0,
                Data: '',
            }
        } else {
            return {
                Mess: 'product not found',
                ErrC: 0,
                Data: '',
            }
        }
    } catch (error) {
        console.log(error);
        return {
            Mess: 'error deleting product',
            ErrC: -1,
            Data: '',
        }
    }
};

const deleteFile = async (idProduct) => {
    try {
        let product = await db.Product.findOne({
            where: { id: idProduct },
        });
        if (product) {
            const pathName = path.join(__dirname, '../assets/image/');
            const fileName = product.image.split('/')[4];
            await fs.unlink(pathName + fileName, (err) => console.log(err));
            return {
                Mess: 'Delete file successfully',
                ErrC: 0,
            }
        } else {
            return {
                Mess: 'product not found',
                ErrC: 1,
            };
        };
    } catch (error) {
        console.log(error);
        return {
            Mess: 'error delete file',
            ErrC: -1,
        };
    }
}
const updateProductService = async (idProduct, dataProduct, newFile) => {
    try {
        let product = await db.Product.findOne({
            where: { id: idProduct },
        });
        if (product) {
            if (newFile) {

                await deleteFile(idProduct);

                await product.update({
                    name: dataProduct.name,
                    destruction: dataProduct.destruction,
                    type: dataProduct.type,
                    price: dataProduct.price,
                    image: 'http://localhost:8080/image/' + newFile.filename,
                });
            } else {
                await product.update({
                    name: dataProduct.name,
                    destruction: dataProduct.destruction,
                    type: dataProduct.type,
                    price: dataProduct.price,
                });
            }
            return {
                Mess: 'update user successfully',
                ErrC: 0,
                Data: '',
            };
        }
        return {
            Mess: 'product not found',
            ErrC: 0,
            Data: '',
        };
    } catch (error) {
        console.log(error);
        return {
            Mess: 'error update product',
            ErrC: -1,
            Data: '',
        };
    }
};

const getNewProducts = async () => {
    try {
        const products = await db.Product.findAll({
            order: [['id', 'DESC']],
            limit: 3
        });
        return {
            Mess: 'Get new products successfully',
            ErrC: 0,
            Data: products
        }
    } catch (error) {
        console.log(error);
        return {
            Mess: 'error get new product',
            ErrC: -1,
            Data: '',
        };
    }
};

const getTypeProductService = async (type) => {
    try {
        const products = await db.Product.findAll({
            where: { type: type },
        });
        if (products) {
            return {
                Mess: 'Get type product successfully',
                ErrC: 0,
                Data: products,
            }
        } else {
            return {
                Mess: 'Product not found',
                ErrC: 1,
                Data: '',
            }
        }
    } catch (error) {
        console.log(error);
        return {
            Mess: 'error get type product',
            ErrC: -1,
            Data: '',
        }
    }
};

const getProductByIDService = async (idProduct) => {
    try {
        const product = await db.Product.findOne({
            where: { id: idProduct },
        })
        return {
            Mess: 'Get product successfully',
            ErrC: 0,
            Data: product,
        }
    } catch (error) {
        console.log(error);
        return {
            Mess: 'Product not found',
            ErrC: -1,
            Data: '',
        }
    }
};

const getSimilarProductService = async (type, idOldProduct) => {
    try {
        const data = await db.Product.findAll({
            where: {
                id: {
                    [Op.ne]: idOldProduct
                },
                type: type,
            },
            limit: 4,
        })
        return {
            Mess: 'find similar product successfully',
            ErrC: 0,
            Data: data,
        }
    } catch (error) {
        console.log(error);
        return {
            Mess: 'Similar product not found',
            ErrC: 1,
            Data: '',
        }
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    deleteProductService,
    deleteFile,
    updateProductService,
    getNewProducts,
    getTypeProductService,
    getProductByIDService,
    getSimilarProductService
}