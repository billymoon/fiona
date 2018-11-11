/* global test expect describe */

const Fiona = require('../..')
const regexPlugin = require('../../../regex/regex')

describe('regex (if registered)', () => {
  let seeded

  beforeEach(() => {
    seeded = Fiona('moon')
  })

  test('should passthrough regex if plugin not registered', () => {
    const pattern = /of [01]{8} (ro|cy)bo(rg|t)s/
    expect(seeded.object({ army: pattern })).toEqual({ army: pattern })
  })

  test('should handle regex if plugin registered', () => {
    Fiona.register(['regex', regexPlugin])
    const pattern = /of [01]{8} (ro|cy)bo(rg|t)s/
    expect(seeded.object({ army: pattern })).toEqual({
      army: 'of 00001011 cybots'
    })
  })
})
