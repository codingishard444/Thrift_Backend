// User Model done
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    },
    gender: {
        type: String,
        enum: ['male', 'female','kids'],
    }
});

module.exports = mongoose.model('User', userSchema);