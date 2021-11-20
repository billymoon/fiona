import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { it, run } from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../core/index.js";
import bool from "./bool.js";

Fiona.register(["bool", bool]);

it("Fiona.Bool", () => {
  assertEquals(Fiona(1).bool(), true);
  assertEquals(Fiona(2).bool(), true);
  assertEquals(Fiona(3).bool(), false);
});

it("Fiona.Bool (chance)", () => {
  assertEquals(Fiona(1).bool(), true);
  assertEquals(Fiona(1).bool({ chance: 0.25 }), false);
  assertEquals(Fiona(3).bool(), false);
  assertEquals(Fiona(3).bool({ chance: 0.75 }), true);
});

run();
