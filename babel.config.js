/** @type {import('@babel/core').ConfigFunction} */
module.exports = api => {
  api.cache.using(() => process.env['NODE_ENV']) // cache based on NODE_ENV

  // normally use browserslistrc, but for Jest, use current version of Node
  const isTest = api.env('test')
  const jestTargets = { targets: { node: 'current' } }
  /** @type {[import('@babel/core').PluginTarget, import('@babel/core').PluginOptions]} */
  const presetEnv = ['@babel/preset-env', { bugfixes: true }]
  if (isTest) presetEnv[1] = { ...presetEnv[1], ...jestTargets }

  return {
    presets: [
      presetEnv,
      '@babel/preset-typescript',
    ],
    plugins: [
      // used with @rollup/plugin-babel
      '@babel/plugin-transform-runtime',
    ]
  }
}
