import { it, run } from "https://deno.land/x/tincan/mod.ts";
import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import RandExp from "https://esm.sh/randexp@0.5.3";
import Fiona from "../core/index.js";

import Regex from "../regex/regex.js";
import gibberish from "./gibberish.js";

Fiona.register(["regex", Regex(RandExp)]);
Fiona.register(["gibberish", gibberish]);

it("Fiona.Gibberish", () => {
  assertEquals(
    Fiona(1).gibberish(),
    "tingelcencecad",
  );
});

it("Fiona.Gibberish can specify qty of words", () => {
  assertEquals(
    Fiona(1).gibberish({ qty: 10 }),
    "tingelcencecad lelaaniof setfunof inmasnauopnim testrersings es at bingsunkassup hatuies houtbieswim",
  );
});

it("Fiona.Gibberish can specify syllableMin and syllableMax", () => {
  assertEquals(
    Fiona(1).gibberish({ qty: 10, syllableMin: 1, syllableMax: 2 }),
    "tingel lela setfun inmas testrers es at bingsun hatu houtbies",
  );
  assertEquals(
    Fiona(1).gibberish({ qty: 10, syllableMin: 5, syllableMax: 5 }),
    "tingelcencecading lelaaniof setfunoffoutan inmasnauopnim testrersingsagesad eseveferskingswop atirucageel bingsunkassupma hatuiesap houtbieswimgaten",
  );
  assertEquals(
    Fiona(1).gibberish({ qty: 10, syllableMin: 1, syllableMax: 10 }),
    "tingelcencecadingapetin lelaaniofesenhanwocgim setfunoffoutanvest inmasnauopnimgociesicvarsu testrersingsagesadas es at bingsunkassupmabuhel hatuiesapeltau houtbieswimgateneve",
  );
  assertEquals(
    Fiona(1).gibberish({ qty: 10, syllableMin: 10, syllableMax: 10 }),
    "tingelcencecadingapetinadeve lelaaniofesenhanwocgim setfunoffoutanvestdoutagedestpap inmasnauopnimgociesicvarsu testrersingsagesadashobdeveoptad eseveferskingswopactadtafeer atirucageelatingsedkalers bingsunkassupmabuhelacbocat hatuiesapeltaulermagetest houtbieswimgateneveencearfexdu",
  );
});

run();
