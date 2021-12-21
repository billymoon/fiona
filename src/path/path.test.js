import { describe, it, run } from "https://deno.land/x/tincan/mod.ts";
import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import Fiona from "../core/index.js";

import Path from "./path.js";

Fiona.register(["path", Path]);

describe("Fiona.Path", () => {
  it("returns the path to the data item", () => {
    assertEquals(
      Fiona(1).path(),
      [],
    );
    assertEquals(
      Fiona(1).object([Fiona.Path]),
      [[0]],
    );
    assertEquals(
      Fiona(1).object([Fiona.Path, (seeded) => seeded.path(), Fiona.Path]),
      [[0], [1], [2]],
    );
    assertEquals(
      Fiona(1).object({ a: Fiona.Path }),
      { a: ["a"] },
    );
    assertEquals(
      Fiona(1).object({
        a: { b: Fiona.Path },
        c: Fiona.Path,
        d: [Fiona.Path, Fiona.Path],
        e: [[Fiona.Path, Fiona.Path]],
      }),
      {
        a: { b: ["a", "b"] },
        c: ["c"],
        d: [["d", 0], ["d", 1]],
        e: [[["e", 0, 0], ["e", 0, 1]]],
      },
    );
  });
});

run();
