import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { describe, it, run } from "https://deno.land/x/tincan/mod.ts";
import xor from "./xor.js";

const fixtures = {
  stateInitial: [
    2784201997697448,
    2134104996050757,
    8286235680936945,
    3089905606158966,
  ],
  stateCalledOnce: [
    2134104996050757,
    8286235680936945,
    3089905606158966,
    1326358046,
  ],
  stateCalledTwice: [8286235680936945, 3089905606158966, 1326358046, 621986149],
  stateCalledThrice: [3089905606158966, 1326358046, 621986149, 1968173],
  resultCalledOnce: 0.6176335954189457,
  resultCalledTwice: 0.28963487096579504,
  resultCalledThrice: 0.0009165019732511146,
};

describe("prng", () => {
  it("sanity", () => {
    assertEquals(true + true, 2);
  });

  it("random", () => {
    const prng = xor(0);
    const { random } = prng;
    assertEquals(random(), fixtures.resultCalledOnce);
    assertEquals(random(), fixtures.resultCalledTwice);
    assertEquals(random(), fixtures.resultCalledThrice);
  });

  it("reverse", () => {
    const prng = xor(0);
    const { random, reverse } = prng;
    assertEquals(random(), fixtures.resultCalledOnce);
    assertEquals(random(), fixtures.resultCalledTwice);
    assertEquals(random(), fixtures.resultCalledThrice);
    assertEquals(reverse(), fixtures.resultCalledTwice);
    assertEquals(reverse(), fixtures.resultCalledOnce);
    assertEquals(random(), fixtures.resultCalledTwice);
    assertEquals(reverse(), fixtures.resultCalledOnce);
    assertEquals(random(), fixtures.resultCalledTwice);
    assertEquals(random(), fixtures.resultCalledThrice);
  });

  it("reverseInLoop", () => {
    // TODO: generate long random chain then reverse back through it
    for (let seed = 1e3; seed--;) {
      const { random, reverse } = xor(seed);
      const [once, twice] = [random(), random(), random()];
      assertEquals(reverse(), twice);
      assertEquals(reverse(), once);
    }
  });

  it("reverseFromState", () => {
    const prng = xor(0);
    // TODO: understand why state is different (but similar) stepping back
    // but produces same result and state stepping forward
    const { getState, setState, random, reverse } = prng;
    setState(fixtures.stateCalledThrice);
    assertEquals(reverse(), fixtures.resultCalledTwice);
    const stateAfterStepBack = getState();
    assertEquals(random(), fixtures.resultCalledThrice);
    assertEquals(getState(), fixtures.stateCalledThrice);
    setState(fixtures.stateCalledTwice);
    assertEquals(random(), fixtures.resultCalledThrice);
    setState(stateAfterStepBack);
    assertEquals(random(), fixtures.resultCalledThrice);
    assertEquals(
      stateAfterStepBack.slice(1),
      fixtures.stateCalledTwice.slice(1),
    );
    assertNotEquals(
      stateAfterStepBack.slice(0, 1),
      fixtures.stateCalledTwice.slice(0, 1),
    );
  });

  it("reseed", () => {
    const prng = xor(0);
    const { reseed, random } = prng;
    assertEquals(random(), fixtures.resultCalledOnce);
    assertEquals(random(), fixtures.resultCalledTwice);
    assertEquals(random(), fixtures.resultCalledThrice);
    reseed(0);
    assertEquals(random(), fixtures.resultCalledOnce);
    assertEquals(random(), fixtures.resultCalledTwice);
    assertEquals(random(), fixtures.resultCalledThrice);
  });

  it("getState", () => {
    const prng = xor(0);
    const { getState, random } = prng;
    assertEquals(getState(), fixtures.stateInitial);
    random();
    assertEquals(getState(), fixtures.stateCalledOnce);
    random();
    assertEquals(getState(), fixtures.stateCalledTwice);
    random();
    assertEquals(getState(), fixtures.stateCalledThrice);
  });

  it("setState", () => {
    const prng = xor(0);
    const { setState, random } = prng;

    assertEquals(random(), fixtures.resultCalledOnce);
    assertEquals(random(), fixtures.resultCalledTwice);
    assertEquals(random(), fixtures.resultCalledThrice);

    setState(fixtures.stateInitial);
    assertEquals(random(), fixtures.resultCalledOnce);
    assertEquals(random(), fixtures.resultCalledTwice);
    assertEquals(random(), fixtures.resultCalledThrice);

    setState(fixtures.stateCalledOnce);
    assertEquals(random(), fixtures.resultCalledTwice);
    assertEquals(random(), fixtures.resultCalledThrice);

    setState(fixtures.stateCalledTwice);
    assertEquals(random(), fixtures.resultCalledThrice);

    setState(fixtures.stateCalledOnce);
    assertEquals(random(), fixtures.resultCalledTwice);
    assertEquals(random(), fixtures.resultCalledThrice);
  });
});

run();
