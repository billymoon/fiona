import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { it, run } from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../core/index.js";
import choose from "./choose.js";

Fiona.register(["choose", choose]);

it("Fiona.Choose", () => {
  const baby = Fiona(1);
  const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  assertEquals(baby.choose(3, oneToTen), [5, 7, 8]);
  assertEquals(baby.choose(3, oneToTen), [1, 9, 4]);
  assertEquals(baby.choose(3, oneToTen), [4, 1, 10]);
  assertEquals(baby.choose(11, oneToTen), [
    9,
    5,
    8,
    6,
    7,
    2,
    10,
    4,
    1,
    3,
    undefined,
  ]);
  baby.reset();
  assertEquals(baby.choose(3, oneToTen, { weights: [10, 5, 1] }), [2, 3, 4]);
  baby.reset();
  assertEquals(baby.choose(3, oneToTen, { weights: [10, 5, ""] }), [2, 3, 4]);
  baby.reset();
  assertEquals(baby.choose(3, oneToTen, { weights: [10] }), [1, 3, 4]);
  baby.reset();
  assertEquals(baby.choose(3, oneToTen, { weights: [10, 1] }), [1, 3, 4]);
  baby.reset().distribution((i) => i * i * i);
  assertEquals(baby.choose(3, oneToTen), [1, 3, 5]);
  assertEquals(baby.choose(3, oneToTen), [1, 7, 3]);
  assertEquals(baby.choose(3, oneToTen), [1, 2, 8]);
  assertEquals(baby.choose(11, oneToTen), [
    7,
    2,
    5,
    4,
    3,
    6,
    9,
    1,
    8,
    10,
    undefined,
  ]);
  assertEquals(baby.choose(null, oneToTen), []);
  assertEquals(baby.choose(0, oneToTen), []);
});

run();
