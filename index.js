// setTimeout: This function is used to remove the "preload" class from the body tag after a delay of 500 milliseconds, which prevents animations from playing on page load.
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// document object model
const btnRules = document.querySelector(".rules-btn");
// btn-close will be now modifed, we set it properties to btnclose variable
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  // created an array name choicees and elemetns are as mentioned
  {
    name: "scissors",
    beats: "paper",
  },

  // every element has two propeties name and beats
  {
    name: "rock",
    beats: "scissors",
  },
];

// choiceButtons: This variable is assigned the value of a NodeList containing all elements with the class name "choice-btn". It uses the querySelectorAll method of the document object to select these elements.

const choiceButtons = document.querySelectorAll(".choice-btn");
// gameDiv: This variable is assigned the value of the first element with the class name "game". It uses the querySelector method of the document object to select this element.
const gameDiv = document.querySelector(".game");
// resultsDiv: This variable is assigned the value of the first element with the class name "results". It uses the querySelector method of the document object to select this element.

const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

// looping foreach, onclick.
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

// choose: This function is called when the user selects a choice (rock, paper, or scissors) and triggers the game logic. It takes the user's choice and the computer's choice as arguments and displays the game results.

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

// aiChoose: This function randomly selects a choice (rock, paper, or scissors) for the computer opponent.

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

// displayResults: This function displays the user's and computer's choices on the screen by updating the HTML content of the corresponding result divs. It also toggles the visibility of the game and result divs to show the result.

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

const hiddens = document.querySelector(".hiddens");
const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");
const replayButton = document.querySelector(".replay");

const button = document.getElementById("playagain");

const scoreNumber = document.querySelector(".score__number");
const pcNumber = document.querySelector(".computerscore__number");
let score = 0;
let scores = 0;

// displayWinner: This function determines the winner of the game by comparing the user's and computer's choices and displays the winner on the screen. It also updates the score and stores it in local storage.

// if (score ===scores===2){

//   hiddens.classList.toggle("hiddens");

// }
// if (score == 2 && scores == 2) {
//   const replayButton = document.querySelector(".replay");
//   replayButton.textContent = "Replay";
//   replayButton.style.display = 'block';
// }

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      // resultText.innerText = `You Win`;
      // resultText.innerHTML += "<br> <em>&nbsp;&nbsp;&nbsp;AGAINST PC </em>";
      resultDivs[0].classList.toggle("winner");
      keepScore(1);
      if (score === 15) {
        stopGame();
      }
      // resultText.innerText ="you Win  AGAINST PC";
    } else if (aiWins) {
      // resultText.innerText = " YOU loose ";
      // resultText.innerHTML +=
      //   "<br> <em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; AGAINST PC </em>";
      resultDivs[1].classList.toggle("winner");
      keepScores(1);
      if (scores === 15) {
        stopGame();
      }

      // resultText.innerText ="you loose AGAINST PC";
    } else {
      resultText.innerText = "TIE UP";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

const replayButtn = document.querySelector(".replay"); // replace "replay-button" with the ID of your replay button

function stopGame() {
  // Disable the choice buttons
  choiceButtons.forEach((button) => {
    button.disabled = true;
  });

  // replayBtn.style.display = "inline-block";

  // Hide the play again button
  playAgainBtn.style.display = "";

  // Display the game over message
  resultText.innerHTML = " ";
  if (score > scores) {
    resultText.innerText = `You Win`;
    resultText.innerHTML += "<br> <em>&nbsp;&nbsp;&nbsp;AGAINST PC </em>";
    resultDivs[0].classList.toggle("winner");
  } else if (score < scores) {
    resultText.innerText = " YOU loose ";
    resultText.innerHTML +=
      "<br> <em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AGAINST PC </em>";
    resultDivs[1].classList.toggle("winner");
  } else if (score === scores) {
    resultText.innerHTML += "Tie UP";
    playAgainBtn.style.display = "none";
    replayButton.style.display = "block";
  }
}

replayButtn.addEventListener("click", function () {
  // reset scores to zero
  scoreNumber.innerText = "0";
  pcNumber.innerText = "0";
  // reset local storage to zero
  localStorage.setItem("userScore", 0);
  localStorage.setItem("aiScore", 0);
});

// isWinner: This function takes an array of two choices (user and computer) and checks if the user's choice beats the computer's choice.

function isWinner(results) {
  return results[0].beats === results[1].name;
}

// keepScores: This function updates the computer's score and stores it in local storage.

function keepScores(points) {
  scores += points;
  pcNumber.innerText = scores;
  localStorage.setItem("aiScore", scores);
}

// keepScore: This function updates the user's score and stores it in local storage.

function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
  localStorage.setItem("userScore", score);
}

// window.addEventListener("load", ...): This code is executed when the window is fully loaded and retrieves the user's and computer's scores from local storage if they exist.

window.addEventListener("load", () => {
  const userScore = localStorage.getItem("userScore");
  if (userScore !== null) {
    score = parseInt(userScore);
    scoreNumber.innerText = score;
  }
  const aiScore = localStorage.getItem("aiScore");
  if (aiScore !== null) {
    scores = parseInt(aiScore);
    pcNumber.innerText = scores;
  }
});

// playAgainBtn.addEventListener: This function is called when the user clicks the "play again" button and resets the game by hiding the result div and removing the winner class from the result divs.

playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

// btnRules.addEventListener and btnClose.addEventListener: These functions are called when the user clicks the "rules" button and the "close" button, respectively, and toggle the visibility of the modal window containing the game rules.

btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

// keepScore: This function is called when the user's score reaches 2 and displays a "Next" button that redirects the user to another HTML page.

function keepScores(points) {
  scores += points;
  pcNumber.innerText = scores;
  localStorage.setItem("aiScore", scores);
}

// keepScore: This function updates the user's score and stores it in local storage.

function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
  localStorage.setItem("userScore", score);
}

// window.addEventListener("load", ...): This code is executed when the window is fully loaded and retrieves the user's and computer's scores from local storage if they exist.

window.addEventListener("load", () => {
  const userScore = localStorage.getItem("userScore");
  if (userScore !== null) {
    score = parseInt(userScore);
    scoreNumber.innerText = score;
  }
  const aiScore = localStorage.getItem("aiScore");
  if (aiScore !== null) {
    scores = parseInt(aiScore);
    pcNumber.innerText = scores;
  }
});

function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
  localStorage.setItem("userScore", score);

  if (score === 15) {
    const nextBtn = document.createElement("button");
    nextBtn.innerText = "Next";
    nextBtn.classList.add("btn-next");
    nextBtn.style.position = "absolute";
    nextBtn.style.right = "10%";
    nextBtn.style.bottom = "2%";
    nextBtn.style.padding = "0.6rem 1rem";
    nextBtn.style.background = "none";
    nextBtn.style.border = "4px solid white";
    nextBtn.style.color = "white";
    nextBtn.style.fontWeight = "600";
    nextBtn.style.fontSize = "21px";
    nextBtn.style.cursor = "pointer";
    nextBtn.style.borderRadius = "8px";
    nextBtn.style.textDecoration = "transparent";
    nextBtn.style.fontFamily = "inherit";
    nextBtn.style.textTransform = "inherit";
    nextBtn.addEventListener("click", () => {
      window.location.href = "youwon.html";
    });

    const rulesBtn = document.querySelector(".rules-btn");
    rulesBtn.insertAdjacentElement("afterend", nextBtn);
  }
}
