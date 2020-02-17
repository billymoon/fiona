import data from "~/cms/production-data.json";

const nodeHandler = (node, root) => {
  if (root === undefined) {
    root = node;
  }

  if (node === null || node === undefined) {
    return node;
  } else if (node.constructor === Array) {
    return node.map(item => nodeHandler(item, root));
  } else if (node.constructor === Object) {
    if (node._type === "reference") {
      return root[node._ref];
    } else {
      Object.entries(node).forEach(([key, value]) => {
        node[key] = nodeHandler(value, root);
      });
      return node;
    }
  } else {
    return node;
  }
};

const mapStar = star => {
  const objectified = star.reduce(
    (memo, item) => ({ ...memo, [item._id]: item }),
    {}
  );

  const middle = nodeHandler(objectified);

  return Object.entries(middle).reduce(
    (memo, [key, value]) => ({
      ...memo,
      [value._type]: [...(memo[value._type] || []), value]
    }),
    {}
  );
};

const niceSlug = slug =>
  slug
    .replace(/^\/|\/$/g, "")
    .replace(/^$/, "/")
    .toLowerCase();

// module.exports = {
//   nodeHandler,
//   mapStar,
//   niceSlug
// };

const mapped = mapStar(data); // TODO: move into outer scope to prevent re-evaluating
console.log(mapped)

export const pageData = slug => {  
  const routeData = mapped.page.filter(
    page => niceSlug(page.slug) === niceSlug(slug)
  )[0];
  
  return routeData;
};

export const examples = () => mapped

