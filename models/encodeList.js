const mongoose = require('mongoose');
const { Schema } = mongoose;

// CREATE DB SCHEMA OF USERS
const encodeList = new Schema({
    fileName: String,
    deletedAt: Date,
    updatedAt: {
        type:Date,
        default:Date.now
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('EncodeList', encodeList);