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
  name,
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
Fiona.register(["name", name]);
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
  assertEquals(Fiona(2).title(), "Sir");
  assertEquals(Fiona(2).title({}), "Sir");
  assertEquals(Fiona(4).title({ gender: "f" }), "Ms");
  assertEquals(Fiona(4).title({ gender: "m" }), "Sir");
  assertEquals(Fiona(4).title({ gender: "Male" }), "Sir");
});

it("Fiona.Firstname", () => {
  assertEquals(Fiona(1).firstname(), "Sam");
  assertEquals(Fiona(1).firstname({}), "Sam");
  assertEquals(Fiona(2).firstname(), "Cody");
  assertEquals(Fiona(2).firstname({}), "Cody");
  assertEquals(Fiona(2).firstname({ gender: "f" }), "Zoe");
  assertEquals(Fiona(2).firstname({ gender: "m" }), "Finn");
  assertEquals(Fiona(2).firstname({ gender: "Male" }), "Finn");
});

it("Fiona.Firstnames (sometimes returns one name)", () => {
  assertEquals(Fiona(1).firstnames(), "Sam");
});

it("Fiona.Firstnames (sometimes returns multiple names)", () => {
  assertEquals(Fiona(3).firstnames(), "Isabella Imogen");
});

it("Fiona.Firstname (returns first of multiple names returned by Fiona.Firstnames)", () => {
  assertEquals(Fiona(3).firstname(), "Isabella");
});

it("Fiona.Surname", () => {
  assertEquals(Fiona(1).surname(), "Stewart");
  assertEquals(Fiona(2).surname(), "Stewart");
});

it("Fiona.Gender", () => {
  assertEquals(Fiona(1).gender(), "male");
  assertEquals(Fiona(2).gender(), "male");
});

it("Fiona.Fullname", () => {
  assertEquals(Fiona(1).fullname(), "Lord Sam Murray Murray");
});

it("Fiona.Fullname with gender", () => {
  assertEquals(
    Fiona(1).fullname({ gender: "f" }),
    "Miss Isabella Young-Taylor",
  );
});

it("Fiona.Name", () => {
  assertEquals(Fiona(1).name(), "Sam Murray");
});

it("Fiona.Name with gender", () => {
  assertEquals(Fiona(1).name({ gender: "f" }), "Isabella Young-Taylor");
});

run();
