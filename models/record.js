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
    dateRecieved: { 
        type: String,
        default: null
    },
    recievedBy: { 
        type: String,
        default: null
    },
    relation: { 
        type: String,
        default: null
    },
    messenger: { 
        type: String,
        default: null
    },
    status: { 
        type: String,
        default: null
    },
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