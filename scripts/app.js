import Game from "./game.js";

const game = new Game();

const scrambledWord = document.getElementById("scrambled-word");
scrambledWord.innerText = game.scrambledWord;

const triesState = document.getElementById("tries-state");

[...triesState.children].forEach((element, index) => {
  if (index < game.tries) {
    element.classList.add("try-done");
  } else {
    element.classList.remove("try-done");
  }
});

const mistakes = document.getElementById("mistakes");
mistakes.innerText = game.mistakes;

const guessedLetters = document.getElementById("guessed-letters");
[...guessedLetters.children].forEach((element, index) => {
  console.log(element);
});
