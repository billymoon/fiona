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
    "non dolore reprehenderit aliquip mollit deserunt labore magna et exercitation cillum anim nulla pariatur nostrud",
  );
});

it("Fiona.Lorem (can specify approximately how many words)", () => {
  assertEquals(Fiona(1).lorem({ qty: 2 }), "non dolore");
});

it("Fiona.Lorem (sometimes starts lorem ipsum)", () => {
  assertEquals(Fiona(7).lorem({ qty: 2 }), "adipisicing commodo");
});

it("Fiona.Word", () => {
  assertEquals(Fiona(1).word(), "non");
  assertEquals(Fiona(2).word(), "culpa");
  assertEquals(Fiona(3).word(), "minim");
});

it("Fiona.Sentence", () => {
  assertEquals(
    Fiona(1).sentence(),
    "Non dolore reprehenderit aliquip mollit deserunt labore magna et exercitation cillum anim nulla pariatur nostrud do quis incididunt veniam cupidatat ad dolor qui consequat in.",
  );
});

it("Fiona.Paragraph", () => {
  assertEquals(
    Fiona(1).paragraph(),
    "Dolore reprehenderit ut mollit deserunt ut dolore labore exercitation esse anim fugiat nulla quis sed veniam cillum minim cupidatat enim ad qui commodo in adipisicing.  Ad laborum mollit aliqua nostrud esse est ut id velit dolor sunt sed dolor nulla veniam anim amet exercitation cupidatat quis tempor ullamco pariatur commodo.  Dolore excepteur eu enim dolor est anim qui minim tempor amet eiusmod mollit ullamco et officia exercitation in nulla aliquip commodo consequat adipisicing ad esse.  Sunt mollit dolore amet tempor ex minim fugiat ullamco esse nostrud ut dolore labore irure elit sint officia anim eiusmod magna id cillum dolor sit.",
  );
});

run();
