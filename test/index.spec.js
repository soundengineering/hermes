/* global describe, it, expect */

import Hermes from '../src/index'

describe('Hermes', () => {
  describe('lib shape', () => {
    it('should provide the Hermes instance', () => {
      expect(Hermes).toHaveProperty('db')
      expect(Hermes).toHaveProperty('loadParams')
      expect(Hermes).toHaveProperty('logger')
    })
  })
})
