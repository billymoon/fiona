import { provideState, injectState, update } from 'freactal'

import fiona from '../src/fiona'
import '../plugins'

import { Logo, Shelf } from '../components'
import { Layout } from '../app'

if (process.browser) {
  window.fiona = fiona
}

const InteractiveLogo = injectState(({ state: { blink, seed, interval }, effects: { clickSeed } }) =>
  <div>
    <Logo selected={seed === 952684 ? 0 : seed} className={blink && interval ? 'blink' : ''} clickHandler={index => () => clickSeed(index)} />
    <style global jsx>{`
      svg {
        width: 500px;
        max-width: 100%;
        height: auto;
        -webkit-user-select: none; /* webkit (safari, chrome) browsers */
        -moz-user-select: none; /* mozilla browsers */
        -khtml-user-select: none; /* webkit (konqueror) browsers */
        -ms-user-select: none; /* IE10+ */
      }
      svg path {
        // stroke: #bd10e0;
        stroke: #000;
      }
      svg path.inner {
        fill: #fff;
      }
      svg.blink g.selected path.inner {
        fill: #bd10e0;
      }
      svg path.inner:hover, svg path.outer:hover {
        cursor: pointer;
      }
      svg g.filled path.inner {
        fill: #000;
      }
      svg g.filled.selected path.inner {
        fill: #bd10e0;
      }
      svg path.outer {
        stroke: #000;
        fill: #000;
      }
      svg g.selected path.outer {
        stroke: #bd10e0;
        fill: #bd10e0;
      }
    `}</style>
  </div>
)

const DynamicOverview = injectState(({ state: { seed } }) =>
  <p>{fiona(seed).regex(`Fiona is a (helper|tool|library) for (creating|generating) (large)? (chunks|sets) of (seeded|pseudo|mock) random data\\. (At it's core it uses|It is based around) a (Xorshift(256)? )?(PRNG|pseudo random number generator) that (enables|assists with|makes a mockery of) (generating|creating) (repeatable|predictable) (seemingly|apparently|authentic (feeling|looking)) random data\\.`)}</p>
)

const QuickStart = injectState(({ state: { seed } }) =>
  <section>
    <h2>Quickstart</h2>

    <p>Install via npm in usual way (<code>npm install fiona</code> and import into your app <code>import fiona from 'fiona'</code>) or from cdn (<code>{`<script src='https://cdn.jsdelivr.net/npm/fiona'></script>`}</code>)</p>

    <p><i>n.b. you can open the console and edit/run code from this page</i></p>

    <p>The most basic use case is to generate a random number: <code>{`fiona({ max: 1000000, min: 0 }).number()`}</code></p>

    <Sample title='input'>{`
    const myNumber = fiona(${seed}).number()
    const age = fiona(${seed}).number({ max: 100 })
    `}</Sample>

    <Sample title='output'>
      {'\n' + fiona(seed).number() +
       '\n' + fiona(seed).number({ max: 100 })
      }
    </Sample>

    <div className='clearfix' />

    <p>It becomes more useful when creating data structures.</p>

    <Sample title='input'>{`
    const ibanregex = /[A-Z]{2}\\d{2}( \\d{4}){4,5} \\d{1,3}/

    fiona(${seed}).data({
      age: ({ seeded }) => seeded.number({ max: 100 }),
      name: ({ seeded }) => seeded.name(),
      iban: ({ seeded }) => seeded.regex(ibanregex),
      favouriteColor: ({ seeded }) => seeded.oneOf([
        'red',
        'yellow',
        'blue'
      ])
    })
    `}</Sample>
    <Sample title='output'>
      {'\n\n\n' + JSON.stringify(fiona(seed).data({
        age: ({ seeded }) => seeded.number({ max: 100 }),
        name: ({ seeded }) => seeded.name(),
        iban: ({ seeded }) => seeded.regex(/[A-Z]{2}\d{2}( \d{4}){4,5} \d{0,3}/),
        favouriteColor: ({ seeded }) => seeded.oneOf(['red', 'yellow', 'blue'])
      }), null, 2)}
    </Sample>

    <div className='clearfix' />
  </section>
)

const SeededPRNG = injectState(({ state: { seed } }) =>
  <section>
    <h2>Seeded pseudo random number generator</h2>

    <p>At it's core, fiona has a seeded prng that will give back approximately evenly distributed floating point numbers between 0 and 1. The seed defaults to <code>{`Math.random()`}</code> can be passed in during initialisation. <code>{`fiona(seed = Math.random())`}</code></p>

    <Sample title='input'>{`
    const seeded = fiona(${seed})
    seeded.number()
    seeded.number()
    `}</Sample>

    <Sample title='output'>
      {'\n// hint: change the seed in the page banner\n' + fiona(seed).number() +
       '\n' + fiona(seed).callback(function () { this.number(); return this }).number()
      }
    </Sample>

    <div className='clearfix' />

    <p>The prng sets the initial seed when fiona is initialised, then tracks new seeds generated in consistent sequence internally. The seed can be reset to the initial value, or any arbitrary value at any time. This makes it easy to ensure data is repeatable.</p>

    <Sample title='input'>{`
    const seeded = fiona(${seed})
    seeded.number()
    seeded.reseed(${(seed) + 1})
    seeded.number()
    seeded.reseed(null) // reset seed
    seeded.number()
    `}</Sample>

    <Sample title='output'>{(function () {
      const out = ['']
      const seeded = fiona(seed)
      out.push(seeded.number())
      seeded.reseed((seed) + 1)
      out.push(seeded.number())
      seeded.reseed(null)
      out.push(seeded.number())
      return out.join('\n\n')
    })()}</Sample>

    <div className='clearfix' />
  </section>
)

