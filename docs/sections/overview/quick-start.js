import Link from 'next/link'
import { Fiona, consume, Sample } from '../../app'

const Section = ({ seed }) => (
  <section>
    <h2>Getting started</h2>

    <p>Install via npm</p>

    <Sample lang="none">{`npm install fiona`}</Sample>

    <p>import into your app</p>

    <Sample>{`import Fiona from 'fiona'`}</Sample>

    <p>or include in webpage from cdn</p>

    <Sample lang="html">{`<script src='https://cdn.jsdelivr.net/npm/fiona'></script>`}</Sample>

    <p>
      <i>
        n.b. you can open the console and edit/run code samples from this page
      </i>
    </p>

    <p>The most basic use case is to generate a random number</p>

    <Sample>{`Fiona().number()`}</Sample>

    <Sample
      input={`
    const milesFromHome = Fiona(${seed}).number()
    const age = Fiona(${seed}).number({ max: 100 })
    `}
      output={`
    ${Fiona(seed).number()}
    ${Fiona(seed).number({ max: 100 })}
    `}
    />

    <p>
      It becomes more useful when creating data structures. With registered
      functions, you can use the shorthand capitalized Constructors within data
      structures for a very terse syntax.
    </p>

    {/* TODO: json method should export double spaced indented output for the sample component */}
    <Sample
      input={`
    Fiona(${seed}).object({
      milesFromHome: Fiona.Number,
      age: Fiona.Number({ max: 100 })
    })
    `}
      output={`\n${JSON.stringify(
        Fiona(seed).object({
          milesFromHome: Fiona.Number(),
          age: Fiona.Number({ max: 100 })
        }),
        null,
        2
      )}`}
    />

    <p>
      As requirements develop, you can add values to the structure without the
      original values changing, this is because the seeded random number
      generator uses a combination of the seed Fiona is initialised with, and
      the pathname of the property being resolved.
    </p>

    <Sample
      input={`
    Fiona(${seed}).object({
      milesFromHome: Fiona.Number,
      name: Fiona.Fullname,
      age: Fiona.Number({ max: 100 })
    })
    `}
      output={`\n${JSON.stringify(
        Fiona(seed).object({
          milesFromHome: Fiona.Number(),
          name: Fiona.Fullname,
          age: Fiona.Number({ max: 100 })
        }),
        null,
        2
      )}`}
    />

    <p>
      There are lots of methods to help generate different types of data, you
      can read more about them in the{' '}
      <Link href="/api">
        <a>api section</a>
      </Link>
      . These methods can be called on an instance to return a value, or on
      `Fiona` itself to return a higher order function that when called with an
      instance, returns a value. Also, during recursion, any found functions are
      executed to resolve their value. Combining these things allows a very
      terse and powerful syntax to describe any data structure.
    </p>

    <Sample>{`
    // use a regex pattern to generate strings that match
    const ibanPattern = /[A-Z]{2}\\d{2}( \\d{4}){4,5} \\d{1,3}/
    `}</Sample>

    <Sample
      input={`
    Fiona(${seed}).object({
      milesFromHome: Fiona.Number,
      age: Fiona.Number({ max: 100 }),
      name: Fiona.Fullname,
      iban: ibanPattern,
      colour: Fiona.OneOf([
        'red',
        'yellow',
        'blue'
      ])
    })
    `}
      output={`\n${JSON.stringify(
        Fiona(seed).object({
          milesFromHome: Fiona.Number,
          age: Fiona.Number({ max: 100 }),
          name: Fiona.Fullname,
          iban: /[A-Z]{2}\d{2}( \d{4}){4,5} \d{1,3}/,
          colour: Fiona.OneOf(['red', 'yellow', 'blue'])
        }),
        null,
        2
      )}`}
    />
  </section>
)

export default consume(Section)
