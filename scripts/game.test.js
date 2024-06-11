import { describe, expect, test } from "vitest";
import Game from "./game";

describe("Test game", () => {
  test("Game should be a game", () => {
    expect(new Game()).toBeInstanceOf(Game);
  });

  test("Word should be defined and should be an Array", () => {
    const game = new Game();
    expect(game.words).toBeDefined();
    expect(game.words).toBeInstanceOf(Array);
    expect(game.word).toBeTypeOf("string");
    expect(game.scrambledWord).toBeTypeOf("string");
    expect(game.scrambledWord.length).toBe(game.word.length);
    expect(game.tries).toBe(0);
    expect(game.mistakes).toBeInstanceOf(Array);
  });

  test("Pick random word", () => {
    const game = new Game();
    expect(game.getRandomWord(() => 0)).toBe(game.words[0]);
    expect(game.getRandomWord(() => 1)).toBe(game.words[game.words.length - 1]);
  });

  test("Random scrambled word", () => {
    const game = new Game();
    const randomWord = game.getRandomWord();
    expect(randomWord.split("").sort()).toStrictEqual(
      game.scrambleWord(randomWord).split("").sort(),
    );
  });

  test("Guess one letter and should update the tries and mistakes", () => {
    const game = new Game();
    game.word = "barry";
    expect(game.guessLetter(0, "a")).toBe(false);
    expect(game.tries).toBe(1);
    expect(game.mistakes).toContain("a");

    expect(game.guessLetter(game.word.length - 1, "y")).toBe(true);
    expect(game.tries).toBe(1);
    expect(game.mistakes).not.toContain("y");
  });

  test("Reset the game should give a new scrambled word, set tries to 0, and empty mistakes", () => {
    const game = new Game();
    const firstWord = "barry";
    game.word = firstWord;

    expect(game.guessLetter(0, "a")).toBe(false);
    expect(game.guessLetter(0, "y")).toBe(false);
    expect(game.guessLetter(0, "r")).toBe(false);

    game.reset();

    expect(game.word).not.toBe(firstWord);
    expect(game.tries).toBe(0);
    expect(game.mistakes).toStrictEqual([]);
  });

  test("Request new random word", () => {
    const game = new Game();
    const firstWord = "barry";
    game.word = firstWord;

    expect(game.guessLetter(0, "a")).toBe(false);
    expect(game.guessLetter(0, "y")).toBe(false);
    expect(game.guessLetter(0, "r")).toBe(false);

    game.newRandomWord();

    expect(game.word).not.toBe(firstWord);
    expect(game.tries).toBe(3);
    expect(game.mistakes).toStrictEqual(["a", "y", "r"]);
  });
});
