/* global test expect describe beforeEach */

const fiona = require("..");

describe("fiona.register", () => {
  let seeded;

  beforeEach(() => {
    seeded = fiona("moon");
  });

  test("accepts named function as extension", () => {
    const zeroHundred = seeded => Math.round(seeded.random() * 100);
    fiona.register(zeroHundred);
    expect(seeded.zeroHundred()).toBe(51);
  });

  test("accepts multiple named functions as extensions", () => {
    const zeroHundred = seeded => Math.round(seeded.random() * 100);
    const zeroTwoHundred = seeded => Math.round(seeded.random() * 100);
    fiona.register(zeroHundred, zeroTwoHundred);
    expect(seeded.zeroHundred()).toBe(51);
    expect(seeded.zeroTwoHundred()).toBe(43);
  });

  test("accepts name and function as extension", () => {
    fiona.register([
      "zeroHundred",
      seeded => Math.round(seeded.random() * 100)
    ]);
    expect(seeded.zeroHundred()).toBe(51);
  });

  test("extension can be called as method on fiona", () => {
    const zeroHundred = seeded => Math.round(seeded.random() * 100);
    fiona.register(zeroHundred);
    expect(fiona.ZeroHundred()(seeded)).toBe(51);
  });

  test("plugin can is called with no arguments with no brackets", () => {
    const zeroHundred = (seeded, arg) => typeof arg;
    fiona.register(zeroHundred);
    expect(seeded.object({ a: fiona.ZeroHundred })).toEqual({ a: "undefined" });
  });

  test("extension can is called with no arguments with no brackets in string", () => {
    const zeroHundred = (seeded, arg) => typeof arg;
    fiona.register(zeroHundred);
    expect(seeded.string`number ${fiona.ZeroHundred}`).toEqual(
      `number undefined`
    );
  });

  test("extension can is called with passed arguments in string", () => {
    const zeroHundred = (seeded, arg) => typeof arg;
    fiona.register(zeroHundred);
    expect(seeded.string`number ${fiona.ZeroHundred(1)}`).toEqual(
      `number number`
    );
  });
});
