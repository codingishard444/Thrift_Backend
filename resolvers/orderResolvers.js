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
    Mutation:{
    createOrder: async (_, { customer_id,product_id,quantity,total_price }) => {
            try {
                const order = new Order({ customer_id,product_id,quantity,total_price });
                await order.save();
                logger.info(`New Order placed: ${customer_id}, ${product_id}`);
                return order;
            } catch (error) {
                console.error(error)
                logger.error(`Order placement failed: ${customer_id}, ${product_id}`);
                throw new Error('Order placement failed');
            }
        }
    
    }

}
module.exports = { orderResolvers };