const mongoose = require('mongoose');
const { Schema } = mongoose;

// CREATE DB SCHEMA OF PAYMENTS
const Payment = new Schema({
   
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    method:{
        type:String,
        required:[true,"Please choose a payment method"]
    },
    referenceNumber:{
        type:String,
        required:[true,"Please Provide the reference number of your payment as proof"]
    },
    photoProof:{
        type:String,
        required:[true,"Please Provide the screenshot of your payment as proof"]
    },
    status:{
        type:String,
        enum:['Pending','Verified','Problem'],
        default:'Pending'
    },
    problemDesc:{
        type:String,
        default:null
    },
    updatedAt:Date,
    createdAt:Date

});

module.exports = mongoose.model('Payment', Payment);