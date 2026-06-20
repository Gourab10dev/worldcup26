const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Team = require("./models/Team");
const User = require("./models/User");
const PlayerRating =
require("./models/PlayerRating");

const app = express();

app.use(cors());
app.use(express.json());

/*rating-points function*/

function ratingToPoints(rating){

if(rating >= 9)
return 12;

if(rating >= 8)
return 10;

if(rating >= 7)
return 8;

if(rating >= 6.5)
return 5;

if(rating >= 6)
return 3;

return 1;

}

/*route*/

app.get("/", (req,res)=>{
    res.send("Fantasy League Backend Running");
});

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch(err=>{
    console.log(err);
});

app.post("/register", async(req,res)=>{

    try{

        const user = new User(req.body);

        await user.save();

        res.status(201).json({
            success:true,
            message:"Registration Successful"
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });
    }

});

/*save team backend*/

app.post("/save-team", async(req,res)=>{

try{

const existingTeam =
await Team.findOne({
email:req.body.email
});

if(existingTeam){

return res.status(400).json({

success:false,

message:
"You have already created a team."

});

}

const team =
new Team(req.body);

await team.save();

res.json({

success:true,

message:"Team Saved"

});

}
catch(error){

console.log(error);

res.status(500).json({

success:false

});

}

});

const PORT = process.env.PORT || 3000;

app.post("/update-rating", async(req,res)=>{

try{

const {name,rating} =
req.body;

await PlayerRating.findOneAndUpdate(

{name:name},

{
name:name,
rating:rating
},

{
upsert:true,
new:true
}

);

res.json({

success:true,

message:
"Player rating updated"

});

}
catch(error){

console.log(error);

res.status(500).json({

success:false,

message:
"Server Error"

});

}

});

/*calculate leader board route*/

app.post("/calculate-points", async(req,res)=>{

try{

console.log("Calculate Points Route Hit");

const teams = await Team.find();

console.log("Teams Found:", teams.length);

for(const team of teams){

let totalPoints = 0;

for(const playerName of team.players){

const playerRating =
await PlayerRating.findOne({

name:playerName

});

if(!playerRating)
continue;

let playerPoints =
ratingToPoints(
playerRating.rating
);

if(
playerName === team.captain
){

playerPoints =
playerPoints * 2;

}

if(
playerName === team.viceCaptain
){

playerPoints =
playerPoints * 1.5;

}

totalPoints += playerPoints;

}

team.points =
Math.round(totalPoints);

await team.save();

}

res.json({

success:true,

message:
"Leaderboard Updated"

});

}
catch(error){

console.error(error);

res.status(500).json({

success:false,

message:error.message

});

}

});

/*----------*/



app.get("/leaderboard", async(req,res)=>{

try{

const teams =
await Team.find()
.sort({points:-1});

res.json(teams);

}
catch(error){

res.status(500).json({
success:false
});

}

});
app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT}`);
});