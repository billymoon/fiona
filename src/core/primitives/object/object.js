const object = (seeded, ...originals) => {
  return originals.reduce((_memo, original) => {
    return seeded.recurse(seeded, original);
    // return recurseData(seeded, original, undefined, undefined, memo)
    // TODO: re-instate error checking for object
    // const result = recurseData(seeded, original, undefined, undefined, memo)
    // if (!(typeof result === 'object' && result.constructor === Object)) {
    //   throw Error('arguments of Fiona.Object must be an Object or function that returns an Object')
    // }
    // return result
  }, {});
};
export default object;
