const { exec } = require('./utils')

// The quotes make sure that Prettier expands the globs rather than your shell
exec('prettier "{core,docs,pages,scripts,src}/**/*.js" --write')
