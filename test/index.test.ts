import { describe, it, expect } from '@jest/globals'

import { sum } from '../src'

describe('sum', () => {
  it('adds two numbers together', () => {
    expect(sum(1, 1)).toEqual(2)
    expect(sum(0, 0)).toEqual(0)
    expect(sum(0, 1)).toEqual(1)
    expect(sum(100, 200)).toEqual(300)
    expect(sum(100, -200)).toEqual(-100)
  })
})
