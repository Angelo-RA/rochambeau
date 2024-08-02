playGame();

function playGame() {
    const rochambeau = ["rock", "paper", "scissors"];
    let count = 1;
    let computerScore = 0;
    let humanScore = 0;

    while(count<=5) {
        let computerSelection = getComputerChoice(rochambeau);
        let humanSelection = getHumanChoice(rochambeau);
        if(humanSelection == undefined) {
            break;
        }

        let result = playRound(humanSelection, computerSelection, rochambeau);
        if(result == "player") {
            console.log(`Round ${count}: You win! ${humanSelection} beats ${computerSelection}`);
            humanScore++;
        } else if(result == "computer") {
            console.log(`Round ${count}: Computer wins! ${computerSelection} beats ${humanSelection}`);
            computerScore++;
        } else {
            console.log(`Round ${count}: This round is a draw.`);
        }
        count++;
    }

    displayWinner(humanScore, computerScore);
}

function getComputerChoice(rochambeau) {
    let random = Math.floor(Math.random()*rochambeau.length);
    return rochambeau[random];
}

function getHumanChoice(rochambeau) {
    try {
        let choice = prompt("Choose one: Rock, Paper, or Scissors");
        let valid = rochambeau.includes(choice.toLowerCase());
        if(valid) {
            return choice;
        } else {
            throw new Error("Wrong user input. "+choice+" is not one of the choices");
        }
    } catch (e) {
        let retry = false;
        if(e instanceof TypeError) {
            e = new Error("No user input.");
            console.error(e);
            retry = confirm("No input. Press OK if you would like to try again or Cancel to quit.");
        } else {
            console.error(e);
            retry = confirm("Wrong input. Press OK if you would like to try again or Cancel to quit.");
        }
        
        if(retry) {
            return getHumanChoice(rochambeau);
        }
    }
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
    if(humanScore>computerScore) {
        console.log(`You are the overall winner with a score of ${humanScore} against Computer with a score of ${computerScore}`);
    } else if(humanScore<computerScore) {
        console.log(`Computer is the overall winner with a score of ${computerScore} against You with a score of ${humanScore}`);
    } else if(humanScore == 0 && computerScore == 0) {
        return;
    } else {
        console.log("The overall scores are tied");
    }
}