import { injectState } from 'freactal'
import fiona from '../../src/fiona'

import { Sample } from './'

export default injectState(({ state: { seed } }) =>
  <section>
    <h2>Seeded pseudo random number generator</h2>

    <p>At it's core, fiona has a seeded prng that will give back approximately evenly distributed floating point numbers between 0 and 1. The seed defaults to <code>{`Math.random()`}</code> can be passed in during initialisation. <code>{`fiona(seed = Math.random())`}</code></p>

    <Sample input={`
    const seeded = fiona(${seed})
    seeded.number()
    seeded.number()
    `} output={`
    // hint: change the seed in the page banner
    ${fiona(seed).number()}
    ${fiona(seed).callback(function () { this.number(); return this }).number()}
    `} />

    <p>The prng sets the initial seed when fiona is initialised, then tracks new seeds generated in consistent sequence internally. The seed can be reset to the initial value, or any arbitrary value at any time. This makes it easy to ensure data is repeatable.</p>

    <Sample input={`
    const seeded = fiona(${seed})
    seeded.number()
    seeded.reseed(${(seed) + 1})
    seeded.number()
    seeded.reseed(null) // reset seed
    seeded.number()
    `} output={`${(function () {
      const out = ['']
      const seeded = fiona(seed)
      out.push(seeded.number())
      seeded.reseed((seed) + 1)
      out.push(seeded.number())
      seeded.reseed(null)
      out.push(seeded.number())
      return out.join('\n\n')
    })()}
    `} />
  </section>
)
