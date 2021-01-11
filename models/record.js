const mongoose = require('mongoose');
const { Schema } = mongoose;

// CREATE DB SCHEMA OF USERS
const record = new Schema({
    messengerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DispatchControlMessenger"
    },
    encodeListId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EncodeList"
    },
    sender: String,
    delType: String,
    pud: String,
    month: String,
    year: String,
    jobNum: String,
    checkList: String,
    fileName: String,
    seqNum: Number,
    cycleCode: String,
    qty: Number,
    address: String,
    area: String,
    subsName: String,
    barCode: String,
    acctNum: String,
    dateRecieved: Date,
    recievedBy: String,
    relation: String,
    messenger: String,
    status: String,
    reasonRTS: { 
        type: String,
        default: null
    },
    remarks: { 
        type: String,
        default: null
    },
    dateReported: { 
        type: Date,
        default: null
    },
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

module.exports = mongoose.model('Record', record);