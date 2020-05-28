import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'percentile.ts',
  output: {
    format: 'cjs',
    dir: 'dist',
    sourcemap: true,
  },
  plugins: [
    typescript({
      outDir: 'dist',
      sourceMap: true,
    }),
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
}