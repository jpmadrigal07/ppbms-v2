const mongoose = require('mongoose');
const { Schema } = mongoose;

// CREATE DB SCHEMA OF USERS
const dispatchControlMessenger = new Schema({
    name: String,
    address: String,
    preparedBy: String,
    date: Date,
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

module.exports = mongoose.model('DispatchControlMessenger', dispatchControlMessenger);