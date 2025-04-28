// Product model done, may require small revisions based on what we can do
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name:{
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female','kids'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount_rate: {
        type: Number,
        required: true,
        default: 0
    },
    category_type: {
        type: String,
        required: true,
        enum: [
            "Men's Tops",
            "Men's Sweaters & Hoodies",
            "Men's Bottoms",
            "Men's Activewear",
            "Men's Outerwear",
            "Men's Loungewear",
            "Men's Undergarments & Basics",
            "Men's Workwear & Occasion",
            "Women's Tops",
            "Women's Sweaters & Hoodies",
            "Women's Bottoms",
            "Women's Activewear",
            "Women's Dresses & Skirts",
            "Women's Outerwear",
            "Women's Loungewear",
            "Women's Undergarments & Basics",
            "Kids' Tops",
            "Kids' Sweaters & Hoodies",
            "Kids' Bottoms",
            "Kids' Activewear",
            "Kids' Outerwear",
            "Kids' School & Playwear",
            "Kids' Loungewear & Pajamas",
            "Kids' Seasonal & Special"
        ]
    },
    sold_amount: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    Total_stock: {
        type: Number,
        required: true,
        min: 0
    }
});

module.exports = mongoose.model('Product', productSchema);
