const { emptyDirSync, copySync, removeSync } = require('fs-extra')

const { exec } = require('./utils')

exec('node scripts/lint')

exec('node scripts/coverage')

exec('webpack --profile --json > webpack-stats.json')
exec(
  'webpack --config webpack.config.core.js --profile --json > webpack-stats.core.json'
)

exec('size-limit')

emptyDirSync('static/reports/coverage')
copySync('coverage/lcov-report', 'static/reports/coverage')
removeSync('coverage')

emptyDirSync('static/reports/size')
exec(
  'webpack-bundle-analyzer webpack-stats.json -m static -r static/reports/size/main.html -O'
)
exec(
  'webpack-bundle-analyzer webpack-stats.core.json -m static -r static/reports/size/core.html -O'
)
removeSync('webpack-stats.json')
removeSync('webpack-stats.core.json')

// // TODO: figure out how to generate this during server build, so how to deal with `dot` command
// exec(
//   'depcruise -X "^node_modules" --prefix "https:////github.com/billymoon/fiona/blob/master/" --output-type dot src/index.js | dot -T svg > static/dependency-graph.svg'
// )

exec('next build && next export')

// exec(`
// if [ -n "$(git status --porcelain)" ]; then
//   echo "Working directory is not clean";
//   exit 1;
// else
//   npm --no-git-tag-version version patch;
//   git add package.json
//   git commit -m "bump"
//   git tag $(node -p "require('./package').version")
//   git push --tags
//   git push
//   npm publish
// fi`)
// task.$.log(`published version $(node -p "require('./package').version") to npm`)
// task.$.log(`pushed version $(node -p "require('./package').version") to git`)
