import { it, run } from "https://deno.land/x/tincan/mod.ts";
import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.103.0/testing/asserts.ts";
import RandExp from "https://esm.sh/randexp@0.5.3";
import Fiona from "../core/index.js";

import Regex from "../regex/regex.js";
import gibberish from "./gibberish.js";

Fiona.register(["regex", Regex(RandExp)]);
Fiona.register(["gibberish", gibberish]);

it("Fiona.Gibberish", () => {
  assertEquals(
    Fiona(1).gibberish(),
    "pexout",
  );
});

it("Fiona.Gibberish can specify qty of words", () => {
  assertEquals(
    Fiona(1).gibberish({ qty: 10 }),
    "pexout anauvimdaeve rings itgauswariccun obcimout ingersiorrin wufa outasdersfau derstout ceriniage",
  );
});

it("Fiona.Gibberish can specify syllableMin and syllableMax", () => {
  assertEquals(
    Fiona(1).gibberish({ qty: 10, syllableMin: 1, syllableMax: 2 }),
    "pex vage au pima cing tasvau war waf lobcim val",
  );
  assertEquals(
    Fiona(1).gibberish({ qty: 10, syllableMin: 5, syllableMax: 5 }),
    "pexoutcanauvim aeveingrocit auswariccunlob imoutcingersi pisfimwopadout opersfaueters vinceriniage erinvalusor mobaditpined haftanoicwu",
  );
  assertEquals(
    Fiona(1).gibberish({ qty: 10, syllableMin: 1, syllableMax: 10 }),
    "pexoutcanau pimaeveingrocit auswariccunlobcimoutcingers for ratwufadoutasdersfau derstoutpaf iniageae valusorunternasvies edocaftanoicwu gimredadingwouthage",
  );
  assertEquals(
    Fiona(1).gibberish({ qty: 10, syllableMin: 10, syllableMax: 10 }),
    "pexoutcanauvimdaeveingrocit auswariccunlobcimoutcingersi pisfimwopadoutasdersfaueters vinceriniageaevoutasmis unternasvieshedocaftanoic westgimredadingwouthagewocesas afpingsvopranershanifeohob kingofingedanvageingsonofo leveimasueninwelduapage mofdintaaseveerencenadtevehet",
  );
});

it("Fiona.Gibberish does not return same value when called multiple times", () => {
  assertNotEquals(
    Fiona(1).object((seeded) => seeded.gibberish() && seeded.gibberish()),
    Fiona(1).object((seeded) => seeded.gibberish()),
  );
});

run();
