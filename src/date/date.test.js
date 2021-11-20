import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { it, run } from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../core/index.js";
import date from "./date.js";

Fiona.register(["date", date]);

it("Fiona.Date", () => {
  assertEquals(Fiona(1).date(), "1958-10-15");
  assertEquals(Fiona(1).date({ min: "1980-01-01" }), "1986-04-06");
  assertEquals(
    Fiona(1).date({ min: "1980-01-01", max: "1981-03-22" }),
    "1980-05-19",
  );
});

it("Fiona.Date (long)", () => {
  assertEquals(Fiona(1).date({ long: true }), "1958-10-15T16:14:44.333Z");
});

it("Fiona.Date (throws when min > max)", () => {
  assertThrows(() => Fiona(1).date({ min: "1980-01-01", max: "1979-01-01" }));
});

run();
