// node core deps
const childProcess = require('child_process')
const { mkdirSync } = require('fs')

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

export async function sizelimit (task) {
  exec('npm run size-limit')
}

export async function reports (task) {
  task.serial(['coverage', 'buildsize'])
}

export async function buildsize (task) {
  await task.clear('static/reports/size')
  mkdirSync('static/reports/size')
  // TODO: why does this not resolve files in stats file
  exec('webpack-bundle-analyzer static/webpack-stats.json -m static -r static/reports/size/main.html -O')
  exec('webpack-bundle-analyzer static/webpack-stats.core.json -m static -r static/reports/size/core.html -O')
}

export async function coverage (task) {
  exec('jest --coverage')
  task.clear('static/reports/coverage')
    .source('coverage/lcov-report/**')
    .target('static/reports/coverage')
    .clear('coverage')
}

export async function build (task) {
  task.serial(['fiona', 'docs', 'core', 'reports', 'sizelimit'])
}

export async function fiona (task) {
  exec('webpack --profile --reporter json > static/webpack-stats.json')
}

export async function docs (task) {
  exec('next build')
}

export async function core (task) {
  exec('webpack --config webpack.config.core.js --profile --reporter json > static/webpack-stats.core.json')
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
