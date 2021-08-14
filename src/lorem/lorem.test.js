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
    "velit consectetur proident et ullamco exercitation deserunt culpa ut excepteur laboris ex nostrud in sit",
  );
});

it("Fiona.Lorem (can specify approximately how many words)", () => {
  assertEquals(Fiona(1).lorem({ qty: 2 }), "velit consectetur");
});

it("Fiona.Lorem (sometimes starts lorem ipsum)", () => {
  assertEquals(Fiona(7).lorem({ qty: 2 }), "lorem ipsum proident id");
});

it("Fiona.Word", () => {
  assertEquals(Fiona(1).word(), "velit");
  assertEquals(Fiona(2).word(), "eiusmod");
  assertEquals(Fiona(3).word(), "nulla");
});

it("Fiona.Sentence", () => {
  assertEquals(
    Fiona(1).sentence(),
    "Velit consectetur proident et ullamco exercitation deserunt culpa ut excepteur laboris ex nostrud in sit in aliqua ad commodo non mollit esse eiusmod enim occaecat sunt.",
  );
});

it("Fiona.Paragraph", () => {
  assertEquals(
    Fiona(1).paragraph(),
    "Amet proident labore ullamco nostrud deserunt in nisi excepteur laboris aliquip adipisicing sunt sed reprehenderit magna enim ea non mollit velit do ut occaecat dolor fugiat aliqua.  Pariatur esse laboris amet laborum adipisicing proident ut mollit consectetur sunt in sed aute consequat excepteur magna sint aliquip ullamco elit qui sit in eu nostrud id dolore do.  Duis mollit deserunt in aliqua velit exercitation ullamco pariatur nostrud sit veniam aute culpa ea ex occaecat reprehenderit commodo esse voluptate ut magna minim consectetur in incididunt qui elit excepteur amet.  Lorem ipsum nostrud in pariatur fugiat voluptate dolor ut proident laborum quis tempor qui nisi duis consequat eu dolor minim elit cillum aliquip aliqua ad.  Est incididunt sint dolore fugiat consectetur proident aliquip pariatur nulla deserunt ea exercitation labore esse sunt occaecat aliqua anim nostrud magna dolore culpa in voluptate velit sit cupidatat in quis.",
  );
});

run();
