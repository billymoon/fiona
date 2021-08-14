import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import {
  beforeEach,
  describe,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../../index.js";

describe("string", () => {
  let seeded;

  beforeEach(() => {
    seeded = Fiona("moon");
  });

  it("template literal", () => {
    assertEquals(seeded.string`a`, "a");
  });

  it("template literal with expression", () => {
    assertEquals(seeded.string`a ${"b"} c`, "a b c");
  });

  it("template literal with function expression", () => {
    assertEquals(
      seeded.string`a ${(seeded) => seeded.random()} c`,
      "a 0.9234358602778222 c",
    );
  });

  it("plugin produces same variables as array", () => {
    const output = seeded.string`${(seeded) => seeded.random()}:${(seeded) =>
      seeded.random()}:${(seeded) => seeded.random()}:${(seeded) =>
      seeded.random()}`;
    const fixture = seeded
      .object([
        (seeded) => seeded.random(),
        (seeded) => seeded.random(),
        (seeded) => seeded.random(),
        (seeded) => seeded.random(),
      ])
      .join(":");
    assertEquals(output, fixture);
  });

  it("plugin can be called as method on Fiona", () => {
    assertEquals(seeded.string`a ${() => `b`} c ${() => `d`} e`, "a b c d e");
  });
});

run();
