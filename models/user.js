const mongoose = require('mongoose');
const { Schema } = mongoose;

// CREATE DB SCHEMA OF USERS
const User = new Schema({
    username: {
        type: String,
        unique:true,
        required: [true, 'Please Fill-up the blank field']
    },
    password: {
        type: String,
        required: [true, 'This Field is required']
    },
    firstName:{
        type:String,
        required:[true, 'This Field is required']
    },
    lastName:{
        type:String,
        required:[true, 'This Field is required']
    },
    role:{
        type:String,
        enum:['Admin','Sub Admin'],
        default:"Sub Admin"
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('User', User);