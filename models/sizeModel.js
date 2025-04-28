// size model done
const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    product_id:{
        type:String
    },
    size_type:{
        type: String,
        enum: ['S', 'M','L','XL','XXL']
    },
    stock_amount:{
        type: int
    }
});

module.exports = mongoose.model('Size', sizeSchema);