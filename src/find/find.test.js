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
        startseed: 1440,
        tries: 2,
      },
    ).info().initseed,
    1441,
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
      {
        startseed: 120,
        tries: 4,
      },
    ).info().initseed,
    123,
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
    75,
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
    "Lord Leo Mitchell MacDonald",
  );

  assertEquals(
    find(
      (data) => {
        return data.name === "Miss Fiona Moon" && data.age === 5;
      },
      (seeded) =>
        seeded.object({
          name: Fiona.Fullname,
          age: Fiona.Number({ max: 100 }),
        }),
      { startseed: 101290, tries: 3 },
    ).info().initseed,
    101292,
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
