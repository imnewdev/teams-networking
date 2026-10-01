import "./style.css";

function $(selector) {
  return document.querySelector(selector);
}

function createTeamRequest(team) {
  return fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  }).then(r => r.json());
}

function getTeamAsHTML(team) {
  return `<tr>
            <td>${team.promotion}</td>
            <td>${team.members}</td>
            <td>${team.name}</td>
            <td>${team.url}</td>
            <td>X</td>
          </tr>`;
}

function renderTeams(teams) {
  const teamsHTML = teams.map(getTeamAsHTML);

  $("#teamsTable tbody").innerHTML = teamsHTML.join("");
}

function loadTeams() {
  return fetch("http://localhost:3000/teams-json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(r => r.json())
    .then(teams => {
      renderTeams(teams);
    })
    .catch(err => {
      console.error("Error loading teams:", err);
      alert("Failed to load teams. start node-api");
    });
}

function onSubmit(e) {
  e.preventDefault();
  const members = $("input[name=members]").value;
  const promotion = $("#promotion").value;

  const url = $("#url").value;
  console.warn("url", url);
  const team = {
    promotion: $("input[name=promotion]").value,
    members: members,
    projectName: $("input[name=projectName]").value,
    url
  };

  createTeamRequest(team).then(status => {
    //console.warn("status", status);
    if (status.success) {
      window.location.reload();
    }
  });
}

function initEvents() {
  $("#teamsForm").addEventListener("submit", onSubmit);
}

initEvents();
loadTeams();
