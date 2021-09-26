import { assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { describe, it, run } from "https://deno.land/x/tincan/mod.ts";
import processSeed, { EXPOSE_FOR_TEST } from "./index.js";

const { prepareSeed, xorify } = EXPOSE_FOR_TEST;

describe("process seed", () => {
  it("prepares seed for processing", () => {
    assertEquals(prepareSeed(0), 0);
    assertEquals(prepareSeed("\x00"), xorify(0));
    assertEquals(prepareSeed("\x00\x00"), xorify(0 + xorify(0)));
    assertEquals(prepareSeed("1"), xorify(49));
    assertEquals(prepareSeed("12"), xorify(50 + xorify(49)));
    assertEquals(prepareSeed("123"), xorify(51 + xorify(50 + xorify(49))));
  });

  it("process-seed compounds seed and path", () => {
    assertEquals(processSeed(1, []), xorify(1));
    assertEquals(processSeed(1, [1]), xorify(1 + xorify(1)));
    assertEquals(processSeed(0x31, []), xorify(49));
    assertEquals(processSeed("1", []), xorify(xorify(49)));
    assertEquals(processSeed("12", []), xorify(xorify(50 + xorify(49))));
    assertEquals(
      processSeed("12", ["1"]),
      xorify(xorify(49) + xorify(xorify(50 + xorify(49)))),
    );
    assertEquals(
      processSeed("1", ["21"]),
      xorify(xorify(49 + xorify(50)) + xorify(xorify(49))),
    );
    assertEquals(
      processSeed("1", ["21", "1"]),
      xorify(xorify(49) + xorify(xorify(49 + xorify(50)) + xorify(xorify(49)))),
    );
    assertEquals(processSeed(1, [1, 1]), xorify(1 + xorify(1 + xorify(1))));
    assertEquals(
      processSeed(1, ["21", "1"]),
      xorify(xorify(49) + xorify(xorify(49 + xorify(50)) + xorify(1))),
    );
    assertEquals(
      processSeed(1, ["21", 1]),
      xorify(1 + xorify(xorify(49 + xorify(50)) + xorify(1))),
    );
    assertEquals(processSeed("﷽a", []), xorify(xorify(97 + xorify(0xfdfd))));
    assertEquals(processSeed("", []), xorify(0));
    assertEquals(processSeed(" ", []), xorify(xorify(32)));
    assertEquals(processSeed("  ", []), xorify(xorify(32 + xorify(32))));
  });

  it("process-seed matches fixtures", () => {
    assertEquals(processSeed("1", []), 1500492590);
    assertEquals(processSeed("12", []), 2104648539);
    assertEquals(processSeed("1", ["2"]), 1238061627);
    assertEquals(processSeed("12", ["1"]), 1318403811);
    assertEquals(processSeed("1", ["21"]), 60196237);
    assertEquals(processSeed("1", ["2", "1"]), 1535059029);
    assertEquals(processSeed(1, [1]), 1012838124);
    assertEquals(processSeed(1, []), 984261732);
    assertEquals(processSeed(1, [0]), 40942232);
    assertEquals(processSeed(0, [0]), 1548195023);
    assertEquals(processSeed(0, [0, 0]), 852455059);
    assertEquals(processSeed(0, []), 1326358046);
  });
});

run();
