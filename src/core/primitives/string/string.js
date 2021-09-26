// TODO: document Fiona.String

// TODO: can injected values be same as result of Fiona.Array?
const string = (seeded, [first, ...rest], ...variables) => {
  const variable = seeded.recurse(seeded, variables);
  return rest.reduce(
    (memo, item, index) => `${memo}${variable[index]}${item}`,
    first,
  );
};

export default string;
