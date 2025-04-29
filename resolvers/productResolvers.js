const Product = require('../models/productModel');
const logger = require('../logger/authLogger');
const Size = require('../models/sizeModel');

const productResolvers ={
    Query:{
    
    },
    Mutation:{
    createProduct: async (_, { product_name,gender, price,discount_rate,category_type,sold_amount,Total_stock }) => {
            try {
                const product = new Product({ product_name,gender, price,discount_rate,category_type,sold_amount,Total_stock });
                await product.save();
                logger.info(`New Product released: ${product_name}`);
                return product;
            } catch (error) {
                logger.error(`Product insertion failed: ${product_name}`);
                throw new Error('Product insertion failed');
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
    }
}
module.exports = { productResolvers };