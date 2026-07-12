import "./style.css";

function getTeamAsHTML(team) {
  return `<tr>
            <td>${team.promotion}</td>
            <td>${team.members}</td>
            <td>${team.Name}</td>
            <td>${team.Url}</td>
            <td>X</td>
          </tr>`;
}

function renderTeams(teams) {
  const teamsHTML = teams.map(getTeamAsHTML);

  document.querySelector("#teamsTable tbody").innerHTML = teamsHTML.join("");
}

function loadTeams() {
  fetch("http://localhost:3000/teams-json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(r => r.json())
    .then(teams => {
      renderTeams(teams);
    });
}

loadTeams();
