import { describe, expect, test } from "vitest";
import Game from "./game";

describe("Test game", () => {
  test("Game should be a game", () => {
    expect(new Game()).toBeInstanceOf(Game);
  });

  test("Word should be defined and should be an Array", () => {
    expect(new Game().words).toBeDefined();
    expect(new Game().words).toBeInstanceOf(Array);
  });

  // - Users can see a random scrambled word when the page is first loaded or after users click the random button.
  // - Users can enter one letter at a time. After each attempt, the input should automatically focus on the next input if it exists.
  // - Users can see the number of wrong answers (tries) and which answers are wrong (mistakes).
  // - Users can regenerate a new scrambled word by selecting the random button.
  // - Users can reset all inputs, mistakes, and tries by selecting the reset button.
  // - When the number of tries or mistakes reaches 6, the game should be reset.
  // - When the user completes the game, it should show a '🎉 Success' alert.
  // - The page should be responsive on different screen sizes.
  // - Deploy the solution and submit Repository URL and Demo URL.
});
