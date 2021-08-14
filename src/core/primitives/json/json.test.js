import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import {
  beforeEach,
  describe,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../../index.js";

describe("json", () => {
  let seeded;

  beforeEach(() => {
    seeded = Fiona("moon");
  });

  it("should add json method which returns json of seeded.value", () => {
    const fixture = `{"a":1,"b":2}`;
    const expected = seeded.json({ a: 1, b: 2 });
    assertEquals(expected, fixture);
  });

  // // TODO: is there a way to format json, perhaps duck-typing first argument - seems at odds with object taking no non-data arguments
  // it('json method should accept indentation argument', () => {
  //   const fixture = `{\n  "a": 1,\n  "b": 2\n}`
  //   const expected = seeded.json({ a: 1, b: 2 }, null, 2)
  //   expect(expected).toBe(fixture)
  // })
});

run();
