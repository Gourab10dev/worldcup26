/* =====================
UPDATE PLAYER RATING
===================== */

document
.getElementById("updateBtn")
.addEventListener(
"click",
async ()=>{

const playerName =
document.getElementById(
"playerName"
).value.trim();

const playerRating =
Number(
document.getElementById(
"playerRating"
).value
);

if(!playerName){

alert(
"Enter Player Name"
);

return;

}

if(!playerRating){

alert(
"Enter Player Rating"
);

return;

}

try{

const response =
await fetch(
"https://worldcup26-backend.onrender.com/update-rating",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

name:playerName,

rating:playerRating

})

}
);

const data =
await response.json();

if(data.success){

alert(
playerName +
" Rating Updated Successfully!"
);

document
.getElementById(
"playerName"
).value = "";

document
.getElementById(
"playerRating"
).value = "";

}
else{

alert(
data.message
);

}

}
catch(error){

console.error(error);

alert(
"Server Error"
);

}

});

document
.getElementById("calculateBtn")
.addEventListener(
"click",
async()=>{

try{

const response =
await fetch(
"https://worldcup26-backend.onrender.com/calculate-points",
{
method:"POST"
}
);

const data =
await response.json();

if(data.success){

alert(
"Leaderboard Updated Successfully!"
);

}
else{

alert(data.message || "Update Failed");

}

}
catch(error){

console.log(error);

alert(
"Server Error"
);

}

});