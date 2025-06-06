// Admin model done
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullname:{
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Admin', adminSchema);