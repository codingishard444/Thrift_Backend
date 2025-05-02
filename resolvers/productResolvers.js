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
    },
    Mutation:{
    createProduct: async (_, { product_name,gender, price,discount_rate,category_type }) => {
            try {
                const product = new Product({ product_name,gender, price,discount_rate,category_type });
                await product.save();
                logger.info(`New Product released: ${product_name}`);
                return product;
            } catch (error) {
                logger.error(`Product insertion failed: ${product_name}`);
                throw new Error('Product insertion failed');
            }
        },
    updateProduct: async (_, { product_id, product_name, discount_rate }) => {
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
    updateProductSizeStock: async (_, { product_id, size_type, stock_amount }) => {
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
    AddProductSize: async (_, { product_id, size_type, stock_amount }) => {
            try {
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