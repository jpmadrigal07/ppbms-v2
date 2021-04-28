const mongoose = require('mongoose');
const { Schema } = mongoose;

// CREATE DB SCHEMA OF USERS
const areaPrice = new Schema({
    name: {
        type: String,
        unique:true
    },
    price: Number,
    deletedAt: Date,
    updatedAt:{
        type:Date,
        default:Date.now
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('AreaPrice', areaPrice);