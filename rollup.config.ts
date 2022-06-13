import type { IPackageJson } from 'package-json-type'
import type { RollupOptions, OutputOptions } from 'rollup'
import externals from 'rollup-plugin-node-externals'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS as BABEL_DEFAULT_EXTENSIONS } from '@babel/core'
import { terser } from 'rollup-plugin-terser'

import packageJson from './package.json'

const pkgJson = packageJson as IPackageJson // coerce to the right type

const outputDefaults: OutputOptions = {
  // always provide a sourcemap for better debugging for consumers
  sourcemap: true,
  // don't duplicate source code in the sourcemap as we already provide the
  // source code with the package. also makes the sourcemap _much_ smaller
  sourcemapExcludeSources: true,
}

const configs: RollupOptions[] = [{
  // use package.json conventions supported by existing tools like microbundle (https://github.com/developit/microbundle)
  input: pkgJson.source,
  output: [{
    // ESM for current/maintained environments
    file: pkgJson.module,
    format: 'esm',
    ...outputDefaults,
  }, {
    // CJS for compat with older environments (don't use `.cjs` extension as older envs don't support it)
    file: pkgJson.main,
    format: 'cjs',
    ...outputDefaults,
  }, {
    // UMD for older envs or no package manager
    file: pkgJson['umd:main'],
    format: 'umd',
    name: pkgJson.name,
    plugins: [terser({
      // https://github.com/babel/preset-modules#important-minification
      ecma: 2017,
      safari10: true,
    })],
    ...outputDefaults,
  }],
  plugins: [
    externals(),
    nodeResolve(),
    commonjs(),
    babel({
      // don't transpile externals
      exclude: 'node_modules/**',
      // suport TS
      extensions: [...BABEL_DEFAULT_EXTENSIONS, 'ts', 'tsx'],
      // use @babel/runtime since we're building a library
      babelHelpers: 'runtime',
    })
  ]
}]

export default configs
