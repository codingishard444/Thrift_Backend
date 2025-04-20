const Product = require('../models/productModel');
const logger = require('../logger/authLogger');

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
        }
    }

}
module.exports = { productResolvers };