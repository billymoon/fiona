const { emptyDirSync, copySync, removeSync } = require('fs-extra')

const { exec } = require('./utils')

exec('node scripts/lint')

exec('jest')

exec('size-limit')
