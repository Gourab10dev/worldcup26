


const formationArea =
document.getElementById("formationArea");

const formationSelect =
document.getElementById("formationSelect");

const playerMarket =
document.getElementById("playerMarket");

const tabs =
document.querySelectorAll(".pos-btn");

/* =====================
FORMATIONS
===================== */

const formations = {

433: [
["LW","ST","RW"],
["CM","CDM","CM"],
["LB","CB","CB","RB"],
["GK"]
],

442: [
["ST","ST"],
["LW","CDM","CDM","RW"],
["LB","CB","CB","RB"],
["GK"]
],

235: [
["LW","CF","CF","CF","RW"],
["LB","CDM","RB"],
["CB","CB"],
["GK"]
],

4231: [
["ST"],
["LAM","RAM"],
["LW","CAM","RW"],
["LB","CB","CB","RB"],
["GK"]
],

343: [
["LW","ST","RW"],
["LM","CDM","CDM","RM"],
["CB","CB","CB"],
["GK"]
],

3421: [
["ST"],
["LAM","CDM","CDM","RAM"],
["CB","CB","CB"],
["GK"]
]

};

/* =====================
CREATE FORMATION
===================== */

function createFormation(type){

formationArea.innerHTML = "";

formations[type].forEach(row=>{

const rowDiv =
document.createElement("div");

rowDiv.classList.add(
"formation-row"
);

row.forEach(position=>{

const slot =
document.createElement("div");

slot.classList.add(
"player-slot"
);

slot.dataset.position =
position;

slot.innerHTML =
position;

enableDrop(slot);

rowDiv.appendChild(slot);

});

formationArea.appendChild(
rowDiv
);

});

}

createFormation("433");

/* =====================
FORMATION CHANGE
===================== */

formationSelect.addEventListener(
"change",
()=>{
createFormation(
formationSelect.value
);
}
);

/* =====================
LOAD PLAYERS
===================== */

function loadPlayers(position){

playerMarket.innerHTML = "";

if(!players[position]) return;

players[position].forEach(player=>{

const card =
document.createElement("div");

card.classList.add(
"player-card"
);

card.draggable = true;

card.innerHTML = `

<img src="${player.img}">

<h3>${player.name}</h3>

<p>${player.country}</p>

<span>${player.club}</span>

`;

card.addEventListener(
"dragstart",
()=>{

card.classList.add(
"dragging"
);

}
);

card.addEventListener(
"dragend",
()=>{

card.classList.remove(
"dragging"
);

}
);

playerMarket.appendChild(
card
);

});

}

loadPlayers("GK");

/* =====================
POSITION BUTTONS
===================== */

tabs.forEach(tab=>{

tab.addEventListener(
"click",
()=>{

tabs.forEach(btn=>
btn.classList.remove(
"active"
)
);

tab.classList.add(
"active"
);

loadPlayers(
tab.dataset.pos
);

}
);

});

/* =====================
DRAG DROP
===================== */

function enableDrop(slot){

slot.addEventListener(
"dragover",
e=>{

e.preventDefault();

}
);

slot.addEventListener("drop", e => {

    e.preventDefault();

    const dragged =
    document.querySelector(".dragging");

    if(!dragged) return;

    const playerName =
    dragged.querySelector("h3").innerText;

    const currentPlayer =
    slot.querySelector(".selected-player");

    const exists =
    [...document.querySelectorAll(".selected-player")]
    .some(player =>
        player.dataset.name === playerName &&
        player !== currentPlayer
    );

    if(exists){
        alert("Player already selected!");
        return;
    }

    const imgSrc =
    dragged.querySelector("img").src;

    slot.innerHTML = `
        <div class="selected-player"
             data-name="${playerName}">
            <img src="${imgSrc}">
        </div>
    `;
    const selectedPlayer =
slot.querySelector(".selected-player");

selectedPlayer.addEventListener("click", () => {

    /* Captain */

    if(captainMode){

        if(currentCaptain){

            currentCaptain
            .querySelector(".captain-badge")
            ?.remove();

        }

        const badge =
        document.createElement("div");

        badge.className =
        "captain-badge";

        badge.innerText = "C";

        selectedPlayer.appendChild(badge);

        currentCaptain =
        selectedPlayer;

        captainMode = false;

        return;
    }

    /* Vice Captain */

    if(viceCaptainMode){

        if(currentViceCaptain){

            currentViceCaptain
            .querySelector(".vice-captain-badge")
            ?.remove();

        }

        const badge =
        document.createElement("div");

        badge.className =
        "vice-captain-badge";

        badge.innerText = "VC";

        selectedPlayer.appendChild(badge);

        currentViceCaptain =
        selectedPlayer;

        viceCaptainMode = false;

    }

});
})}


/* =====================
CAPTAIN
===================== */

let captainMode = false;
let currentCaptain = null;

document.getElementById("captainBtn")
.addEventListener("click", () => {

    captainMode = true;

    alert("Click a player on the pitch to make Captain");

});

/* =====================
VICE CAPTAIN
===================== */

let viceCaptainMode = false;
let currentViceCaptain = null;

document.getElementById("viceCaptainBtn")
.addEventListener("click", () => {

    viceCaptainMode = true;

    alert("Click a player on the pitch to make Vice Captain");

});

/* =====================
SAVE TEAM
===================== */

document
.getElementById("saveTeamBtn")
.addEventListener("click", async ()=>{

const selectedPlayers = [];

document
.querySelectorAll(".selected-player")
.forEach(player=>{

selectedPlayers.push(
player.dataset.name
);

});

/*no repeatation*/

const totalSlots =
document.querySelectorAll(".player-slot").length;

const filledSlots =
document.querySelectorAll(".selected-player").length;

if(filledSlots !== totalSlots){

alert(
`Complete your Best XI first!\n\n${filledSlots}/${totalSlots} selected`
);

return;
}

if(!currentCaptain){

alert(
"Please select a Captain!"
);

return;
}

if(!currentViceCaptain){

alert(
"Please select a Vice Captain!"
);

return;
}

/*team data collection*/

const teamData = {

username:
localStorage.getItem("username"),

formation:
formationSelect.value,

email:
localStorage.getItem("email"),

captain:
currentCaptain?.dataset.name || "",

viceCaptain:
currentViceCaptain?.dataset.name || "",

players:
selectedPlayers

};

try{

const response = await fetch(
"https://worldcup26-backend.onrender.com/save-team",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(teamData)

}
);

const data =
await response.json();

if(data.success){

alert("Team Saved Successfully!");

window.location.href="Leaderboard.html";

}
else{

alert(
"Failed to Save Team"
);

}

}
catch(error){

console.error(error);

alert(
"Error Saving Team"
);

}

});