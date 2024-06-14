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

  // guessedLettersChildren.forEach((element, index) => {
  //   console.log(element);
  // });
}

letterInput.addEventListener("input", (e) => {
  const value = e.target.value;
  console.log("input", value);
  if (game.guessLetter(activeLetter, value)) {
    console.log("hoppla");
    guessedLettersChildren[activeLetter].classList.remove(
      "guessed-letter-active",
    );
    guessedLettersChildren[activeLetter].innerText = value;
    // guessedLettersChildren[activeLetter].removeChild(letterInput);
    if (activeLetter + 1 === game.word.length) {
      guessedLettersChildren[activeLetter].appendChild(letterInput);
      letterInput.disabled = true;
      console.log("you won!");
    } else {
      activeLetter += 1;
      guessedLettersChildren[activeLetter].classList.add(
        "guessed-letter-active",
      );
      letterInput.value = "";
      guessedLettersChildren[activeLetter].appendChild(letterInput);
      letterInput.focus();
    }
  }
  update();
});
