import Game from "./game.js";

const game = new Game();

let activeLetter = 0;

const scrambledWord = document.getElementById("scrambled-word");
const triesState = document.getElementById("tries-state");
const mistakes = document.getElementById("mistakes");
const guessedLetters = document.getElementById("guessed-letters");
const letterInput = document.getElementById("guessed-letter");
const tries = document.getElementById("tries");
const trieStateChildren = [...triesState.children];
const guessedLettersChildren = [...guessedLetters.children];

const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");
const dialogText = document.getElementById("dialog-text");

const oneLetterRegex = /^[a-zA-Z]$/;

document.addEventListener("DOMContentLoaded", update);

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
  tries.innerText = `Tries (${game.tries}/ ${game.word.length})`;
  letterInput.focus();
}

function reset() {
  game.reset();
  guessedLettersChildren.forEach((element) => {
    element.innerText = "";
    element.classList.remove("guessed-letter-active");
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

  if (game.guessLetter(activeLetter, value)) {
    guessedLettersChildren[activeLetter].classList.remove(
      "guessed-letter-active",
    );

    if (activeLetter + 1 === game.word.length) {
      guessedLettersChildren[activeLetter].appendChild(letterInput);
      console.log("you won!");
      dialogText.innerHTML = `<h2>You won!</h2><p>Word was ${game.word} 🎉</p>`;
      dialog.showModal();
      reset();
    } else {
      guessedLettersChildren[activeLetter].innerText = value;
      activeLetter += 1;
      guessedLettersChildren[activeLetter].classList.add(
        "guessed-letter-active",
      );
      guessedLettersChildren[activeLetter].appendChild(letterInput);
    }
  } else if (game.mistakes.length === game.word.length) {
    guessedLettersChildren[activeLetter].appendChild(letterInput);
    console.log("you lost");
    dialogText.innerHTML = "<h2>You lost!</h2>";
    dialog.showModal();
    reset();
  }
  letterInput.value = "";
  update();
});

const randomButton = document.getElementById("random");
randomButton.addEventListener("click", () => {
  game.newRandomWord();
  activeLetter = 0;
  update();
});

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
  reset();
  update();
});

closeButton.addEventListener("click", () => {
  dialog.close();
  activeLetter = 0;
  letterInput.focus();
});
