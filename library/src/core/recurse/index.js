import Prng from '../prng/index.js'
import { registered } from '../register/index.js'

const handleArray = (seeded, node, path, root) => {
  for (let i = 0; i < node.length; i++) {
    node[i] = recursor(seeded, node[i], `${path}[${i}]`, root)
  }

  return node
}

const handleObject = (seeded, node, path, root) => {
  for (let key in node) {
    node[key] = recursor(seeded, node[key], `${path}.${key}`, root)
  }

  return node
}

const handleFunction = (seeded, node, path, root) => {
  const newSeeded = new seeded.constructor(
    `${path}/${seeded.info().initseed}`,
    Prng
  )
  // TODO: if we are adding data property, why not also position property?
  // TODO: perhaps data (property on seeded instance during recursion) should be called root, and be a getter/setter and cleaned up after recursion?
  newSeeded.data = root
  const newNode = registered.indexOf(node) !== -1 ? node() : node(newSeeded)
  return recursor(seeded, newNode, path, path === 'root' ? newNode : root)
}

const handleRegex = (seeded, node) => (seeded.regex ? seeded.regex(node) : node)

const recursor = (seeded, node, path, root) =>
  node === null || node === undefined
    ? node
    : node.constructor === Array
    ? handleArray(seeded, node, path, root)
    : node.constructor === Object
    ? handleObject(seeded, node, path, root)
    : typeof node === 'function'
    ? handleFunction(seeded, node, path, root)
    : node.constructor === RegExp
    ? handleRegex(seeded, node)
    : node

const cloner = node =>
  node === null || node === undefined
    ? node
    : node.constructor === Array
    ? node.map(cloner)
    : node.constructor === Object
    ? Object.entries(node).reduce(
        (memo, [key, val]) => ({ ...memo, [key]: cloner(val) }),
        {}
      )
    : node

const recurse = (seeded, nodeIn) => {
  const node = cloner(nodeIn)
  return recursor(seeded, node, 'root', node)
}

export default recurse
