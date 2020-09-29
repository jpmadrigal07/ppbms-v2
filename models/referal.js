const mongoose = require('mongoose');
const { Schema } = mongoose;

// CREATE DB SCHEMA OF REFERAL
const Referal = new Schema({

    inviterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:[true,"please put the inviter id"]
    },
    invitedId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:[true,"please put the inviter id"],
        unique:[true,"this is already invited by other user"]
    },
    isInvitedPaid:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        required:true
    }

})
module.exports = mongoose.model('Referal', Referal);