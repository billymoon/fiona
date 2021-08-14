import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import {
  beforeEach,
  describe,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../index.js";
import { Register, registered } from "./index.js";

describe("register", () => {
  let seeded;

  beforeEach(() => {
    seeded = Fiona("moon");
  });

  it("accepts named function as extension", () => {
    const zeroHundred = (seeded) => Math.round(seeded.random() * 100);
    Fiona.register(zeroHundred);
    assertEquals(seeded.zeroHundred(), 51);
  });

  it("exports register from index.js", () => {
    assertEquals(typeof Register, "function");
  });

  it("exports registered from index.js", () => {
    assertEquals(typeof registered, "object");
  });

  it("accepts multiple named functions as extensions", () => {
    const zeroHundred = (seeded) => Math.round(seeded.random() * 100);
    const zeroTwoHundred = (seeded) => Math.round(seeded.random() * 100);
    Fiona.register(zeroHundred, zeroTwoHundred);
    assertEquals(seeded.zeroHundred(), 51);
    assertEquals(seeded.zeroTwoHundred(), 43);
  });

  it("accepts name and function as extension", () => {
    Fiona.register([
      "zeroHundred",
      (seeded) => Math.round(seeded.random() * 100),
    ]);
    assertEquals(seeded.zeroHundred(), 51);
  });

  it("extension can be called as method on Fiona", () => {
    const zeroHundred = (seeded) => Math.round(seeded.random() * 100);
    Fiona.register(zeroHundred);
    assertEquals(Fiona.ZeroHundred()(seeded), 51);
  });

  it("plugin can is called with no arguments with no brackets", () => {
    const zeroHundred = (_seeded, arg) => typeof arg;
    Fiona.register(zeroHundred);
    assertEquals(seeded.object({ a: Fiona.ZeroHundred }), { a: "undefined" });
  });

  it(
    "extension can is called with no arguments with no brackets in string",
    () => {
      const zeroHundred = (_seeded, arg) => typeof arg;
      Fiona.register(zeroHundred);
      assertEquals(
        seeded.string`number ${Fiona.ZeroHundred}`,
        `number undefined`,
      );
    },
  );

  it("extension can is called with passed arguments in string", () => {
    const zeroHundred = (_seeded, arg) => typeof arg;
    Fiona.register(zeroHundred);
    assertEquals(
      seeded.string`number ${Fiona.ZeroHundred(1)}`,
      `number number`,
    );
  });
});

run();
