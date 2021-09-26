import xor from "../xor.js";

const stringToIntegers = (str) => str.split("").map((i) => i.charCodeAt(0));

const compound = (memo, i) => xorify(memo + i);

const xorify = (input) => xor(input % 0x7fffffff).random() * 0x7fffffff;

const prepareSeed = (input) =>
  typeof input === "string"
    ? stringToIntegers(input).reduce(compound, 0)
    : input;

const processSeed = (inputSeed, path = []) =>
  [inputSeed, ...path].map(prepareSeed).reduce(compound, 0);

export default processSeed;

export const EXPOSE_FOR_TEST = {
  xorify,
  prepareSeed,
};
