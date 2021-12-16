import { it, run } from "https://deno.land/x/tincan/mod.ts";
import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import Fiona from "../core/index.js";

import fromJSON from "../fromJSON/fromJSON.js";

Fiona.register(["fromJSON", fromJSON]);

it("Fiona.FromJSON", () => {
  assertEquals(
    Fiona(1).fromJSON({ fiona: "number" }),
    313150,
  );
});

it("Fiona.FromJSON handles objects", () => {
  assertEquals(
    Fiona(1).fromJSON({ x: { fiona: "number" }, y: { fiona: "random" } }),
    { x: 27912, y: 0.2704298972480138 },
  );
});

it("Fiona.FromJSON handles arrays", () => {
  assertEquals(
    Fiona(1).fromJSON([{ fiona: "number" }, { fiona: "random" }]),
    [780196, 0.9211525409115258],
  );
});

it("Fiona.FromJSON handles nested structures", () => {
  assertEquals(
    Fiona(1).fromJSON([{ fiona: "number" }, {
      a: { fiona: "random" },
      b: [{ fiona: "random" }, { fiona: "random" }],
    }]),
    [780196, {
      a: 0.027518253320603748,
      b: [0.8313489816297539, 0.6102302417206719],
    }],
  );
});

it("Fiona.FromJSON handles Fiona.Array", () => {
  assertEquals(
    Fiona(1).fromJSON({ fiona: ["array", 5, { fiona: "number" }] }),
    [780196, 921153, 560126, 954658, 513373],
  );
  assertEquals(
    Fiona(1).fromJSON({ fiona: ["array", 5, { x: { fiona: "number" } }] }),
    [{ x: 942493 }, { x: 235536 }, { x: 467667 }, { x: 517838 }, { x: 609799 }],
  );
});

it("Fiona.FromJSON handles custom registered functions", () => {
  Fiona.register(["customFromJsonFunction", () => 123]);

  assertEquals(
    Fiona(1).fromJSON({ fiona: "customFromJsonFunction" }),
    123,
  );
});

run();
