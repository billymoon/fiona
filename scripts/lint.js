const { execWithArgs } = require('./utils')

// The quotes make sure that Prettier expands the globs rather than your shell
execWithArgs('prettier "{core,docs,pages,scripts,src}/**/*.js"')
