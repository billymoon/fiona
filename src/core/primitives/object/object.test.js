import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import {
  beforeEach,
  describe,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../../index.js";

const fixtures = {
  a: `{"a":0.9674615049583193}`,
  b: `{"a":{"b":0.5536784117825695}}`,
};

describe("object", () => {
  // TODO: test passing multiple arguments and executing functions to resolve objects
  let seeded;

  beforeEach(() => {
    seeded = Fiona("moon");
  });

  it("should return object", () => {
    assertEquals(typeof seeded.object({}), "object");
  });

  it("should return nested object", () => {
    const expected = JSON.stringify(seeded.object({ a: { b: 1 } }));
    const fixture = `{"a":{"b":1}}`;
    assertEquals(expected, fixture);
  });

  it("should return handled function", () => {
    const expected = JSON.stringify(seeded.object({ a: () => 1 }));
    const fixture = `{"a":1}`;
    assertEquals(expected, fixture);
  });

  it("should return handled function with seeded value", () => {
    const expected = JSON.stringify(
      seeded.object({ a: (seeded) => seeded.random() }),
    );
    assertEquals(expected, fixtures.a);
  });

  it("should handle functions with recursion", () => {
    const expected = JSON.stringify(
      seeded.object({ a: () => (seeded) => seeded.random() }),
    );
    assertEquals(expected, fixtures.a);
  });

  it("should handle deeply nested object with function property", () => {
    const expected = JSON.stringify(
      seeded.object({ a: { b: (seeded) => seeded.random() } }),
    );
    assertEquals(expected, fixtures.b);
  });

  // TODO: can we provide position another way..?
  // it('should call function with current position', () => {
  //   const expected = JSON.stringify(seeded.object({ a: ({ position }) => position }))
  //   const fixture = `{"a":"root.a"}`
  //   assertEquals(expected, fixture)
  // })

  // it('should call function with current position with recursion', () => {
  //   const expected = JSON.stringify(seeded.object({ a: ({ position }) => position }))
  //   const fixture = `{"a":"root.a"}`
  //   assertEquals(expected, fixture)
  // })

  // it('should call function with current position on deeply nested object', () => {
  //   const expected = JSON.stringify(seeded.object({ a: { b: ({ position }) => position } }))
  //   const fixture = `{"a":{"b":"root.a.b"}}`
  //   assertEquals(expected, fixture)
  // })

  // it('should throw when non object passed', () => {
  //   [[], /a/, () => {}, 1, true, false, ''].forEach(item => {
  //     assertEquals(() => {
  //       seeded.object(item)
  //     }).toThrow('arguments of Fiona.Object must be an Object or function that returns an Object')
  //   })
  // })

  it("should handle array", () => {
    const expected = JSON.stringify(seeded.object({ a: [1, 2, 3] }));
    const fixture = `{"a":[1,2,3]}`;
    assertEquals(expected, fixture);
  });

  it("should handle array with undefined values", () => {
    const expected = JSON.stringify(seeded.object({ a: [1, undefined, 3] }));
    const fixture = `{"a":[1,null,3]}`;
    assertEquals(expected, fixture);
  });

  it(
    "should handle complex nested objects with arrays and functions",
    () => {
      const expected = JSON.stringify(
        seeded.object({
          a: () => [
            0,
            1,
            undefined,
            3,
            () => () => Fiona.Random,
            {
              b: () => ["b0", "b1", "b2", () => "b3", () => Fiona.Random],
            },
            [6, 7, () => Fiona.Random],
          ],
        }),
      );
      const fixture =
        `{"a":[0,1,null,3,0.8320001027695835,{"b":["b0","b1","b2","b3",0.8808325561139885]},[6,7,0.17345323654518147]]}`;
      assertEquals(expected, fixture);
    },
  );

  it("should execute plugins defined as Fiona.MyPlugin()", () => {
    const expected = JSON.stringify(seeded.object({ a: Fiona.Random() }));
    const fixture = fixtures.a;
    assertEquals(expected, fixture);
  });

  it("should execute plugins defined as Fiona.MyPlugin (Random)", () => {
    const expected = JSON.stringify(seeded.object({ a: Fiona.Random }));
    const fixture = fixtures.a;
    assertEquals(expected, fixture);
  });

  it("should execute plugins defined as Fiona.MyPlugin (Number)", () => {
    const expected = JSON.stringify(seeded.object({ a: Fiona.Number }));
    const fixture = `{"a":967462}`;
    assertEquals(expected, fixture);
  });

  it(
    "should execute plugins defined as Fiona.MyPlugin({ argument: 1 })",
    () => {
      const expected = JSON.stringify(
        seeded.object({ a: Fiona.Number({ precision: -3 }) }),
      );
      const fixture = `{"a":967000}`;
      assertEquals(expected, fixture);
    },
  );

  // it('should call functions with parent seeded instance', () => {
  //   const expected = JSON.stringify(seeded.object({ a: ({ parent, seeded }) => [parent.info().initseed, seeded.info().initseed, seeded.object({ b: ({ parent, seeded })  => [parent.info().initseed, seeded.info().initseed] })] }))
  //   const fixture = `{"a":790000}`
  //   assertEquals(expected, fixture)
  // })
});

run();
