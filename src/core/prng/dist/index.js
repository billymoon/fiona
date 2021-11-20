var __defProp = Object.defineProperty;
var __markAsModule = (target) =>
  __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all) {
    __defProp(target, name, { get: all[name], enumerable: true });
  }
};

// process-seed/index.ts
__export(exports, {
  EXPOSE_FOR_TEST: () => EXPOSE_FOR_TEST,
  default: () => process_seed_default,
});

// xor.ts
var baseSeeds = [123456789, 362436069, 521288629, 88675123];
var xor = (seed) => {
  let [x, y, z, w] = baseSeeds;
  const random = () => {
    const t = x ^ x << 11;
    [x, y, z] = [y, z, w];
    w = w ^ w >> 19 ^ t ^ t >> 8;
    return w / 2147483647;
  };
  const reverse = () => {
    let t = w ^ z ^ z >> 19;
    t = t ^ t >> 8;
    t = t ^ t >> 16;
    t = t ^ t << 11;
    t = t ^ t << 22;
    [w, z, y] = [z, y, x];
    x = t;
    return w / 2147483647;
  };
  const seeder = () => Math.round(random() * 1e16);
  const reseed = (seed2) => {
    [x, y, z, w] = baseSeeds.map((i) => i + seed2);
    [x, y, z, w] = [seeder(), seeder(), seeder(), seeder()];
  };
  reseed(seed);
  const getState = () => [x, y, z, w];
  const setState = (seeds) => [x, y, z, w] = seeds;
  return {
    random,
    reverse,
    reseed,
    getState,
    setState,
  };
};
var xor_default = xor;

// process-seed/index.ts
var stringToIntegers = (str) => str.split("").map((i) => i.charCodeAt(0));
var compound = (memo, i) => xorify(memo + i);
var xorify = (input) => xor_default(input % 2147483647).random() * 2147483647;
var prepareSeed = (input) =>
  typeof input === "string"
    ? stringToIntegers(input).reduce(compound, 0)
    : input;
var processSeed = (inputSeed, path = [123, "abc"]) =>
  [inputSeed, ...path].map(prepareSeed).reduce(compound, 0);
var process_seed_default = processSeed;
var EXPOSE_FOR_TEST = {
  xorify,
  prepareSeed,
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EXPOSE_FOR_TEST,
});
//# sourceMappingURL=index.js.map
