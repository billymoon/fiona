import { injectState } from 'freactal'
import fiona from '../src/fiona'

import { Sample } from './'

export default injectState(({ state: { seed } }) =>
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
