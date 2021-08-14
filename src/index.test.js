import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import Fiona from "./deno/index.js";

Deno.test("registers extensions to Fiona", () => {
  assertEquals(
    Object.keys(Fiona).sort(),
    [
      "version",
      "register",
      "Random",
      "Clone",
      "Number",
      "Object",
      "Json",
      "String",
      "Array",
      "Bool",
      "Choose",
      "OneOf",
      "Date",
      "Img",
      "Duplicable",
      "Lorem",
      "Word",
      "Sentence",
      "Paragraph",
      "Gender",
      "Title",
      "Firstname",
      "Firstnames",
      "Surname",
      "Fullname",
      "Regex",
      "Shuffle",
      "namedata",
    ].sort(),
  );
});
