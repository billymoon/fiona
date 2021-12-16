import { describe, it, run } from "https://deno.land/x/tincan/mod.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.103.0/testing/asserts.ts";
import Fiona from "../core/index.js";

import Unique from "./unique.js";

Fiona.register(["unique", Unique]);

describe("Fiona.Unique", () => {
  it("asserts that duplicates appear in array", () => {
    assertEquals(
      Fiona(1).array(5, Fiona.Number({ min: 1, max: 10 })),
      [8, 10, 6, 10, 6],
    );
  });
  it("asserts that calling unique removes duplicates", () => {
    assertEquals(
      Fiona(1).unique(5, Fiona.Number({ min: 1, max: 10 })),
      [8, 10, 6, 1, 7],
    );
  });

  it("asserts that setting limit less than duplicates throws error", () => {
    assertThrows(
      () =>
        Fiona(1).unique(5, Fiona.Number({ min: 1, max: 10 }), {
          duplicateLimit: 1,
        }),
      Error,
      "Too many duplicates",
    );
  });

  it("asserts that setting limit as a function returning a number less than duplicates throws error", () => {
    assertThrows(
      () =>
        Fiona(1).unique(5, Fiona.Number({ min: 1, max: 10 }), {
          duplicateLimit: () => 1,
        }),
      Error,
      "Too many duplicates",
    );
  });
});

describe("Fiona.Unique comparator", () => {
  it("asserts that duplicates appear in array", () => {
    assertEquals(
      Fiona(2).array(5, Fiona.Object({ x: Fiona.Number({ min: 1, max: 10 }) })),
      [{ x: 1 }, { x: 2 }, { x: 2 }, { x: 4 }, { x: 5 }],
    );
  });
  it("asserts that calling unique WITHOUT comparator for complex object DOES NOT remove duplicates", () => {
    assertEquals(
      Fiona(2).unique(
        5,
        Fiona.Object({ x: Fiona.Number({ min: 1, max: 10 }) }),
      ),
      [{ x: 1 }, { x: 2 }, { x: 2 }, { x: 4 }, { x: 5 }],
    );
  });
  it("asserts that calling unique WITH comparator for complex object DOES remove duplicates", () => {
    assertEquals(
      Fiona(2).unique(
        5,
        Fiona.Object({ x: Fiona.Number({ min: 1, max: 10 }) }),
        { comparator: (a, b) => a.x === b.x },
      ),
      [{ x: 1 }, { x: 2 }, { x: 4 }, { x: 5 }, { x: 10 }],
    );
  });
});

it("respects qty as min/max object", () => {
  assertEquals(
    Fiona(1).unique({ min: 1, max: 15 }, Fiona.Number({ min: 1, max: 10 })),
    [8, 10, 6, 1, 7],
  );
});

run();
