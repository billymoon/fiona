/* global test expect describe */

const fiona = require('../..')
const regexPlugin = require('../../../regex/regex')

describe('plugin.regex (if registered)', () => {
  let seeded

  beforeEach(() => {
    seeded = fiona('moon')
  })

  test('should passthrough regex if plugin not registered', () => {
    const pattern = /of [01]{8} (ro|cy)bo(rg|t)s/
    expect(seeded.object({ army: pattern })).toEqual({ army: pattern })
  })

  test('should handle regex if plugin registered', () => {
    fiona.register(['regex', regexPlugin])
    const pattern = /of [01]{8} (ro|cy)bo(rg|t)s/
    expect(seeded.object({ army: pattern })).toEqual({ army: 'of 00001011 cybots' })
  })
})
