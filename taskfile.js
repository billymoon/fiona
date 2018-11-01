// node core deps
const childProcess = require('child_process')

// 3rd party deps
const Repo = require('git-tools')

/* utils */

const exec = cmd => childProcess.execSync(cmd, { encoding: 'utf8', stdio: ['inherit', 'inherit', 'inherit'] })

const repo = new Repo()
const git = method => new Promise(resolve => repo[method]((err, value) => resolve(value)))

/* tasks */

export async function lint (task) {
  exec('standard src/**/*.js')
}

export async function fix (task) {
  exec('standard --fix src/**/*.js')
}

export async function test (task) {
  exec('npm run test')
}

export async function reports (task) {
  task.serial(['coverage'])
}

export async function coverage (task) {
  exec('jest --coverage')
  task.clear('static/reports/coverage')
    .source('coverage/lcov-report/**')
    .target('static/reports/coverage')
    .clear('coverage')
}

export async function build (task) {
  task.serial(['fiona', 'docs', 'core', 'reports'])
}

export async function fiona (task) {
  exec('webpack')
}

export async function docs (task) {
  exec('next build')
}

export async function core (task) {
  exec('webpack --config webpack.config.core.js')
}

export async function deploy (task) {
  exec(`now alias $(now) fiona`)
  task.$.log('deployed to: https://fiona.now.sh')
}

export async function bump (task) {
  exec(`
  if [ -n "$(git status --porcelain)" ]; then
    echo "Working directory is not clean";
    exit 1;
  else
    npm --no-git-tag-version version patch;
    git add package.json
    git commit -m "bump"
    git tag $(node -p "require('./package').version")
    git push --tags
    git push
    npm publish
  fi`)
  task.$.log(`published version $(node -p "require('./package').version") to npm`)
  task.$.log(`pushed version $(node -p "require('./package').version") to git`)
}

export async function precommit (task) {
  task.serial(['test', 'lint'])
}

export async function postcommit (task) {
  const branch = await git('currentBranch')
  // if (branch === 'master') {
  //   task.start('deploy')
  //   task.start('bump')
  // }
  console.log('time to tag and push...')
}
