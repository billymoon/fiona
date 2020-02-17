import dataset from "~/cms/production-data.json";
import { parse, evaluate } from "groq-js";

const Recursor = root => (node, handlers) => {
  const nodeHandler = node => {
    if (node === null || node === undefined) {
      return node;
    } else if (node.constructor === Array) {
      return node.map(item => nodeHandler(item));
    } else if (node.constructor === Object) {
      if (handlers[node._type]) {
        return handlers[node._type](node, root, nodeHandler);
      } else {
        Object.entries(node).forEach(([key, value]) => {
          node[key] = nodeHandler(value);
        });
        return node;
      }
    } else {
      return node;
    }
  };

  return nodeHandler(node);
};

const objectified = dataset.reduce(
  (memo, item) => ({ ...memo, [item._id]: item }),
  {}
);

const recursor = Recursor(objectified);

// const executor = node => {
//   if (node === null || node === undefined) {
//     return node;
//   } else if (node.constructor === Array) {
//     return node.map(item => executor(item));
//   } else if (node.constructor === Object) {
//     Object.entries(node).forEach(([key, value]) => {
//       node[key] = executor(value);
//     });
//     return node;
//   } else if (typeof node === 'function') {
//     return node();
//   } else {
//     return node;
//   }
// };

const model = async (query, params = {}, handlers = {}) => {
  const tree = parse(query);

  const value = await evaluate(tree, { dataset, params });

  const result = await value.get();

  const dereferenced = recursor(result, {
    reference: (node, root, nodeHandler) => nodeHandler(root[node._ref]),
    ...handlers
  });

  return dereferenced;
  // return executor(dereferenced);
};

export const withData = (Page, query, params, handlers) => {
  const PageGetInitialProps = Page.getInitialProps;

  Page.getInitialProps = async ctx => {
    const result = await model(
      query,
      { slug: ctx.asPath, ...params },
      handlers
    );
    if (typeof PageGetInitialProps === "function") {
      return { ...result, ...PageGetInitialProps(ctx) };
    } else {
      return result;
    }
  };

  return Page;
};

export default model;
