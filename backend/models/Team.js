const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({

username:String,

formation:String,

captain:String,

viceCaptain:String,

players:[String]

},
{
timestamps:true
});

module.exports =
mongoose.model("Team", teamSchema);