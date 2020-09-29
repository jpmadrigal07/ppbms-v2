const mongoose = require('mongoose');
const { Schema } = mongoose;

// CREATE DB SCHEMA OF PAYMENTS
const Announcement = new Schema({
   
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description:{
        type:String,
        required:[true,'Please write message of your announcement']
    },
    image:String,
    updatedAt:Date,
    deletedAt:{
        type:Date,
        default:null
    },
    createdAt:Date    
});

module.exports = mongoose.model('Announcement', Announcement);