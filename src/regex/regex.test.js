import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { it, run } from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../core/index.js";
import RandExp from "http://esm.sh/randexp";
import Regex from "./regex.js";

Fiona.register(["regex", Regex(RandExp)]);

it("sanity", () => {
  assertEquals(true + true, 2);
});

it("import", () => {
  assertEquals(typeof Fiona, "function");
});

it("Fiona.Regex", () => {
  assertEquals(Fiona(1).regex(/[0-1]{8} (cy|ro)bo(t|rg)s/), "11010001 robots");
});

it("Fiona.Regex (with no arguments)", () => {
  assertEquals(Fiona(1).regex(), "34A7CFE87F5EFD77");
});

run();
