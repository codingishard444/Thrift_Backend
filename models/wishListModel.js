// wishlist model done
const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    customer_id:{
        type: String
    },
    product_id:{
        type: String
    },
    product_name:{
        type: String
    }
});

module.exports = mongoose.model('wishList', wishListSchema);