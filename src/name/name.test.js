import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { it, run } from "https://deno.land/x/tincan/mod.ts";
import bool from "../bool/bool.js";
import choose from "../choose/choose.js";
import oneOf from "../choose/one-of.js";
import Fiona from "../core/index.js";
import {
  firstname,
  firstnames,
  fullname,
  gender,
  surname,
  title,
} from "./name.js";

Fiona.register(["bool", bool]);
Fiona.register(["choose", choose]);
Fiona.register(["oneOf", oneOf]);
Fiona.register(["title", title]);
Fiona.register(["firstname", firstname]);
Fiona.register(["firstnames", firstnames]);
Fiona.register(["surname", surname]);
Fiona.register(["gender", gender]);
Fiona.register(["fullname", fullname]);

it("sanity", () => {
  assertEquals(true + true === 2, true);
});

it("import", () => {
  assertEquals(typeof Fiona === "function", true);
});

it("Fiona.Title", () => {
  assertEquals(Fiona(1).title(), "Sir");
  assertEquals(Fiona(1).title({}), "Sir");
  assertEquals(Fiona(2).title(), "Miss");
  assertEquals(Fiona(2).title({}), "Miss");
  assertEquals(Fiona(4).title({ gender: "f" }), "Ms");
  assertEquals(Fiona(4).title({ gender: "m" }), "Sir");
  assertEquals(Fiona(4).title({ gender: "Male" }), "Sir");
});

it("Fiona.Firstname", () => {
  assertEquals(Fiona(1).firstname(), "Hamish");
  assertEquals(Fiona(1).firstname({}), "Hamish");
  assertEquals(Fiona(2).firstname(), "Ava");
  assertEquals(Fiona(2).firstname({}), "Ava");
  assertEquals(Fiona(2).firstname({ gender: "f" }), "Leah");
  assertEquals(Fiona(2).firstname({ gender: "m" }), "Angus");
  assertEquals(Fiona(2).firstname({ gender: "Male" }), "Angus");
});

it("Fiona.Firstnames", () => {
  assertEquals(Fiona(1).firstnames(), "Hamish");
});

it("Fiona.Surname", () => {
  assertEquals(Fiona(1).surname(), "Scott");
  assertEquals(Fiona(2).surname(), "Reid");
});

it("Fiona.Gender", () => {
  assertEquals(Fiona(1).gender(), "male");
  assertEquals(Fiona(2).gender(), "female");
});

it("Fiona.Fullname", () => {
  assertEquals(Fiona(1).fullname(), "Sir Kyle Moon");
});

run();
