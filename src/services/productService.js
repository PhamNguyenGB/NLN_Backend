import db from '../models/index';
import path from 'path';
import fs from 'fs';

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

module.exports = {
    getAllProducts,
    addProduct,
    deleteProductService,
    deleteFile,
    updateProductService,
}