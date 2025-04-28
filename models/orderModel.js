// order model done
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id:{
        type: String
    },
    product_id:{
        type: String
    },
    quantity:{
        type: int
    },
    total_price:{
        type: Number
    }
});

module.exports = mongoose.model('Order', orderSchema);