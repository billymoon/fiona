import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import {
  beforeEach,
  describe,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../../index.js";

const fixtures = [333516, 198263, 622611];

describe("number", () => {
  let seeded;

  beforeEach(() => {
    seeded = Fiona("moon");
  });

  it("plugin can be called as method on fiona", () => {
    assertEquals(seeded.number(), fixtures[0]);
    assertEquals(seeded.number(), fixtures[1]);
    assertEquals(seeded.number(), fixtures[2]);
  });

  it("plugin can be called as method on Fiona", () => {
    assertEquals(Fiona.Number()(seeded), fixtures[0]);
    assertEquals(Fiona.Number()(seeded), fixtures[1]);
    assertEquals(Fiona.Number()(seeded), fixtures[2]);
  });

  it("plugin to give expected outputs with arguments set", () => {
    assertEquals(Fiona("moon").number(), fixtures[0]);
    assertEquals(Fiona("moon").number({ min: 500000 }), 666758);
    assertEquals(
      Fiona("moon").number({ min: 500000, precision: 3 }),
      666758.492,
    );
    assertEquals(Fiona("moon").number({ min: 500000, precision: -3 }), 666000);
    assertEquals(
      Fiona("moon").number({ min: 500000, precision: null }),
      666758,
    );
    assertEquals(Fiona("moon").number({ max: 100 }), 33);
    assertEquals(Fiona("moon").number({ min: 90, max: 100 }), 93);
  });
});

run();
