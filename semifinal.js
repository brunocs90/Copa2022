function createMenu(link, fase, nome) {
    return `
        <li>
            <a href="./${link}.html" class="${fase}">
                <span class="btn btn-primary">${nome}</span>
            </a>
        </li>
    `
}

document.querySelector("#menu").innerHTML = `
    <ul class="nav-menu">
        ${createMenu("grupos", "fase-grupo", "Fase de Grupos")}
        ${createMenu("oitavas", "fase-oitavas", "Oitavas de Final")}
        ${createMenu("quartas", "fase-quartas", "Quartas de Final")}
        ${createMenu("semifinal", "fase-semifinal", "Semifinal")}
        ${createMenu("terceiro-lugar", "fase-terceiro", "3º lugar")}
        ${createMenu("final", "fase-final", "Final")}
    </ul>
`

function createGame(player1, hour, player2, homeTeamScore, awayTeamScore) {
    const iconFlagPlayer1 = (player1.startsWith('Coming')) === true ? "unknown" : player1;
    const iconFlagPlayer2 = (player2.startsWith('Coming')) === true ? "unknown" : player2;

    const figCationPlayer1 = (player1.startsWith('Coming')) === true ? "" : player1.replace('_', ' ');
    const figCationPlayer2 = (player2.startsWith('Coming')) === true ? "" : player2.replace('_', ' ');

    return `
	<li>
		<figure>
			<img src="./assets/icon=${iconFlagPlayer1}.svg" class="flag" alt="Logo do ${player1}">
			<figcaption>${figCationPlayer1}</figcaption>
		</figure>
			<strong class="horario">${hour}</strong>
		<figure>
			<img src="./assets/icon=${iconFlagPlayer2}.svg" class="flag" alt="Logo da ${player2}">
			<figcaption>${figCationPlayer2}</figcaption>
		</figure>
	</li>
	<span class="emBreve">${homeTeamScore === null ? "Em breve" : `<div class="placar">${homeTeamScore} x ${awayTeamScore}</div>`}</span>
	`
}

//<span class="placar">0 x 0</span>

let delay = -0.3;
function createCard(date, day, games) {
    delay = delay + 0.3;
    return `
    <div class="card" style="animation-delay: ${delay}s">
		<h2 class="date" >${date}<span>${day}</span></h2>
		<ul>
			${games}
		</ul>
    </div>
    `
}
function getDayofWeek(dia) {
    switch (dia) {
        case 0:
            return "Domingo";
        case 1:
            return "Segunda";
        case 2:
            return "Terça";
        case 3:
            return "Quarta";
        case 4:
            return "Quinta";
        case 5:
            return "Sexta";
        case 6:
            return "Sábado";
        default:
            return "";
    }
}

fetch("./data/semifinal.json")
    .then(function (response) {
        return response;
    })
    .then(function (data) {
        return data.json();
    })
    .then(function (Normal) {
        document.querySelector("#cards").innerHTML = processJson(Normal)
    })
    .catch(function (err) {
        console.log("Fetch problems: " + err.message);
    });


function processJson(data) {
    let htmlDados = "";
    let diaGame = [];
    let listGames = "";

    let dateFormat = new Date();
    let dateFormatDiaMes = "";
    let diaSemana = 0;
    let horario = "";

    for (var match in data) {
        const dayGame = data[match].day

        if (diaGame.length == 0) {
            diaGame.push(dayGame);
        }

        if (diaGame.includes(dayGame)) {
            const homeTeam = data[match].HomeTeam;
            const awayTeam = data[match].AwayTeam;
            const date = data[match].DateUtc;
            const homeTeamScore = data[match].HomeTeamScore;
            const awayTeamScore = data[match].AwayTeamScore;

            dateFormat = new Date(date).toLocaleDateString("pt-br");
            dateFormatDiaMes = dateFormat.slice(0, 5);
            diaSemana = getDayofWeek(new Date(date).getDay());

            horario = new Date(date).getHours() + ":00";

            listGames += createGame(homeTeam, horario, awayTeam, homeTeamScore, awayTeamScore);
        }
        else {
            htmlDados += createCard(dateFormatDiaMes, diaSemana, listGames);
            listGames = "";

            diaGame.push(dayGame);
            const homeTeam = data[match].HomeTeam;
            const awayTeam = data[match].AwayTeam;
            const date = data[match].DateUtc;
            const homeTeamScore = data[match].HomeTeamScore;
            const awayTeamScore = data[match].AwayTeamScore;

            dateFormat = new Date(date).toLocaleDateString("pt-br");
            dateFormatDiaMes = dateFormat.slice(0, 5);
            diaSemana = getDayofWeek(new Date(date).getDay());

            const horarioSize = new Date(date).getHours().toString().length;

            if (horarioSize === 1) {
                horario = "0" + new Date(date).getHours() + ":00";
            }
            else {
                horario = new Date(date).getHours() + ":00";
            }

            listGames += createGame(homeTeam, horario, awayTeam, homeTeamScore, awayTeamScore);
        }
    }
    return htmlDados;
}