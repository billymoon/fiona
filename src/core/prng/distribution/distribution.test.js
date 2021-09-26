import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { describe, it, run } from "https://deno.land/x/tincan/mod.ts";
import distribution from "./index.js";

describe("distribution", () => {
  it("should have inert default distribution function", () => {
    const dist = distribution();
    assertEquals(typeof dist, "function");
    assertEquals(dist(1), 1);
    assertEquals(dist(0.12345), 0.12345);
    assertEquals(dist(1e6), 1e6);
    assertEquals(dist("awesome"), "awesome");
  });

  it("should set distribution function", () => {
    const dist = distribution();
    assertEquals(dist(5), 5);
    dist((i) => i * i);
    assertEquals(dist(5), 25);
  });

  it("should reset distribution function", () => {
    const dist = distribution();
    assertEquals(dist(5), 5);
    dist((i) => i * i);
    assertEquals(dist(5), 25);
    dist(null);
    assertEquals(dist(5), 5);
  });
});

run();
