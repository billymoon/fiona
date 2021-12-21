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

const fixtures = [0.33351631757501343, 0.1982628773889797, 0.6226111653366179];

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

  it("reports info with Fiona.Info syntax", () => {
    assertEquals(seeded.info(), { initseed: "moon", path: [] });
    assertEquals(Fiona(1).info(), { initseed: 1, path: [] });
    assertEquals(Fiona(1).object({ a: Fiona.Info }), {
      a: { initseed: 1, path: ["a"] },
    });
    assertEquals(Fiona(1).object({ a: [Fiona.Info, Fiona.Info] }), {
      a: [{ initseed: 1, path: ["a", 0] }, { initseed: 1, path: ["a", 1] }],
    });
  });

  it("Fiona.Info returns copy so can not mutate original from returned value", () => {
    const info = seeded.info();
    info.path.push(1);
    assertEquals(seeded.info(), { initseed: "moon", path: [] });
    assertEquals(info, { initseed: "moon", path: [1] });
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
    assertEquals(seeded.random(), 0.35700980264554255);
    assertEquals(seeded.random(), 0.07337278829578905);
    assertEquals(seeded.random(), 0.05804005640467631);
    seeded.reset(12345);
    assertEquals(seeded.random(), 0.35700980264554255);
    assertEquals(seeded.random(), 0.07337278829578905);
    assertEquals(seeded.random(), 0.05804005640467631);
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
      6607366118862930,
      4744600786242914,
      174673749215283,
      3741093535787004,
    ]);
    seeded.random();
    assertEquals(seeded.state(), [
      4744600786242914,
      174673749215283,
      3741093535787004,
      716220838,
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
