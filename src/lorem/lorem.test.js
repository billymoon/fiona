import { it, run } from "https://deno.land/x/tincan/mod.ts";
import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import Fiona from "../core/index.js";

import choose from "../choose/choose.js";
import { lorem, paragraph, sentence, word } from "./lorem.js";

Fiona.register(["choose", choose]);
Fiona.register(["lorem", lorem]);
Fiona.register(["word", word]);
Fiona.register(["sentence", sentence]);
Fiona.register(["paragraph", paragraph]);

it("Fiona.Lorem", () => {
  assertEquals(
    Fiona(1).lorem(),
    "dolore reprehenderit ut mollit deserunt ut dolore labore exercitation esse anim fugiat nulla quis sed veniam cillum",
  );
});

it("Fiona.Lorem (can specify approximately how many words)", () => {
  assertEquals(Fiona(1).lorem({ qty: 2 }), "dolore reprehenderit");
});

it("Fiona.Lorem (sometimes starts lorem ipsum)", () => {
  assertEquals(Fiona(7).lorem({ qty: 2 }), "commodo do");
});

it("Fiona.Word", () => {
  assertEquals(Fiona(1).word(), "dolore");
  assertEquals(Fiona(2).word(), "occaecat");
  assertEquals(Fiona(3).word(), "consequat");
});

it("Fiona.Sentence", () => {
  assertEquals(
    Fiona(1).sentence(),
    "Dolore reprehenderit ut mollit deserunt ut dolore labore exercitation esse anim fugiat nulla quis sed veniam cillum minim cupidatat enim ad qui commodo in adipisicing irure dolor laborum id.",
  );
});

it("Fiona.Paragraph", () => {
  assertEquals(
    Fiona(1).paragraph(),
    "In nisi mollit deserunt incididunt et ut nostrud esse anim fugiat nulla veniam elit minim eiusmod ad occaecat ut cupidatat culpa ea in consectetur aute dolor laborum.  Veniam voluptate id eiusmod amet sit duis sunt est aliqua fugiat ut anim deserunt minim occaecat ad in dolor incididunt.  Lorem ipsum dolore excepteur eu enim dolor est anim qui minim tempor amet eiusmod mollit ullamco et officia exercitation in nulla aliquip commodo consequat adipisicing ad esse non magna id dolore ut veniam.  Dolore minim in enim incididunt do elit commodo ullamco pariatur officia mollit ad eiusmod id voluptate non deserunt consequat est.",
  );
});

run();
