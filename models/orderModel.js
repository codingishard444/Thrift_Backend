// order model done
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer_id:{
        type: String
    },
    product_id:{
        type: String
    },
    quantity:{
        type: Number
    },
    total_price:{
        type: Number
    },
    size_type:{
        type: String
    },
    location:{
        type: String
    }
});

module.exports = mongoose.model('Order', orderSchema);