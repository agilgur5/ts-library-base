/** @type {import('@babel/core').ConfigFunction} */
module.exports = api => {
  api.cache.using(() => process.env['NODE_ENV']) // cache based on NODE_ENV

  // normally use browserslistrc, but for Jest, use current version of Node
  const isTest = api.env('test')
  const jestTargets = { targets: { node: 'current' } }
  /** @type {import('@babel/core').PluginItem} */
  let presetEnv = '@babel/preset-env'
  if (isTest) presetEnv = [presetEnv, jestTargets]

  return {
    presets: [
      presetEnv,
      '@babel/preset-typescript',
    ],
  }
}
