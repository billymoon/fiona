import { describe, it, run } from "https://deno.land/x/tincan/mod.ts";
import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import Fiona from "../core/index.js";

import Seed from "./seed.js";

Fiona.register(["seed", Seed]);

describe("Fiona.Seed", () => {
  it("returns the init seed", () => {
    assertEquals(
      Fiona(1).seed(),
      1,
    );
    assertEquals(
      Fiona(2).seed(),
      2,
    );
    assertEquals(
      Fiona("abc").seed(),
      "abc",
    );
  });
  it("returns the init seed when in nested object", () => {
    assertEquals(
      Fiona(1).object({ a: [(seeded) => seeded.seed()] }).a[0],
      1,
    );
    assertEquals(
      Fiona(2).object({ a: [Fiona.Seed] }).a[0],
      2,
    );
  });
});

run();
