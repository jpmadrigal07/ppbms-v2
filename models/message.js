const mongoose = require('mongoose');
const { Schema } = mongoose;


// CREATE DB SCHEMA OF MESSEGES
const Message = new Schema({
    name:{
        type:String,
        required:[true,'Please make sure name is not blank']
    },
    emailAddress:{
        type:String,
        required:[true,'Make sure email adress is valid']
    },
    message:{
        type:String,
        required:[true,'Please enter your message']
    },
    createdAt:Date
})
module.exports = mongoose.model('Message', Message);