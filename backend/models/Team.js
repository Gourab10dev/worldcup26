const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({

username:String,

formation:String,

captain:String,

viceCaptain:String,

players:[String],

points:{
type:Number,
default:0
}

},
{
timestamps:true
});

module.exports =
mongoose.model("Team", teamSchema);