const recurser = (condition, handler) => {
  const nodeHandler = (node, root) => {
    if (root === undefined) {
      root = node;
    }

    if (node === null || node === undefined) {
      return node;
    } else if (node.constructor === Array) {
      return node.map((item) => nodeHandler(item, root));
    } else if (node.constructor === Object) {
      if (condition(node, root)) {
        return handler(node, root);
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
  return nodeHandler;
};

const transformer = recurser((node) => node.fiona, (node) => {
  if (node.fiona.constructor === Array) {
    return (seeded) =>
      seeded[node.fiona[0]](...node.fiona.slice(1).map(transformer));
  } else {
    return (seeded) => seeded[node.fiona]();
  }
});

const fromJSON = (seeded, schemaData) => seeded.object(transformer(schemaData));

export default fromJSON;
