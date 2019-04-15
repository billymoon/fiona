// TODO: track registered extensions better, at least via setter/remover/matcher
export const registered = []

export const Register = (registerFactory, registerMethod) => (...extensions) =>
  extensions.forEach(plugin => {
    const [name, fn] =
      typeof plugin === 'function' ? [plugin.name, plugin] : plugin

    registerFactory(
      name[0].toUpperCase() + name.slice(1),
      (...args) => seeded => fn(seeded, ...args)
    )

    registerMethod(name, function(...args) {
      return fn(this, ...args)
    })
  })
