import Prng from "./prng/index.js";
import { registered } from "./register/index.js";

const handleArray = (seeded, node, path, root) => {
  for (let i = 0; i < node.length; i++) {
    node[i] = recursor(seeded, node[i], path.concat(i), root);
  }

  return node;
};

const handleObject = (seeded, node, path, root) => {
  for (const key in node) {
    const result = recursor(seeded, node[key], path.concat(key), root);
    if (result === undefined) {
      delete node[key]
    } else {
      node[key] = result
    }
  }

  return node;
};

const handleFunction = (seeded, node, path, root) => {
  const newSeeded = new seeded.constructor(
    Prng,
    seeded.info().initseed,
    seeded.info().path.concat(path),
  );
  // TODO: if we are adding data property, why not also position property?
  // TODO: perhaps data (property on seeded instance during recursion) should be called root, and be a getter/setter and cleaned up after recursion?
  newSeeded.data = root;
  const newNode = registered.indexOf(node) !== -1 ? node() : node(newSeeded);
  return recursor(seeded, newNode, path, path.length ? root : newNode);
};

const handleRegex = (
  seeded,
  node,
  path,
  root,
) => (seeded.regex
  ? handleFunction(seeded, (seeded) => seeded.regex(node), path, root)
  : node);

const recursor = (seeded, node, path, root) =>
  node === null || node === undefined
    ? node
    : node.constructor === Array
    ? handleArray(seeded, node, path, root)
    : node.constructor === Object
    ? handleObject(seeded, node, path, root)
    : typeof node === "function"
    ? handleFunction(seeded, node, path, root)
    : node.constructor === RegExp
    ? handleRegex(seeded, node, path, root)
    : node;

const cloner = (node) =>
  node === null || node === undefined
    ? node
    : node.constructor === Array
    ? node.map(cloner)
    : node.constructor === Object
    ? Object.entries(node).reduce(
      (memo, [key, val]) => ({ ...memo, [key]: cloner(val) }),
      {},
    )
    : node;

const recurse = (seeded, nodeIn) => {
  const node = cloner(nodeIn);
  return recursor(seeded, node, [], node);
};

export default recurse;
