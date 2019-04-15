const { emptyDirSync, copySync, removeSync } = require('fs-extra')

const { exec } = require('./utils')

exec('node scripts/lint')

exec('npm run test')

exec('size-limit')
