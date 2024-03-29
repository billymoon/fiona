import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import {
  beforeEach,
  describe,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";
import RandExp from "http://esm.sh/randexp";
import RegexPlugin from "../../../regex/regex.js";
import Fiona from "../../index.js";

describe("regex", () => {
  let seeded;

  beforeEach(() => {
    seeded = Fiona("moon");
  });

  it("should passthrough regex if plugin not registered", () => {
    const pattern = /of [01]{8} (ro|cy)bo(rg|t)s/;
    assertEquals(seeded.object({ army: pattern }), { army: pattern });
  });

  it("should handle regex if plugin registered", () => {
    Fiona.register(["regex", RegexPlugin(RandExp)]);
    const pattern = /of [01]{8} (ro|cy)bo(rg|t)s/;
    const fixture = { army: "of 01010110 robots" };
    assertEquals(seeded.object({ army: pattern }), fixture);
  });

  it(
    "should handle regex if plugin registered (with no arguments)",
    () => {
      assertEquals(Fiona(1).regex(), "643088BCBE3844CA");
    },
  );
});

run();
