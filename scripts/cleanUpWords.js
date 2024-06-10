import fs from "fs";

const data = fs.readFileSync("./data/words.txt", {
  encoding: "utf8",
  flag: "r",
});

const lettersOnly = /^[a-z]+$/;
const splitLines = /\r?\n/;

const list = data
  .split(splitLines)
  .map((w) => w.toLowerCase())
  .filter((w) => w.length === 6 && lettersOnly.test(w));

fs.writeFileSync("./data/words.json", JSON.stringify(list), {
  encoding: "utf8",
  flag: "w",
});
