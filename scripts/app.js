import Game from "./game.js";

const game = new Game();

let activeLetter = 0;

const scrambledWord = document.getElementById("scrambled-word");
const triesState = document.getElementById("tries-state");
const mistakes = document.getElementById("mistakes");
const guessedLetters = document.getElementById("guessed-letters");
const letterInput = document.getElementById("guessed-letter");

const trieStateChildren = [...triesState.children];
const guessedLettersChildren = [...guessedLetters.children];

const oneLetterRegex = /^[a-zA-Z]$/;

update();
console.log(game.word);
function update() {
  scrambledWord.innerText = game.scrambledWord;

  trieStateChildren.forEach((element, index) => {
    if (index < game.tries) {
      element.classList.add("try-done");
    } else {
      element.classList.remove("try-done");
    }
  });

  mistakes.innerText = game.mistakes;
}

function reset() {
  console.log("reset");
  game.reset();
  guessedLettersChildren.forEach((element) => {
    element.innerText = "";
    element.classList.toggle("guessed-letter-active");
  });
  letterInput.value = "";
  guessedLettersChildren[0].classList.add("guessed-letter-active");
  guessedLettersChildren[0].appendChild(letterInput);
}

letterInput.addEventListener("input", (e) => {
  const value = e.target.value;
  if (!oneLetterRegex.test(value)) {
    return;
  }
  console.log("change", value);
  if (game.guessLetter(activeLetter, value)) {
    guessedLettersChildren[activeLetter].classList.remove(
      "guessed-letter-active",
    );

    if (activeLetter + 1 === game.word.length) {
      guessedLettersChildren[activeLetter].appendChild(letterInput);
      letterInput.disabled = true;
      console.log("you won!");
      return;
    }
    guessedLettersChildren[activeLetter].innerText = value;
    activeLetter += 1;
    guessedLettersChildren[activeLetter].classList.add("guessed-letter-active");
    letterInput.value = "";
    guessedLettersChildren[activeLetter].appendChild(letterInput);
    letterInput.focus();
  } else if (game.tries === game.word.length) {
    console.log("you lost");
    reset();
  }
  update();
});

const randomButton = document.getElementById("random");
randomButton.addEventListener("click", () => {
  game.newRandomWord();
  activeLetter = 0;
  console.log(game.word);
  update();
});

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", reset);
