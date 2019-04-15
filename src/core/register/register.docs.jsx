import { Fiona, consume, ApiSection, Sample } from '../../../docs/app'

const person = (seeded, { gender } = {}) =>
  seeded.object({
    gender: seeded => gender || seeded.gender(),
    title: ({ data }) => Fiona.Title({ gender: data.gender }),
    firstname: ({ data }) => Fiona.Firstname({ gender: data.gender }),
    lastname: Fiona.Surname
  })

Fiona.register(['person', person], ['luckyNumber', Fiona.Number({ max: 10 })])

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>register
      </span>
    }
  >
    <p>
      A utility for extending Fiona with custom methods, either as a one off, or
      for re-usable components.
    </p>

    <p>
      <b>n.b.</b> see Extending section in <a href="/">Overview</a>
    </p>

    <p>
      The <code>Fiona.register</code> method accepts one argument which should
      be a function that takes a seeded instance, and returns either a value, or
      the seeded instance to allow chaining.
    </p>

    <p>
      In this example we will create a <code>person</code> extension that
      generates some data for a person, ensuring the gender is correct for each
      data item.
    </p>

    <Sample>{`
    const person = (seeded, { gender }) => seeded.object({
      gender: seeded => gender || Fiona.Gender,
      title: ({ data }) => Fiona.Title({ gender: data.gender }),
      firstname: ({ data }) => Fiona.Firstname({ gender: data.gender }),
      lastname: Fiona.Surname
    })

    Fiona.register(['person', person])
    `}</Sample>

    <p>
      Alternatively, if you are registering a named function, you can jut pass
      the function and the name of the function will be used in registration
    </p>

    <Sample>{`
    Fiona.register(person)
    `}</Sample>

    <p>
      Multiple functions can be registered in one call by passing multiple
      arguments, and configured constructor shorthands can be used to define
      extensions. For example, to register the <code>person</code>, and{' '}
      <code>luckyNumber</code> extensions, you can do something like this.
    </p>

    <Sample>{`
    Fiona.register(person, ['luckyNumber', Fiona.Number({ max: 10 })])
    `}</Sample>

    <p>
      A <code>person</code> method is added to seeded instances
    </p>

    <Sample
      input={`
    Fiona(${seed}).person()
    `}
      output={`\n${JSON.stringify(Fiona(seed).person(), null, 2)}`}
    />

    <p>Arguments are passed through, so in this case specifying the gender</p>

    <Sample
      input={`
    Fiona(${seed}).person({ gender: 'female' })
    `}
      output={`\n${JSON.stringify(
        Fiona(seed).person({ gender: 'female' }),
        null,
        2
      )}`}
    />

    <p>
      A <code>Fiona.Person</code> constructor is added to use as shorthand
    </p>

    <Sample
      input={`
    Fiona(${seed}).array(3, Fiona.Person)
    `}
      output={`\n${JSON.stringify(
        Fiona(seed).array(3, Fiona.Person),
        null,
        2
      )}`}
    />

    <p>
      The shorthand constructor can also take arguments by calling it as a
      function
    </p>

    <Sample
      input={`
    Fiona(${seed}).array(3, Fiona.Person({ gender: 'female' }))
    `}
      output={`\n${JSON.stringify(
        Fiona(seed).array(3, Fiona.Person({ gender: 'female' })),
        null,
        2
      )}`}
    />
  </ApiSection>
)

export default consume(Section)