const Weighting = injectState(({ state: { seed } }) =>
  <section>
    <h2>Weighting</h2>

    <p>The idea of adding a weighting to the output of random allows for powerful manipulation of large sets of pseudo random data. For example, the distribution of income is not even, where many more people are on low income than high. If we simply choose from 10,000 to 1,000,000 then the average income would be around 505,000. If we add weighting, we can make this represent our target distribution much more accurately.</p>

    <Sample>{`
    const salary = fiona(${seed}).weighting(i => i * i * i).number(100000, 10000)
    // salary is integer between 10,000 and 100,000 but much more likely to be low
    `}</Sample>

    <div className='clearfix' />

    <p>The weighting function takes a floating point number from 0-1 and returns a number from 0-1. Bezier easing functions are a nice way to shape your data.</p>

    <Sample>{`
    import bezierEasing from 'bezier-easing'
    const salary = fiona(${seed}).weighting(bezierEasing(0.5, 1, 0, 1)).number(100000, 10000)
    `}</Sample>

    <div className='clearfix' />

    <p>You can also clamp or otherwise manipulate the output with weighting functions...</p>

    <Sample>{`
    const salary = fiona(${seed}).weighting(i => i < 0.1 ? 0.1 : i).number(100000)
    // any salary that would have been less than 10k will be 10k because the number method
    // is based on a call to random which has been passed through the weighting function
    `}</Sample>

    <div className='clearfix' />
  </section>
)

const ChainedDataBuilder = injectState(({ state: { seed } }) =>
  <section>
    <h2>Chained data builder</h2>

    <p>Fiona supports jQuery like chaining and extendable plugin system. There is a data builder that takes advantage of this system to assist in building complex data structures that can be modified without the existing values changing. This works by using an inline function to set the values on the data structure, which is passed a clone of the chained fiona instance seeded with the position in the data structure (the path of the function setting the value) as `seeded`.</p>

    <p>There are also some core helper methods for selecting random elements from arrays for example.</p>

    <Sample>{`
    const seeded = fiona(${seed})

    // add some data to the instance
    seeded.chain({
      species: 'human',
      gender: ({ seeded }) => seeded.oneOf(['Male', 'Female']),
      planet: ({ data }) => data.gender === 'Male' ? 'Mars' : 'Venus'
    })

    // add some more data later on (extends existing data)
    seeded.chain({
      sentence: ({ me, seeded }) => \`I am a \${me.value().gender} from \${me.value().planet}\`
    })

    // call .value to get data
    const plainOldObject = seeded.value()
    `}</Sample>

    <div className='clearfix' />

    <p>The chained data method works by recursing and traversing objects and arrays, and any functions it finds, it will execute them, passing them the current data, a new seeded instance based on position in the data structure, the position as a path and an array builder helper.</p>
  </section>
)

const Sample = ({ title, children, ...props }) => {
  const lines = children.split('\n')
  const lastline = lines[lines.length - 1]
  const indent = (/^ +$/.test(lastline) && lastline.length) || 0
  const code = lines.map(line => line.slice(indent)).join('\n')
  return (
    <div {...props}>
      <pre>
        <code>{title && <b>// {title}</b>}{code}</code>
      </pre>
      <style jsx>{`
        float: left;
        pre, code {
          white-space: pre-wrap;
          max-width: 100%;
        }
      `}</style>
    </div>
  )
}

export default provideState({
  initialState: () => ({
    seed: 24,
    blink: false,
    interval: null
  }),
  effects: {
    initialize: effects => state => Object.assign({}, state, {
      interval: process.browser && setInterval(effects.toggleBlink, 540)
    }),
    toggleBlink: update(state => ({
      blink: !state.blink
    })),
    clickSeed: update(({ interval, seed }, index) => {
      if (interval !== null) {
        clearInterval(interval)
      }

      const chosen = index === 0 ? 952684 : index

      return {
        interval: null,
        blink: false,
        seed: seed === chosen ? Math.floor(Math.random() * 33) : chosen
      }
    })
  }
})(() =>
  <Layout>
    <Shelf style={{ textAlign: 'center' }}><InteractiveLogo /></Shelf>
    <Shelf><DynamicOverview /></Shelf>
    <Shelf><QuickStart /></Shelf>
    <Shelf><SeededPRNG /></Shelf>
    <Shelf><Weighting /></Shelf>
    <Shelf><ChainedDataBuilder /></Shelf>
    <style global jsx>{`
      code {
        color: #bd10e0;
        font-family: Menlo,Monaco,Lucida Console,Liberation Mono, DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace, serif;
        font-size: 13px;
        line-height: 20px;
      }
      body {
        font-family: helvetica, arial, sans-serif;
        max-width: 900px;
        margin: auto;
      }
      .clearfix {
        clear: both;
      }
    `}</style>
  </Layout>
)
