// shoppingCart model
const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
    customer_id:{
        type: String
    },
    product_id:{
        type: String
    },
    product_name:{
        type: String
    },
    quantity:{
        type:Number
    },
    size_type:{
        type:String
    },
    total_price:{
        type:Number
    }
});

module.exports = mongoose.model('shoppingCart', shoppingCartSchema);