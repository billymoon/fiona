import Link from 'next/link
import { fiona, consume, Sample } from '../../app'

const Section = ({ seed }) =>
  <section>
    <h2>Quickstart...</h2>

    <p>Install via npm</p>
    
    <Sample>{`npm install fiona`}</Sample>
    
    <p>import into your app</p>
    
    <Sample>{`import fiona from 'fiona'`}</Sample>
    
    <p>or include in webpage from cdn</p>
    
    <Sample>{`<script src='https://cdn.jsdelivr.net/npm/fiona'></script>`}</Sample>

    <p><i>n.b. you can open the console and edit/run code samples from this page</i></p>

    <p>The most basic use case is to generate a random number</p>
    
    <Sample>{`fiona().number({ min: 0, max: 1000000 })`}</Sample>

    <Sample input={`
    const milesFromHome = fiona(${seed}).number()
    const age = fiona(${seed}).number({ max: 100 })
    `} output={`
    ${fiona(seed).number()}
    ${fiona(seed).number({ max: 100 })}
    `} />

    <p>It becomes more useful when creating data structures.</p>

    {/* TODO: json method should export double spaced indented output for the sample component */}
    <Sample input={`
    fiona(${seed}).object({
      milesFromHome: fiona.number(),
      age: seeded => seeded.number({ max: 100 })
    })
    `} output={`${JSON.stringify(fiona(seed).object({
      milesFromHome: fiona.number(),
      age: seeded => seeded.number({ max: 100 })
    }), null, 2)}`} />

    <p>There are lots of methods to help generate different types of data, you can read more about them in the <Link href='/api'><a>api section</a></Link>. These methods can be called on an instance to return a value, or on `fiona` itself to return a higher order function that when called with an instance, returns a value. Also, during recursion, any found functions are executed to resolve their value. Combining these things allows a very terse and powerful syntax to describe any data structure.</p>

    <Sample input={`
    fiona(${seed}).object({
      milesFromHome: fiona.number,
      age: fiona.number({ max: 100 }),
      name: {
        first: fiona.firstname,
        last: fiona.surname
      },
      iban: /[A-Z]{2}\\d{2}( \\d{4}){4,5} \\d{1,3}/,
      colour: fiona.oneOf(['red', 'yellow', 'blue'])
    })
    `} output={`${JSON.stringify(fiona(seed).object({
      milesFromHome: fiona.number,
      age: fiona.number({ max: 100 }),
      name: {
        first: fiona.firstname,
        last: fiona.surname
      },
      iban: /[A-Z]{2}\d{2}( \d{4}){4,5} \d{1,3}/,
      colour: fiona.oneOf(['red', 'yellow', 'blue'])
    }), null, 2)}`} />
  </section>

export default consume(Section)
