import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import {
  beforeEach,
  describe,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../../index.js";

const fixtures = [434608, 685941, 418669, 134900, 489729];

describe("array", () => {
  let seeded;

  beforeEach(() => {
    seeded = Fiona("moon");
  });

  it("returns array", () => {
    assertEquals(seeded.array(5, 1), [1, 1, 1, 1, 1]);
  });

  it("recurses array", () => {
    assertEquals(
      seeded.array(5, (seeded) => seeded.number()),
      fixtures,
    );
  });

  it("recurses array with bar Fiona.Plugin syntax", () => {
    assertEquals(seeded.array(5, Fiona.Number), fixtures);
  });

  it("accepts max/min arguments", () => {
    assertEquals(
      seeded.array({ min: 2, max: 4 }, Fiona.Number),
      fixtures.slice(0, 3),
    );
  });

  it("uses passed processor", () => {
    assertEquals(
      seeded.array(5, Fiona.Number, (i) => i.map((j) => j / 100)),
      fixtures.map((j) => j / 100),
    );
  });

  it("joins array if passed string as processor", () => {
    assertEquals(seeded.array(5, Fiona.Number, ":"), fixtures.join(":"));
  });
});

run();
