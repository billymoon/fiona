import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { it, run } from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../core/index.js";
import img from "./img.js";

Fiona.register(["img", img]);

it("Fiona.Img", () => {
  const imgDataURI = Fiona(1).img();
  const fixtureStart = "data:image/svg+xml;utf8,%0A%20";
  const fixtureEnd = "svg%3E%0A%20%20";
  assertEquals(imgDataURI.slice(fixtureEnd.length * -1), fixtureEnd);
  assertEquals(imgDataURI.slice(0, fixtureStart.length), fixtureStart);
});

it("Fiona.Img (height and width)", () => {
  const imgDataURI = Fiona(1).img({ width: 100, height: 100 });
  const fixtureStart = "data:image/svg+xml;utf8,%0A%20";
  const fixtureEnd = "svg%3E%0A%20%20";
  assertEquals(imgDataURI.slice(fixtureEnd.length * -1), fixtureEnd);
  assertEquals(imgDataURI.slice(0, fixtureStart.length), fixtureStart);
});

run();
