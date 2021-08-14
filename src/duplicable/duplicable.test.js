import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { it, run } from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../core/index.js";
import duplicable from "./duplicable.js";

Fiona.register(["duplicable", duplicable]);

it("Fiona.Duplicable", () => {
  assertEquals(
    Fiona("moon").array(10, (seeded) => {
      return seeded.duplicable({ frequency: 0.8, pool: 2 }).number();
    }),
    [
      972611,
      628994,
      153925,
      153925,
      373260,
      373260,
      373260,
      373260,
      373260,
      153925,
    ],
  );

  assertEquals(
    Fiona("moon").array(3, (seeded) => {
      return seeded.duplicable().number();
    }),
    [972611, 628994, 979373],
  );
});

run();
