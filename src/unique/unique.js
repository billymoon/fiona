const unique = (
  seeded,
  qtyIn,
  fn,
  { duplicateLimit = (qty) => qty * 2, comparator = (a, b) => a === b } = {},
) => {
  const qty = typeof qtyIn === "number" ? qtyIn : seeded.number(qtyIn);
  const duplicates = typeof duplicateLimit === "function"
    ? duplicateLimit(qty)
    : duplicateLimit;
  const unmatched = Symbol("unmatched");
  let count = 0;
  const result = seeded.array(qty + duplicates, (seeded) => {
    // return early if we already have enough data
    const index = seeded.info().path[0];
    if (index + 1 > qty + count) {
      return null;
    }

    const item = seeded.object(fn);
    if (
      seeded.data.findIndex((dataItem) => comparator(item, dataItem)) !== -1
    ) {
      count++;
      // console.log(item)
      return unmatched;
    } else {
      return item;
    }
  }).filter((item) => item !== unmatched).slice(0, qty);

  // console.log(`Duplicates: ${count}`)
  if (result.length === qty) {
    return result;
  } else {
    throw Error(`Too many duplicates`);
  }
};

export default unique;
