const RecurseArguments = require('./recurse-arguments')
const { type } = require('./utils')
const corePlugins = require('./core-plugins')

const Register = (fiona, Moon) => (...plugins) => plugins.forEach(plugin => {
  let fn
  if (type(plugin) === 'Function') {
    name = plugin.name
    fn = plugin
  } else {
    name = plugin[0]
    fn = plugin[1]
  }

  Moon.prototype[name] = function (...args) {
    const seeded = this
    return fn({ seeded }, ...args)
  }

  fiona[name] = (...args) => ({ seeded }) => {
    // TODO: it's pretty hacky to duck type the passed argument here
    if (args[0] instanceof RecurseArguments) {
      return fn({ seeded })
    } else {
      return fn({ seeded }, ...args)
    }
  }
})

module.exports = Register
