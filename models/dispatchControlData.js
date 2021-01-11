const mongoose = require('mongoose');
const { Schema } = mongoose;

// CREATE DB SCHEMA OF USERS
const dispatchControlData = new Schema({
    messengerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DispatchControlMessenger"
    },
    dataCycleCode: String,
    pickupDate: Date,
    sender: String,
    delType: String,
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

module.exports = mongoose.model('DispatchControlData', dispatchControlData);