import { fiona, consume, Sample } from '../../app'

const Section = ({ seed }) =>
  <section>
    <h2>Seeded pseudo random number generator</h2>

    <p>At it's core, fiona has a seeded prng that will give back approximately evenly distributed floating point numbers between 0 and 1. The seed defaults to <code>{`Math.random()`}</code> can be passed in during initialisation. <code>{`fiona(seed = Math.random())`}</code></p>

    <Sample input={`
    const seeded = fiona(${seed})
    seeded.number()
    seeded.number()
    `} output={`
    // hint: change the seed in the page banner
    ${(() => {
      const seeded = fiona(seed)
      return `${seeded.number()}\n    ${seeded.number()}`
    })()}
    `} />

    <p>The prng sets the initial seed when fiona is initialised, then tracks new seeds generated in consistent sequence internally. The seed can be reset to the initial value, or any arbitrary value at any time. This makes it easy to ensure data is repeatable.</p>

    <Sample input={`
    const seeded = fiona(${seed})
    seeded.number()
    seeded.reseed(${(seed) + 1})
    seeded.number()
    seeded.reseed(null) // reset seed
    seeded.number()
    `} output={`${(() => {
      const out = ['']
      const seeded = fiona(seed)
      out.push(seeded.number())
      seeded.reset((seed) + 1)
      out.push(seeded.number())
      seeded.reset()
      out.push(seeded.number())
      return out.join('\n\n')
    })()}
    `} />
  </section>

export default consume(Section)
