const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },

    dob:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    country:{
        type:String,
        required:true
    },

    whatsapp:{
        type:String,
        required:true
    }

},{
    timestamps:true
});

module.exports = mongoose.model("User", userSchema);