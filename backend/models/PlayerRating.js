const mongoose = require("mongoose");

const playerRatingSchema =
new mongoose.Schema({

name:{
type:String,
required:true,
unique:true
},

rating:{
type:Number,
required:true,
}

});

module.exports =
mongoose.model(
"PlayerRating",
playerRatingSchema
);