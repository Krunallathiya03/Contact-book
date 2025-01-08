const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({

    name:{
        type:String,    
        requied:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:String,


},{timestamps:true});

module.exports = mongoose.model("Contact",contactSchema)