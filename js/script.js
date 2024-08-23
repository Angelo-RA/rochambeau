const rock = document.querySelector("#rock");
rock.addEventListener("click", (e) => {
    playGame("rock")
});

const paper = document.querySelector("#paper");
paper.addEventListener("click", (e) => {
    playGame("paper")
});

const scissors = document.querySelector("#scissors");
scissors.addEventListener("click", (e) => {
    playGame("scissors")
});

const roundCounter = {
    _round: 1,
    get round() {
        return this._round;
    },
    set round(newRound) {
        this._round = newRound;
    }
}

const humanScoreCounter = {
    _humanScore: 0,
    get humanScore() {
        return this._humanScore;
    },
    set humanScore(newScore) {
        this._humanScore = newScore;
    }
}

const computerScoreCounter = {
    _computerScore: 0,
    get computerScore() {
        return this._computerScore;
    },
    set computerScore(newScore) {
        this._computerScore = newScore;
    } 
}

const outcome = document.querySelector("#outcome");

function playGame(humanSelection) {
    const rochambeau = ["rock", "paper", "scissors"];
    let round = roundCounter.round;
    let humanScore = humanScoreCounter.humanScore;
    let computerScore = computerScoreCounter.computerScore;

    if(round == 1) {
        while(outcome.firstChild) {
            outcome.removeChild(outcome.lastChild);
        }
    }

    let computerSelection = getComputerChoice(rochambeau);

    const para = document.createElement("p");
    let result = playRound(humanSelection, computerSelection, rochambeau);
    if(result == "player") {
        para.textContent = `Round ${round}: You win! ${humanSelection} beats ${computerSelection}`;
        humanScoreCounter.humanScore = humanScore+1;
    } else if(result == "computer") {
        para.textContent = `Round ${round}: Computer wins! ${computerSelection} beats ${humanSelection}`;
        computerScoreCounter.computerScore = computerScore+1;
    } else {
        para.textContent = `Round ${round}: This round is a draw.`;
    }
    outcome.appendChild(para);

    if(round == 5) {
        humanScore = humanScoreCounter.humanScore;
        computerScore = computerScoreCounter.computerScore;
        displayWinner(humanScore, computerScore);
        roundCounter.round = 1;
        humanScoreCounter.humanScore = 0;
        computerScoreCounter.computerScore = 0;
    } else {
        roundCounter.round = round+1;
    }
}

function getComputerChoice(rochambeau) {
    let random = Math.floor(Math.random()*rochambeau.length);
    return rochambeau[random];
}

function playRound(humanChoice, computerChoice, rochambeau) {
    console.log("You chose "+humanChoice+" and Computer chose "+computerChoice);
    if(humanChoice == rochambeau[0] && computerChoice == rochambeau[2]) {
        return "player";
    } else if(humanChoice == rochambeau[1] && computerChoice == rochambeau[0]) {
        return "player";
    } else if(humanChoice == rochambeau[2] && computerChoice == rochambeau[1]) {
        return "player";
    } else if(humanChoice == rochambeau[2] && computerChoice == rochambeau[0]) {
        return "computer";
    } else if(humanChoice == rochambeau[0] && computerChoice == rochambeau[1]) {
        return "computer";
    } else if(humanChoice == rochambeau[1] && computerChoice == rochambeau[2]) {
        return "computer";
    } else {
        return "draw";
    }
}

function displayWinner(humanScore, computerScore) {
    const winner = document.createElement("h3");
    if(humanScore>computerScore) {
        winner.textContent = `You are the overall winner with a score of ${humanScore} against Computer with a score of ${computerScore}`;
    } else if(humanScore<computerScore) {
        winner.textContent = `Computer is the overall winner with a score of ${computerScore} against You with a score of ${humanScore}`;
    } else if(humanScore == 0 && computerScore == 0) {
        return;
    } else {
        winner.textContent = "The overall scores are tied";
    }
    outcome.appendChild(winner);
}