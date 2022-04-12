import type { Config } from '@jest/types'
import { defaults } from 'jest-config'

const config: Config.InitialOptions = {
  injectGlobals: false, // use @jest/globals
  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    '<rootDir>/test/' // ignore any test helper files
  ]
}

export default config
