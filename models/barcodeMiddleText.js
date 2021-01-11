const mongoose = require('mongoose');
const { Schema } = mongoose;

// CREATE DB SCHEMA OF USERS
const barcodeMiddleText = new Schema({
    code: {
        type: String,
        unique:true
    },
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

module.exports = mongoose.model('BarcodeMiddleText', barcodeMiddleText);