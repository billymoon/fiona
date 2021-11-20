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
      997089,
      997089,
      106459,
      997089,
      997089,
      106459,
      997089,
      619032,
      106459,
      106459,
    ],
  );

  assertEquals(
    Fiona("moon").array(3, (seeded) => {
      return seeded.duplicable().number();
    }),
    [124491, 82404, 810122],
  );
});

run();
