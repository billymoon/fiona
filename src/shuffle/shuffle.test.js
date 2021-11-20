import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { it, run } from "https://deno.land/x/tincan/mod.ts";
import choose from "../choose/choose.js";
import Fiona from "../core/index.js";
import shuffle from "./shuffle.js";

Fiona.register(["choose", choose]);
Fiona.register(["shuffle", shuffle]);

it("Fiona.Shuffle", () => {
  assertEquals(Fiona(1).shuffle([1, 2, 3, 4, 5]), [2, 5, 1, 3, 4]);
  assertEquals(Fiona(1).shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), [
    4,
    9,
    8,
    3,
    7,
    10,
    6,
    1,
    2,
    5,
  ]);
});

it("Fiona.Shuffle (leave src array unmodified)", () => {
  const src = [1, 2, 3, 4, 5];
  const original = JSON.stringify(src);
  Fiona(1).shuffle(src);
  const afterwards = JSON.stringify(src);
  assertEquals(original, afterwards);
});

it("Fiona.Shuffle with qty", () => {
  assertEquals(Fiona(1).shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { qty: 3 }), [
    4,
    9,
    8,
  ]);
  assertEquals(
    Fiona(1).shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { qty: 0 }),
    [],
  );
});

run();
