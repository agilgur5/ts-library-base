module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV) // cache based on NODE_ENV

  // normally use browserslistrc, but for Jest, use current version of Node
  const isTest = api.env('test')
  const jestTargets = { targets: { node: 'current' } }
  let presetEnv = '@babel/preset-env'
  if (isTest) presetEnv = [presetEnv, jestTargets]

  return {
    presets: [
      presetEnv,
      '@babel/preset-typescript',
    ],
  }
}
