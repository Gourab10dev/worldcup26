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
["CDM","CAM","CAM"],
["LB","CB","CB","RB"],
["GK"]
],

442: [
["ST","ST"],
["LM","CDM","CDM","RM"],
["LB","CB","CB","RB"]
["GK"]
],

4231: [
["ST"],
["CDM","CDM"],
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
["CDM","CDM","CAM","CAM"],
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

    if(slot.querySelector(".selected-player")){
    alert("This position is already occupied!");
    return;
}

    /* Check duplicates FIRST */

    const exists =
    [...document.querySelectorAll(".selected-player")]
    .some(player =>
        player.dataset.name === playerName
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

    slot.classList.add("filled");

});
}

/* =====================
CAPTAIN
===================== */

let selectedCaptain =
null;

document
.getElementById(
"captainBtn"
)
.addEventListener(
"click",
()=>{

const name =
prompt(
"Type captain name exactly:"
);

selectedCaptain = name;

alert(
name + " selected as Captain"
);

}
);

/* =====================
VICE CAPTAIN
===================== */

let selectedVC =
null;

document
.getElementById(
"viceCaptainBtn"
)
.addEventListener(
"click",
()=>{

const name =
prompt(
"Type vice captain name:"
);

selectedVC = name;

alert(
name + " selected as Vice Captain"
);

}
);

/* =====================
SAVE TEAM
===================== */

document
.getElementById(
"saveTeamBtn"
)
.addEventListener(
"click",
()=>{

const selectedPlayers = [];

document
.querySelectorAll(
".player-slot"
)
.forEach(slot=>{

const player =
slot.querySelector("h3");

if(player){

selectedPlayers.push(
player.innerText
);

}

});

console.log(
selectedPlayers
);

alert(
"Team Saved!"
);

});
