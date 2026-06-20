document
.getElementById("updateBtn")
.addEventListener(
"click",
async()=>{

const name =
document.getElementById(
"playerName"
).value;

const rating =
Number(
document.getElementById(
"playerRating"
).value
);

await fetch(
"https://YOUR-BACKEND.onrender.com/update-rating",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
name,
rating
})

}
);

alert(
"Rating Updated"
);

});