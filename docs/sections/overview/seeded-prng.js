import { Fiona, consume, Sample } from '../../app'

const Section = ({ seed }) => (
  <section>
    <h2>Seeded pseudo random number generator</h2>

    <p>
      At it's core, Fiona has a seeded prng that will give back approximately
      evenly distributed floating point numbers between 0 and 1 just like
      Math.random, but in a pre-determined order based on the seed. The seed
      defaults to <code>Math.random()</code> but can be passed in during
      initialisation when you want consistent output.
    </p>

    <Sample
      input={`
    const seeded = Fiona(${seed})
    seeded.number()
    seeded.number()
    `}
      output={`\n// same seed produces same results each time\n${Fiona(
        seed
      ).array(2, Fiona.Number, '\n')}`}
    />

    {/* TODO: figure out how to render random seed on server and client the same for first render
    <Sample input={`
    const seeded = Fiona()
    seeded.number()
    seeded.number()
    `} output={`\n// without setting a seed, results change each time\n${Fiona().array(2, Fiona.Number, '\n')}`} />
    */}

    <p>n.b. you can change the seed by choosing the dots in the page banner</p>

    <p>
      The prng sets the initial seed when Fiona is initialised, then tracks new
      seeds generated in consistent sequence internally. The seed can be reset
      to the initial value, or any arbitrary value at any time. This makes it
      easy to ensure data is repeatable.
    </p>

    <Sample
      input={`
    const seeded = Fiona(${seed})

    seeded.number()
    seeded.reset(${seed + 1})
    seeded.number()
    seeded.reset()
    seeded.number()
    `}
      output={`\n\n\n${(seeded =>
        [
          seeded.number(),
          seeded.reset(seed + 1).number(),
          seeded.reset().number()
        ].join('\n\n'))(Fiona(seed))}
    `}
    />
  </section>
)

export default consume(Section)
