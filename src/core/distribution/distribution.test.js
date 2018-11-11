/* global test expect describe beforeEach */

const Fiona = require("..");

describe("seeded.distribution", () => {
  let seeded;
  
  beforeEach(() => {
    seeded = Fiona("moon");
  });

  test("should have inert default distribution function", () => {
    expect(typeof seeded.distribution).toBe("function");
    expect(seeded.distribution(1)).toBe(1);
    expect(seeded.distribution(0.12345)).toBe(0.12345);
    expect(seeded.distribution(1e6)).toBe(1e6);
    expect(seeded.distribution("awesome")).toBe("awesome");
  });

  test("should set distribution function", () => {
    expect(seeded.distribution(5)).toBe(5);
    seeded.distribution(i => i * i);
    expect(seeded.distribution(5)).toBe(25);
  });

  test("should reset distribution function", () => {
    expect(seeded.distribution(5)).toBe(5);
    seeded.distribution(i => i * i);
    expect(seeded.distribution(5)).toBe(25);
    seeded.distribution(null);
    expect(seeded.distribution(5)).toBe(5);
  });
});
