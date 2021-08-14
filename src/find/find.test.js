import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.103.0/testing/asserts.ts";
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
} from "../name/name.js";
import Find from "./find.js";

Fiona.register(["bool", bool]);
Fiona.register(["choose", choose]);
Fiona.register(["oneOf", oneOf]);
Fiona.register(["title", title]);
Fiona.register(["firstname", firstname]);
Fiona.register(["firstnames", firstnames]);
Fiona.register(["surname", surname]);
Fiona.register(["gender", gender]);
Fiona.register(["fullname", fullname]);

const find = Find(Fiona);

it("find Fiona Moon", () => {
  assertEquals(
    find(
      (name) => name === "Miss Fiona Moon",
      (seeded) => seeded.fullname(),
      {
        startseed: 30380,
        tries: 10,
      },
    ).info().initseed,
    30382,
  );
});

it("find with Fiona.Data", () => {
  assertEquals(
    find(
      (data) => {
        return data.age === 61;
      },
      (seeded) =>
        seeded.object({
          name: Fiona.Fullname,
          age: Fiona.Number({ max: 100 }),
        }),
      { tries: 120 },
    ).info().initseed,
    119,
  );
});

it("find without passing options", () => {
  assertEquals(
    find(
      (data) => {
        return data.age === 1;
      },
      (seeded) =>
        seeded.object({
          age: Fiona.Number({ max: 100 }),
        }),
    ).info().initseed,
    162,
  );
});

it("find (set startseed)", () => {
  assertEquals(
    find(
      (data) => {
        return data.age === 61;
      },
      (seeded) =>
        seeded.object({
          name: Fiona.Fullname,
          age: Fiona.Number({ max: 100 }),
        }),
      { startseed: 307, tries: 10 },
    ).object({ name: Fiona.Fullname }).name,
    "Dr Max Reid",
  );

  assertEquals(
    find(
      (data) => {
        return data.name === "Miss Fiona Moon" && data.age === 1;
      },
      (seeded) =>
        seeded.object({
          name: Fiona.Fullname,
          age: Fiona.Number({ max: 100 }),
        }),
      { startseed: 2983930, tries: 10 },
    ).info().initseed,
    2983938,
  );

  assertEquals(
    find(
      (data) => {
        return data.name === "Miss Aria Moon" && data.age === 5;
      },
      (seeded) =>
        seeded.object({
          name: Fiona.Fullname,
          age: Fiona.Number({ max: 100 }),
        }),
      { startseed: 3482740, tries: 10 },
    ).info().initseed,
    3482749,
  );

  assertEquals(
    find(
      (data) => {
        return data.name === "Miss Mia Moon" && data.age === 6;
      },
      (seeded) =>
        seeded.object({
          name: Fiona.Fullname,
          age: Fiona.Number({ max: 100 }),
        }),
      { startseed: 211500, tries: 10 },
    ).info().initseed,
    211502,
  );
});

it("find", () => {
  const err = assertThrows(() => {
    find(
      (data) => {
        return data.age === 61;
      },
      (seeded) =>
        seeded.object({
          age: Fiona.Number({ max: 100 }),
        }),
      { tries: 2 },
    );
  });

  assertEquals(err.message, "Predicate not satisfied within 2 tries");
});

run();
