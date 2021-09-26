import recurse from "./recurse.js";
// TODO: should Moon be renamed to something more intuitive like FionaConstructor?
// define main constructor function
function Moon(Prng, initseed = Math.floor(Math.random() * 1e8), path) {
  // set initial seed from constructor function initialisation argument, or random integer
  // const initseed = seedin !== undefined
  //   ? seedin
  //   : ;

  // initialise PRNG
  const { state, reset, random, reverse, distribution } = Prng(
    this,
    JSON.stringify([initseed, path]),
  );
  Object.assign(this, { state, reset, random, reverse, distribution });

  this.info = () => ({ initseed, path });
  this.recurse = recurse;

  return this;
}

// set up self referencial prototype chain á la jQuery
Moon.prototype = { constructor: Moon };

export default Moon;
