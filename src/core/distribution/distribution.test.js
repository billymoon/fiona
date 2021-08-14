import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import {
  beforeEach,
  describe,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../index.js";

describe("distribution", () => {
  let seeded;

  beforeEach(() => {
    seeded = Fiona("moon");
  });

  it("should have inert default distribution function", () => {
    assertEquals(typeof seeded.distribution, "function");
    assertEquals(seeded.distribution(1), 1);
    assertEquals(seeded.distribution(0.12345), 0.12345);
    assertEquals(seeded.distribution(1e6), 1e6);
    assertEquals(seeded.distribution("awesome"), "awesome");
  });

  it("should set distribution function", () => {
    assertEquals(seeded.distribution(5), 5);
    seeded.distribution((i) => i * i);
    assertEquals(seeded.distribution(5), 25);
  });

  it("should reset distribution function", () => {
    assertEquals(seeded.distribution(5), 5);
    seeded.distribution((i) => i * i);
    assertEquals(seeded.distribution(5), 25);
    seeded.distribution(null);
    assertEquals(seeded.distribution(5), 5);
  });
});

run();
