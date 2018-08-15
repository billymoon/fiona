import { fiona, consume, Sample } from '../../app'

const Section = ({ seed }) =>
  <section>
    <h2>Quickstart...</h2>

    <p>Install via npm in usual way (<code>npm install fiona</code> and import into your app <code>import fiona from 'fiona'</code>) or from cdn (<code>{`<script src='https://cdn.jsdelivr.net/npm/fiona'></script>`}</code>)</p>

    <p><i>n.b. you can open the console and edit/run code from this page</i></p>

    <p>The most basic use case is to generate a random number: <code>{`fiona().number({ max: 1000000, min: 0 })`}</code></p>

    <Sample input={`
    const myNumber = fiona(${seed}).number()
    const age = fiona(${seed}).number({ max: 100 })
    `} output={`
    ${fiona(seed).number()}
    ${fiona(seed).number({ max: 100 })}
    `} />

    <p>It becomes more useful when creating data structures.</p>

    <Sample input={`
    const iban = /[A-Z]{2}\\d{2}( \\d{4}){4,5} \\d{1,3}/

    fiona(${seed}).data({
      age: ({ seeded }) => seeded.number({ max: 100 }),
      fullname: ({ seeded }) => seeded.fullname(),
      iban: ({ seeded }) => seeded.regex(iban),
      favouriteColour: ({ seeded }) => seeded.oneOf([
        'red',
        'yellow',
        'blue'
      ])
    })
    `} output={`\n\n\n${JSON.stringify(fiona(seed).data({
      age: ({ seeded }) => seeded.number({ max: 100 }),
      fullname: ({ seeded }) => seeded.fullname(),
      iban: ({ seeded }) => seeded.regex(/[A-Z]{2}\d{2}( \d{4}){4,5} \d{0,3}/),
      favouriteColour: ({ seeded }) => seeded.oneOf(['red', 'yellow', 'blue'])
    }), null, 2)}`} />

    <p>By using plugins, and <code>{`fiona.call`}</code> to architect your data, the defenitions become very re-usable, terse and readable.</p>

    <Sample>{`
    const iban = /[A-Z]{2}\\d{2}( \\d{4}){4,5} \\d{1,3}/

    const colorChooser = fiona.call('oneOf', [
      'red',
      'yellow',
      'blue'
    ])
    `}</Sample>

    <Sample input={`
    fiona(${seed}).data({
      age: fiona.call('number', { max: 100 }),
      fullname: fiona.call('fullname'),
      iban: fiona.call('regex', iban),
      favouriteColour: colorChooser
    })
    `} output={`\n${JSON.stringify(fiona(seed).data({
      age: fiona.call('number', { max: 100 }),
      fullname: fiona.call('fullname'),
      iban: fiona.call('regex', /[A-Z]{2}\d{2}( \d{4}){4,5} \d{0,3}/),
      favouriteColour: fiona.call('oneOf', ['red', 'yellow', 'blue'])
    }), null, 2)}`} />
  </section>

export default consume(Section)
