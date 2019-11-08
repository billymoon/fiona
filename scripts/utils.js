const childProcess = require('child_process')

const exec = cmd =>
  childProcess.execSync(cmd, {
    encoding: 'utf8',
    stdio: ['inherit', 'inherit', 'inherit']
  })

const execWithArgs = cmd => exec([cmd].concat(process.argv.slice(2)).join(' '))

module.exports = {
  exec,
  execWithArgs
}
