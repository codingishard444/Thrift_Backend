const Product = require('../models/productModel');
const logger = require('../logger/authLogger');
const Size = require('../models/sizeModel');

const productResolvers ={
    Query:{
    getAllProducts: async () => {
        try {
            const products = await Product.find();
            return products;
        } catch (error) {
            logger.error('Failed to fetch products');
            throw new Error('Failed to fetch products');
        }
        },
    getProductbyId: async (_, { id }) => {
        try {
            const product = await Product.findById(id);
            return product;
        } catch(error) {
            logger.error(`Product not found: ${id}`);
            throw new Error('Product not found');
        }
        },
    getProductbySize: async (_, { product_id,size_type }) => {
        try {
            const size = await Size.findOne({product_id,size_type});
            return size;
        } catch (error){
            logger.error(`Size not found: ${size_type}`);
            throw new Error('Size not found');
        }
    },
    getProductbyCategory: async (_,{ category_type }) => {
        try {
            const products = await Product.find({ category_type });
            return products;
        } catch (error){
            logger.error(`Product not found: ${category_type}`);
            throw new Error('Product not found');
        }
    },
    getProductbyBrand: async(_,{ brand }) => {
        try {
            const products = await Product.find({ brand });
            return products;
        } catch (error){
            logger.error(`Product not found: ${brand}`);
            throw new Error('Product not found');
        }
    },
    getTrendingProducts: async() =>{
        try {
            const products = await Product.find({sold_amount:{$gt:20}})
            return products
        } catch(error){
            logger.error(`Products not found`)
            throw new Error('Products not found')
        }
    },
    getLimitedStockProducts: async() =>{
        try {
            const products = await Product.find({Total_stock:{$lt:6}})
            return products
        } catch(error){
            logger.error('Products not found')
            throw new Error('Products not found')
        }
    }
    },
    Mutation:{
    createProduct: async (_, { product_name,gender, price,discount_rate,category_type,imagePath,brand,description },context) => {
            if (!context.admin) {
                throw new Error('Unauthorized');
            }
            try {
                const product = new Product({ product_name,gender, price,discount_rate,category_type,imagePath,brand,description });
                await product.save();
                logger.info(`New Product released: ${product_name}`);
                return product;
            } catch (error) {
                logger.error(`Product insertion failed: ${product_name}`);
                throw new Error('Product insertion failed');
            }
        },
    updateProduct: async (_, { product_id, product_name, discount_rate },context) => {
            if (!context.admin) {
                throw new Error('Unauthorized');
            }
            try {
                const product = await Product.findById(product_id);
                if (!product) {
                    logger.error(`Product not found: ${id}`);
                    throw new Error('Product not found');
                }
                product.product_name = product_name
                product.discount_rate = discount_rate
                await product.save();
                logger.info(`Product updated: ${product_name}`);
                return product;
            } catch (error) {
                logger.error(`Product update failed: ${id}`);
                throw new Error('Product update failed');
            }
        },
    deleteProduct:async(_,{ product_id },context) =>{
            if(!context.admin){
                throw new Error('Unauthorized');
            }
            try {
                const Deletedproduct = await Product.findByIdAndDelete(product_id);
                if (!Deletedproduct){
                    logger.error(`Product not found: ${product_id}`);
                    throw new Error('Product not found');
                }
                return 'Product Deleted Successfully'
            } catch (error){
                logger.error(`Product not found: ${product_id}`);
                throw new Error('Product not found');
            }
        },
    updateProductSizeStock: async (_, { product_id, size_type, stock_amount },context) => {
            if (!context.admin) {
                throw new Error('Unauthorized');
            }
            try {
                const updatedSizestock = await Size.findOne({ product_id, size_type });
                updatedSizestock.stock_amount += stock_amount;
                await updatedSizestock.save();
                const updatedProducttotalStock = await Product.findById(product_id);
                updatedProducttotalStock.Total_stock += stock_amount;
                await updatedProducttotalStock.save();
                return updatedSizestock;
            } catch (error) {
                logger.error(`Product not found: ${product_id}`);
                throw new Error('Product not found');
            }
        },
    AddProductSize: async (_, { product_id, size_type, stock_amount },context) => {
            if (!context.admin) {
                throw new Error('Unauthorized');
            }
            try {
                const existingSize = await Size.findOne({ product_id, size_type });
                if (existingSize) {
                throw new Error('Size already exists');
                }
                const size = new Size({ product_id, size_type, stock_amount });
                await size.save();
                const updatedProducttotalStock = await Product.findById(product_id);
                updatedProducttotalStock.Total_stock += stock_amount;
                await updatedProducttotalStock.save();
                logger.info(`New Size added: ${size_type}`);
                return size;
            } catch (error) {
                logger.error(`Size insertion failed: ${size_type}`);
                throw new Error('Size insertion failed');
            }
        },
    }
}
module.exports = { productResolvers };