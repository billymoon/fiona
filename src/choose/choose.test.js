import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { it, run } from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../core/index.js";
import choose from "./choose.js";

Fiona.register(["choose", choose]);

it("Fiona.Choose", () => {
  const baby = Fiona(1);
  const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  assertEquals(baby.choose(3, oneToTen), [4, 9, 8]);
  assertEquals(baby.choose(3, oneToTen), [6, 5, 10]);
  assertEquals(baby.choose(3, oneToTen), [10, 2, 4]);
  assertEquals(baby.choose(11, oneToTen), [
    1,
    4,
    7,
    10,
    8,
    9,
    3,
    5,
    6,
    2,
    undefined,
  ]);
  baby.reset();
  assertEquals(baby.choose(3, oneToTen, { weights: [10, 5, 1] }), [1, 6, 4]);
  baby.reset();
  assertEquals(baby.choose(3, oneToTen, { weights: [10, 5, ""] }), [1, 6, 4]);
  baby.reset();
  assertEquals(baby.choose(3, oneToTen, { weights: [10] }), [1, 7, 5]);
  baby.reset();
  assertEquals(baby.choose(3, oneToTen, { weights: [10, 1] }), [1, 7, 5]);
  baby.reset().distribution((i) => i * i * i);
  assertEquals(baby.choose(3, oneToTen), [1, 6, 5]);
  assertEquals(baby.choose(3, oneToTen), [2, 1, 9]);
  assertEquals(baby.choose(3, oneToTen), [8, 2, 3]);
  assertEquals(baby.choose(11, oneToTen), [
    1,
    2,
    4,
    9,
    6,
    7,
    5,
    8,
    3,
    10,
    undefined,
  ]);
  assertEquals(baby.choose(null, oneToTen), []);
  assertEquals(baby.choose(0, oneToTen), []);
});

run();
