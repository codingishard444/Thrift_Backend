const Order = require('../models/orderModel')
const logger = require('../logger/authLogger')

const orderResolvers ={
    Query:{
        orders: async () => {
            return await Order.find({})
        },
        order: async(_, { id }) => {
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
          const { product_id, quantity, total_price } = args;
      
          try {
            const customer_id = context.user.userId;
            logger.info(`Creating order for user: ${customer_id}`);
      
            const order = new Order({ customer_id, product_id, quantity, total_price });
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
module.exports = { orderResolvers };