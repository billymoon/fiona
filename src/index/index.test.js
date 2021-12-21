import { describe, it, run } from "https://deno.land/x/tincan/mod.ts";
import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import Fiona from "../core/index.js";

import Index from "./index.js";

Fiona.register(["index", Index]);

describe("Fiona.Index", () => {
  it("returns the index in the current array", () => {
    assertEquals(
      Fiona(1).index(),
      undefined,
    );
    assertEquals(
      Fiona(1).object([Fiona.Index]),
      [0],
    );
    assertEquals(
      Fiona(1).object([Fiona.Index, (seeded) => seeded.index(), Fiona.Index]),
      [0, 1, 2],
    );
  });

  it("returns the index in the current array when nested", () => {
    assertEquals(
      Fiona(1).object({
        a: [Fiona.Index, (seeded) => seeded.index(), Fiona.Index],
      }),
      { a: [0, 1, 2] },
    );
  });
});

run();
