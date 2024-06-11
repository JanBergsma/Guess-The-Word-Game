import words from "../data/words.json";

export default class Game {
  constructor() {
    this.words = words;
    this.word = this.getRandomWord();
    this.scrambledWord = this.scrambleWord(this.word);
    this.tries = 0;
    this.mistakes = [];
  }

  getRandomWord(random = null) {
    random = random !== null ? random : Math.random;
    const index = this._randomInt(random, 0, this.words.length - 1);
    return this.words[index];
  }

  guessLetter(index, letter) {
    if (letter === this.word[index]) {
      return true;
    }
    this.tries += 1;
    this.mistakes.push(letter);
    return false;
  }

  newRandomWord() {
    this.word = this.getRandomWord();
    this.scrambledWord = this.scrambleWord(this.word);
  }

  reset() {
    this.newRandomWord();
    this.tries = 0;
    this.mistakes = [];
  }

  scrambleWord(word) {
    const random = Math.random;

    const scrambled = word.split("");
    for (let i = 0; i < scrambled.length; i++) {
      const j = this._randomInt(random, 0, scrambled.length);
      const temp = scrambled[i];
      scrambled[i] = scrambled[j];
      scrambled[j] = temp;
    }

    return scrambled.join("");
  }

  _randomInt(random, min, max) {
    return Math.floor(random() * (max - min) + min);
  }
}
