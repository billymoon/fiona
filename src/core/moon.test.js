import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import {
  beforeEach,
  describe,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";
// import Moon from "./index.js";
import Moon from "./moon.js";

const stateMock = {};
const resetMock = {};
const randomMock = {};
const distributionMock = {};

describe("moon", () => {
  let PrngMock;
  let moon;

  beforeEach(() => {
    PrngMock = () => ({
      state: stateMock,
      reset: resetMock,
      random: randomMock,
      distribution: distributionMock,
    });

    moon = new Moon(PrngMock, 0, []);
  });

  it("attaches member functions from passed Prng", () => {
    assertEquals(moon.distribution, distributionMock);
    assertEquals(moon.random, randomMock);
    assertEquals(moon.reset, resetMock);
    assertEquals(moon.state, stateMock);
  });

  it("info returns original initseed", () => {
    assertEquals(moon.info().initseed, 0);
  });

  it("returns instance of Moon", () => {
    assertEquals(moon instanceof Moon, true);
  });

  it("sets up self referential prototype constructor", () => {
    assertEquals(Moon.prototype.constructor, Moon);
    assertEquals(moon.constructor, Moon);
  });

  it("info returns generated initseed when none passed as argument", () => {
    const initseed = new Moon(PrngMock, undefined, []).info().initseed;
    assertEquals(initseed > 0, true);
    assertEquals(initseed < 1e8, true);
    assertEquals(initseed % 1, 0);
  });
});

run();
