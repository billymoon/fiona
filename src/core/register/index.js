const RecurseArguments = require('../recurse/arguments')

const Register = (registerInstance, registerConstructorPrototype) => (...plugins) => plugins.forEach(plugin => {
  let fn
  if (typeof plugin === 'function') {
    name = plugin.name
    fn = plugin
  } else {
    name = plugin[0]
    fn = plugin[1]
  }

  registerConstructorPrototype(name, function (...args) {
    const seeded = this
    return fn(seeded, ...args)
  })

  registerInstance(name, (...args) => (seeded) => {
    // TODO: it's pretty hacky to throw recursing property on instance here
    if (args[0] && args[0].recursing) {
      return fn(seeded)
    } else {
      return fn(seeded, ...args)
    }
  })
})

module.exports = Register
