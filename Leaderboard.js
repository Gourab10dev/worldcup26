async function loadLeaderboard(){

const response =
await fetch(
"https://worldcup26-backend.onrender.com/leaderboard"
);

const data =
await response.json();

const tbody =
document.getElementById(
"leaderboardBody"
);

tbody.innerHTML = "";

data.forEach((team,index)=>{

tbody.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${team.username}</td>

<td>${team.points}</td>

</tr>

`;

});

}

loadLeaderboard();

/* row division gold,silver,bronze */

data.forEach((team,index)=>{

let rowClass = "";

if(index === 0){
    rowClass = "gold-row";
}
else if(index === 1){
    rowClass = "silver-row";
}
else if(index === 2){
    rowClass = "bronze-row";
}

tbody.innerHTML += `

<tr class="${rowClass}">

<td>${index + 1}</td>

<td>${team.username}</td>

<td>${team.formation}</td>

<td>${team.captain}</td>

<td>${team.points}</td>

</tr>

`;

});
