// TODO: move tests closer to relevant source code
import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import {
  beforeEach,
  describe,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";
import Fiona from "../index.js";
import index from "./index.js";

const fixtures = [0.5129792850990683, 0.4320565277859832, 0.2474033479799532];

describe("core", () => {
  let seeded;

  beforeEach(() => {
    seeded = Fiona("moon");
  });

  it("javascript is javascript", () => {
    assertEquals(true + true, 2);
  });

  it("index exports Fiona", () => {
    assertEquals(index, Fiona);
  });

  it("reports initseed", () => {
    assertEquals(seeded.info().initseed, "moon");
    const seeded2 = Fiona(1);
    assertEquals(seeded2.info().initseed, 1);
  });

  it("returns expected floats in order", () => {
    assertEquals(seeded.random(), fixtures[0]);
    assertEquals(seeded.random(), fixtures[1]);
    assertEquals(seeded.random(), fixtures[2]);
  });

  it("returns expected initseed from info method", () => {
    const MathRandom = Math.random;
    Math.random = () => 0.12345678;
    assertEquals(Fiona().info().initseed, 12345678);
    Math.random = MathRandom;
  });

  it(
    "returns expected floats in order when called as Fiona.Random",
    () => {
      assertEquals(Fiona.Random()(seeded), fixtures[0]);
      assertEquals(Fiona.Random()(seeded), fixtures[1]);
      assertEquals(Fiona.Random()(seeded), fixtures[2]);
    },
  );

  it("returns expected floats in reverse order", () => {
    seeded.random();
    seeded.random();
    seeded.random();
    seeded.random();
    assertEquals(seeded.reverse(), fixtures[2]);
    assertEquals(seeded.reverse(), fixtures[1]);
    assertEquals(seeded.reverse(), fixtures[0]);
  });

  it("repeat previous value by calling reverse", () => {
    const name1 = seeded.fullname();
    seeded.reverse();
    seeded.reverse();
    seeded.reverse();
    seeded.reverse();
    seeded.reverse();
    const name2 = seeded.fullname();
    assertEquals(name1, name2);
  });

  it("to return state to original", () => {
    assertEquals(seeded.random(), fixtures[0]);
    assertEquals(seeded.random(), fixtures[1]);
    assertEquals(seeded.random(), fixtures[2]);
    seeded.reset();
    assertEquals(seeded.random(), fixtures[0]);
    assertEquals(seeded.random(), fixtures[1]);
    assertEquals(seeded.random(), fixtures[2]);
  });

  it("reset state to passed argument", () => {
    assertEquals(seeded.random(), fixtures[0]);
    assertEquals(seeded.random(), fixtures[1]);
    assertEquals(seeded.random(), fixtures[2]);
    seeded.reset(12345);
    assertEquals(seeded.random(), 0.9051722604339814);
    assertEquals(seeded.random(), 0.40475850524602386);
    assertEquals(seeded.random(), 0.934793325110708);
    seeded.reset(12345);
    assertEquals(seeded.random(), 0.9051722604339814);
    assertEquals(seeded.random(), 0.40475850524602386);
    assertEquals(seeded.random(), 0.934793325110708);
    seeded.reset();
    assertEquals(seeded.random(), fixtures[0]);
    assertEquals(seeded.random(), fixtures[1]);
    assertEquals(seeded.random(), fixtures[2]);
    seeded.reset("moon");
    assertEquals(seeded.random(), fixtures[0]);
    assertEquals(seeded.random(), fixtures[1]);
    assertEquals(seeded.random(), fixtures[2]);
  });

  it("should repeat results of cloned instance", () => {
    assertEquals(seeded.random(), fixtures[0]);
    const dolly = seeded.clone();
    assertEquals(seeded.random(), fixtures[1]);
    assertEquals(seeded.random(), fixtures[2]);
    assertEquals(dolly.random(), fixtures[1]);
    assertEquals(dolly.random(), fixtures[2]);
  });

  it("should have inert default distribution function", () => {
    assertEquals(typeof seeded.distribution, "function");
    assertEquals(seeded.distribution(1), 1);
    assertEquals(seeded.distribution(0.12345), 0.12345);
    assertEquals(seeded.distribution(1e6), 1e6);
    assertEquals(seeded.distribution("awesome"), "awesome");
  });

  it("should set distribution function", () => {
    assertEquals(seeded.distribution(5), 5);
    seeded.distribution((i) => i * i);
    assertEquals(seeded.distribution(5), 25);
  });

  it("should reset distribution function", () => {
    assertEquals(seeded.distribution(5), 5);
    seeded.distribution((i) => i * i);
    assertEquals(seeded.distribution(5), 25);
    seeded.distribution(null);
    assertEquals(seeded.distribution(5), 5);
  });

  it("seeded.state should return expected state", () => {
    assertEquals(seeded.state(), [
      9114374722873036,
      1080754632633531,
      7193642159548421,
      7191889941316046,
    ]);
    seeded.random();
    assertEquals(seeded.state(), [
      1080754632633531,
      7193642159548421,
      7191889941316046,
      1101614626,
    ]);
  });

  it("seeded.state should reset state to passed argument", () => {
    assertEquals(seeded.random(), fixtures[0]);
    const state = seeded.state();
    assertEquals(seeded.random(), fixtures[1]);
    assertEquals(seeded.random(), fixtures[2]);
    seeded.state(state);
    assertEquals(seeded.random(), fixtures[1]);
    assertEquals(seeded.random(), fixtures[2]);
  });

  it("seeded.state should reset state initial when passed null", () => {
    assertEquals(seeded.random(), fixtures[0]);
    assertEquals(seeded.random(), fixtures[1]);
    assertEquals(seeded.random(), fixtures[2]);
    seeded.state(null);
    assertEquals(seeded.random(), fixtures[0]);
    assertEquals(seeded.random(), fixtures[1]);
    assertEquals(seeded.random(), fixtures[2]);
  });
});
run();
