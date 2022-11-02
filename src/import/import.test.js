import { it, run } from "https://deno.land/x/tincan/mod.ts";
import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import Fiona from "../core/index.js";

import importer from "./import.js";

Fiona.register(["import", importer]);

it("Fiona.Import", () => {
  assertEquals(
    Fiona(1).import({ fiona: "number" }),
    313150,
  );
});

it("Fiona.Import handles objects", () => {
  assertEquals(
    Fiona(1).import({ x: { fiona: "number" }, y: { fiona: "random" } }),
    { x: 27912, y: 0.2704298972480138 },
  );
});

it("Fiona.Import handles null and undefined as object property", () => {
  assertEquals(
    Fiona(1).import({ x: null, y: { fiona: "random" }, z: undefined }),
    { x: null, y: 0.2704298972480138, z: undefined },
  );
});

it("Fiona.Import handles arrays", () => {
  assertEquals(
    Fiona(1).import([{ fiona: "number" }, { fiona: "random" }]),
    [780196, 0.9211525409115258],
  );
});

it("Fiona.Import handles nested structures", () => {
  assertEquals(
    Fiona(1).import([{ fiona: "number" }, {
      a: { fiona: "random" },
      b: [{ fiona: "random" }, { fiona: "random" }],
    }]),
    [780196, {
      a: 0.027518253320603748,
      b: [0.8313489816297539, 0.6102302417206719],
    }],
  );
});

it("Fiona.Import handles Fiona.Array", () => {
  assertEquals(
    Fiona(1).import({ fiona: ["array", 5, { fiona: "number" }] }),
    [780196, 921153, 560126, 954658, 513373],
  );
  assertEquals(
    Fiona(1).import({ fiona: ["array", 5, { x: { fiona: "number" } }] }),
    [{ x: 942493 }, { x: 235536 }, { x: 467667 }, { x: 517838 }, { x: 609799 }],
  );
});

it("Fiona.Import handles custom registered functions", () => {
  Fiona.register(["customimportFunction", () => 123]);

  assertEquals(
    Fiona(1).import({ fiona: "customimportFunction" }),
    123,
  );
});

run();
