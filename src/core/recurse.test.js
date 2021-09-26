// TODO: move tests closer to relevant source code
import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { it, run } from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../index.js";
import recurseData from "./recurse.js";

const mockFactory = (fn) => {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    fn(...args);
  };
  mockFn.mock = { calls: [] };
  return mockFn;
};

it("javascript is javascript", () => {
  assertEquals(true + true, 2);
});

it("null and undefined return from the recursor as they are", () => {
  assertEquals(recurseData({}, null), null);
  assertEquals(recurseData({}), undefined);
});

it("array is recursed with functions and objects handled", () => {
  assertEquals(
    recurseData({
      info: () => ({ initseed: 1, path: [] }),
    }, [1, 2, [3, () => 4], { a: () => 1 }]),
    [1, 2, [3, 4], { a: 1 }],
  );
});

it("object is recursed with functions and arrays handled", () => {
  assertEquals(
    recurseData({
      info: () => ({ initseed: 1, path: [] }),
    }, { a: 1, b: [1, () => 2, 3] }),
    { a: 1, b: [1, 2, 3] },
  );
});

it("function is recursed with objects and arrays handled", () => {
  assertEquals(
    recurseData({
      info: () => ({ initseed: 1, path: [] }),
    }, () => ({ a: 1, b: [1, () => 2, 3] })),
    { a: 1, b: [1, 2, 3] },
  );
});

it("regex is expanded when regex function is registered", () => {
  const regex = /a/;
  const REGEX_RETURN_MOCK = 1234567890;
  assertEquals(
    recurseData({
      regex: () => REGEX_RETURN_MOCK,
    }, regex),
    REGEX_RETURN_MOCK,
  );
});

it("original regex is returned when regex function is not registered", () => {
  assertEquals(recurseData({}, /a/), /a/);
});

it("regex is handled when inside function", () => {
  const regex = /a/;
  assertEquals(
    recurseData({
      info: () => ({ initseed: 1, path: [] }),
    }, () => regex),
    regex,
  );
});

// it("Fiona.Number", () => {
//   assertEquals(Fiona(1).number(), 458333);
// });

// it("Fiona.Random", () => {
//   assertEquals(Fiona(1).random(), 0.4583325853842928);
// });

// it("Fiona.Array", () => {
//   assertEquals(Fiona(1).array(3, Fiona.Number), [349277, 89810, 57572]);
// });

// it("Fiona.String", () => {
//   assertEquals(
//     Fiona(1).string`${Fiona.Number} ${Fiona.Number} ${Fiona.Number}`,
//     `349277 89810 57572`,
//   );
// });

// it("Fiona.Object", () => {
//   assertEquals(
//     Fiona(1).object({
//       a: Fiona.Number,
//       b: Fiona.Number,
//       c: Fiona.Number,
//     }),
//     { a: 611259, b: 649633, c: 378387 },
//   );
// });

// it("original passed in object is left unchanged", () => {
//   const seeded = Fiona();
//   const b = { c: 3 };
//   const data = { a: () => 1, b };
//   const output = recurseData(seeded, data);
//   assertEquals(output, { a: 1, b: { c: 3 } });
//   assertEquals(typeof data.a, "function");
//   assertEquals(data.b, b);
// });

// it("functions should be evaluated and root set to top level evaluated function", () => {
//   const seeded = Fiona();
//   const a = { b: ({ data }) => assertEquals(data, a) };
//   recurseData(seeded, () => () => a);
//   const c = [({ data }) => assertEquals(data, c)];
//   recurseData(seeded, () => () => c);
// });

// it("anonymous functions", () => {
//   const seeded = Fiona();
//   const output = recurseData(seeded, {
//     a: () => 10,
//     b: (seeded) => seeded.data.a * 2,
//     c: () => (seeded) => seeded.data.b * 2 + 10,
//     d: () => () => ({ e: { f: () => () => 8 } }),
//     g: ({ data }) => data.d.e.f * 3,
//   });
//   assertEquals(output, { a: 10, b: 20, c: 50, d: { e: { f: 8 } }, g: 24 });
//   assertEquals(seeded.data, undefined);
// });

// it("Fiona.Fn", () => {
//   const fionaConstructor = Fiona().constructor;
//   const fionaNumber = mockFactory(Fiona.Number);
//   const fionaNumberInstance = mockFactory(Fiona.Number({ max: 10 }));
//   const factory = mockFactory(() => Fiona.Number);

//   Fiona(1).object(
//     {
//       a: fionaNumber,
//       b: fionaNumberInstance,
//       c: fionaNumber,
//       d: fionaNumber,
//       e: factory,
//       f: () => {
//         return () => {
//           return 123;
//         };
//       },
//       g: () => {
//         return 345;
//       },
//     },
//     {
//       g: fionaNumber,
//     },
//   );

//   assertEquals(fionaNumber.mock.calls.length, 4);
//   assertEquals(
//     fionaNumberInstance.mock.calls[0][0].constructor,
//     fionaConstructor,
//   );
//   assertEquals(fionaNumberInstance.mock.calls[0][1], undefined);

//   assertEquals(factory.mock.calls[0][0].constructor, fionaConstructor);
//   assertEquals(factory.mock.calls[0][1], undefined);

//   assertEquals(fionaNumber.mock.calls[0][0].constructor, fionaConstructor);
//   assertEquals(fionaNumber.mock.calls[0][1], undefined);

//   assertEquals(fionaNumber.mock.calls[1][0].constructor, fionaConstructor);
//   assertEquals(fionaNumber.mock.calls[1][1], undefined);

//   assertEquals(fionaNumber.mock.calls[3][0].constructor, fionaConstructor);
//   assertEquals(fionaNumber.mock.calls[3][1], undefined);
// });

run();
