import { writeFileSync } from 'fs'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import alias from '@rollup/plugin-alias'
import { version } from './package.json'

writeFileSync(
  'config.js',
  `/* auto generated */ export default ${JSON.stringify({ version })}`
)

const config = {
  input: 'src',
  output: {
    file: 'fiona.min.js',
    format: 'umd',
    name: 'Fiona'
  },
  plugins: [
    alias({
      entries: {
        './config.js': './../../config.js'
      }
    }),
    resolve(),
    commonjs(),
    terser()
  ]
}

export default [
  config,
  {
    ...config,
    input: 'src/core',
    output: { ...config.output, file: 'fiona.core.min.js' }
  }
]
