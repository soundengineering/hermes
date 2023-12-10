/* global test expect */

import db from '../src/db/index.mjs'

test('db shape', async () => {
  expect(db).toHaveProperty('mongoose')
  expect(db).toHaveProperty('connect')

  expect(db).toHaveProperty('Channels')
  expect(db).toHaveProperty('Users')
})
