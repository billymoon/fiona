import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import {
  afterEach,
  beforeEach,
  describe,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";
import { spy } from "https://deno.land/x/mock@0.10.1/stub.ts";

import { Register } from "./index.js";

describe("register", () => {
  it("returns function", () => {
    assertEquals(typeof Register(), "function");
  });

  describe("registers name", () => {
    let stubbedRegisterFactory;
    let stubbedRegisterMethod;

    beforeEach(() => {
      stubbedRegisterFactory = spy();
      stubbedRegisterMethod = spy();
    });

    it("register function calls factory functions", () => {
      const register = Register(stubbedRegisterFactory, stubbedRegisterMethod);
      assertEquals(stubbedRegisterFactory.calls.length, 0);
      assertEquals(stubbedRegisterMethod.calls.length, 0);
      register(function namedFunction() {});
      assertEquals(stubbedRegisterFactory.calls.length, 1);
      assertEquals(stubbedRegisterMethod.calls.length, 1);
      assertEquals(stubbedRegisterFactory.calls[0].args[0], "NamedFunction");
      assertEquals(stubbedRegisterMethod.calls[0].args[0], "namedFunction");
    });

    it("returned function registers extension on registered object", () => {
      const register = Register(stubbedRegisterFactory, stubbedRegisterMethod);
      assertEquals(stubbedRegisterFactory.calls.length, 0);
      assertEquals(stubbedRegisterMethod.calls.length, 0);
      const variableFunction = () => {};
      register(variableFunction);
      assertEquals(stubbedRegisterFactory.calls.length, 1);
      assertEquals(stubbedRegisterMethod.calls.length, 1);
      assertEquals(stubbedRegisterFactory.calls[0].args[0], "VariableFunction");
      assertEquals(stubbedRegisterMethod.calls[0].args[0], "variableFunction");
    });

    it("returned function registers extension on registered object", () => {
      const register = Register(stubbedRegisterFactory, stubbedRegisterMethod);
      assertEquals(stubbedRegisterFactory.calls.length, 0);
      assertEquals(stubbedRegisterMethod.calls.length, 0);
      register(["arrayFunction", () => {}]);
      assertEquals(stubbedRegisterFactory.calls.length, 1);
      assertEquals(stubbedRegisterMethod.calls.length, 1);
      assertEquals(stubbedRegisterFactory.calls[0].args[0], "ArrayFunction");
      assertEquals(stubbedRegisterMethod.calls[0].args[0], "arrayFunction");
    });

    it("returned function registers extension on registered object", () => {
      const register = Register(stubbedRegisterFactory, stubbedRegisterMethod);
      assertEquals(stubbedRegisterFactory.calls.length, 0);
      assertEquals(stubbedRegisterMethod.calls.length, 0);
      const variableFunction = () => {};
      register(
        ["arrayFunction", () => {}],
        function namedFunction() {},
        variableFunction,
      );
      assertEquals(stubbedRegisterFactory.calls.length, 3);
      assertEquals(stubbedRegisterMethod.calls.length, 3);
      assertEquals(stubbedRegisterFactory.calls[0].args[0], "ArrayFunction");
      assertEquals(stubbedRegisterFactory.calls[1].args[0], "NamedFunction");
      assertEquals(stubbedRegisterFactory.calls[2].args[0], "VariableFunction");
      assertEquals(stubbedRegisterMethod.calls[0].args[0], "arrayFunction");
      assertEquals(stubbedRegisterMethod.calls[1].args[0], "namedFunction");
      assertEquals(stubbedRegisterMethod.calls[2].args[0], "variableFunction");
    });
  });

  // it("accepts named function as extension", () => {
  //   const zeroHundred = (seeded) => Math.round(seeded.random() * 100);
  //   Fiona.register(zeroHundred);
  //   assertEquals(seeded.zeroHundred(), 51);
  // });

  // it("exports register from index.js", () => {
  //   assertEquals(typeof Register, "function");
  // });

  // it("exports registered from index.js", () => {
  //   assertEquals(typeof registered, "object");
  // });

  // it("accepts multiple named functions as extensions", () => {
  //   const zeroHundred = (seeded) => Math.round(seeded.random() * 100);
  //   const zeroTwoHundred = (seeded) => Math.round(seeded.random() * 100);
  //   Fiona.register(zeroHundred, zeroTwoHundred);
  //   assertEquals(seeded.zeroHundred(), 51);
  //   assertEquals(seeded.zeroTwoHundred(), 43);
  // });

  // it("accepts name and function as extension", () => {
  //   Fiona.register([
  //     "zeroHundred",
  //     (seeded) => Math.round(seeded.random() * 100),
  //   ]);
  //   assertEquals(seeded.zeroHundred(), 51);
  // });

  // it("extension can be called as method on Fiona", () => {
  //   const zeroHundred = (seeded) => Math.round(seeded.random() * 100);
  //   Fiona.register(zeroHundred);
  //   assertEquals(Fiona.ZeroHundred()(seeded), 51);
  // });

  // it("plugin can is called with no arguments with no brackets", () => {
  //   const zeroHundred = (_seeded, arg) => typeof arg;
  //   Fiona.register(zeroHundred);
  //   assertEquals(seeded.object({ a: Fiona.ZeroHundred }), { a: "undefined" });
  // });

  // it(
  //   "extension can is called with no arguments with no brackets in string",
  //   () => {
  //     const zeroHundred = (_seeded, arg) => typeof arg;
  //     Fiona.register(zeroHundred);
  //     assertEquals(
  //       seeded.string`number ${Fiona.ZeroHundred}`,
  //       `number undefined`,
  //     );
  //   },
  // );

  // it("extension can is called with passed arguments in string", () => {
  //   const zeroHundred = (_seeded, arg) => typeof arg;
  //   Fiona.register(zeroHundred);
  //   assertEquals(
  //     seeded.string`number ${Fiona.ZeroHundred(1)}`,
  //     `number number`,
  //   );
  // });
});

run();
