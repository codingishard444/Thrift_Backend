const Order = require('../models/orderModel')
const logger = require('../logger/authLogger')
const Product = require('../models/productModel')
const Size = require('../models/sizeModel')
const orderResolvers ={
    Query:{
        getAllorders: async () => {
            return await Order.find({})
        },
        getOrderbyId: async(_, { id }) => {
            return await Order.findById(id)
        },
        logs: () => {
            const fs = require('fs');
            const path = require('path');
            try {
                const logFile = path.join(__dirname, '../logger/auth-logs.log');
                const logData = fs.readFileSync(logFile, 'utf8');
                const logLines = logData.split('\n').filter(line => line.trim() !== '');
                const last10Logs = logLines.slice(-10).reverse();
                return last10Logs;
            } catch (err) {
                console.error('Error reading log file:', err);
                throw new Error('Failed to read log file');
            }
        },
    },
    Mutation: {
        createOrder: async (_, args, context) => {
          if (!context.user) {
            throw new Error('Unauthorized');
          } else {
          const { product_id, quantity,size_type } = args;
          try {
            const purchasedProduct = await Product.findById(product_id);
            const total_price = purchasedProduct.price*(1 - (purchasedProduct.discount_rate / 100)) * quantity;
            purchasedProduct.sold_amount += quantity;
            await purchasedProduct.save();
            const size = await Size.findOne({ product_id, size_type });
            size.stock_amount -= quantity;
            await size.save();
            const customer_id = context.user.userId;
            logger.info(`Creating order for user: ${customer_id}`);
      
            const order = new Order({ customer_id, product_id,total_price, quantity,size_type });
            await order.save();
      
            logger.info(`New Order placed: ${customer_id}, ${product_id}`);
            return order;
          } catch (error) {
            console.error(error);
            logger.error(`Order placement failed: ${error.message}`);
            throw new Error('Order placement failed');
          }
        }
        }
      }      

}
module.exports = { orderResolvers };