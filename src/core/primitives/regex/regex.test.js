import test from 'ava'
import Fiona from '../..'
import RegexPlugin from '../../../regex/regex'
import RandExp from 'randexp'

let seeded

test.beforeEach(() => {
  seeded = Fiona('moon')
})

test.serial('should passthrough regex if plugin not registered', t => {
  const pattern = /of [01]{8} (ro|cy)bo(rg|t)s/
  t.deepEqual(seeded.object({ army: pattern }), { army: pattern })
})

test.serial('should handle regex if plugin registered', t => {
  Fiona.register(['regex', RegexPlugin(RandExp)])
  const pattern = /of [01]{8} (ro|cy)bo(rg|t)s/
  t.deepEqual(seeded.object({ army: pattern }), {
    army: 'of 00001011 cybots'
  })
})

test.serial(
  'should handle regex if plugin registered (with no arguments)',
  t => {
    t.is(Fiona(1).regex(), '34A7CFE87F5EFD77')
  }
)
