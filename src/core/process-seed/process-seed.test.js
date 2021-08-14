import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { it } from "https://deno.land/x/tincan/mod.ts";
import processSeed from "./index.js";

it("process-seed passes number back", () => {
  assertEquals(processSeed(1), 1);
  assertEquals(processSeed(1e6), 1e6);
  assertEquals(processSeed(1e32), 1e32);
});

it("process-seed converts string to integer", () => {
  assertEquals(processSeed("1"), 49);
  assertEquals(processSeed("2"), 50);
  assertEquals(processSeed("abc"), 2423384358);
  assertEquals(processSeed("abcdefghijklmnopqrstuvwxyz"), -261981256238);
  assertEquals(processSeed("moon"), -16743999484);
});
