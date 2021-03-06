import babel from '@rollup/plugin-babel'
const typescript = require('rollup-plugin-typescript2')
const { terser } = require('rollup-plugin-terser')

const babelConfig = require('./babel.config')
const pkg = require('./package.json')

export default {
  input: 'percentile.ts',
  output: [
    {
      format: 'umd',
      dir: 'lib',
      sourcemap: true,
      name: pkg.name.replace(/^@[^\/]+\//, ''),
    },
    {
      format: 'es',
      dir: 'es',
      sourcemap: true,
    },
    {
      format: 'system',
      dir: 'system',
      sourcemap: true,
    },
    {
      format: 'cjs',
      dir: 'commonjs',
      sourcemap: true,
    },
    {
      format: 'amd',
      dir: 'amd',
      sourcemap: true,
    }
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      // tsconfigOverride: { compilerOptions: { target: 'ES2015' } }
    }),
    babel({
      ...babelConfig,
      babelHelpers: 'external',
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    terser(),
  ]
}