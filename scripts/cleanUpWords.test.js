import { assert, describe, test } from "vitest";
import words from "../data/words.json";

const lettersOnly = /^[a-z]+$/;

describe("Test word.json", () => {
  test("All words have length 6", () => {
    assert(words.every((w) => w.length === 6));
  });

  test("All words only contain lowercase ascii letters", () => {
    assert(words.every((w) => lettersOnly.test(w)));
  });
});
