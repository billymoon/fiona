import { fiona, consume, ApiSection, Sample } from '../../../docs/app'

const person = (seeded, { gender } = {}) => seeded.object({
  gender: seeded => gender || seeded.gender(),
  title: ({ data }) => fiona.Title({ gender: data.gender }),
  firstname: ({ data }) => fiona.Firstname({ gender: data.gender }),
  lastname: fiona.Surname
})

fiona.register(['person', person], ['luckyNumber', fiona.Number({ max: 10 })])

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.</small>register</span>}>
    <p>A utility for extending fiona with custom methods, either as a one off, or for re-usable components.</p>

    <p><b>n.b.</b> see Extending section in <a href='/'>Overview</a></p>

    <p>The <code>fiona.register</code> method accepts one argument which should be a function that takes a seeded instance, and returns either a value, or the seeded instance to allow chaining.</p>

    <p>In this example we will create a <code>person</code> extension that generates some data for a person, ensuring the gender is correct for each data item.</p>

    <Sample>{`
    const person = (seeded, { gender }) => seeded.object({
      gender: seeded => gender || fiona.Gender,
      title: ({ data }) => fiona.Title({ gender: data.gender }),
      firstname: ({ data }) => fiona.Firstname({ gender: data.gender }),
      lastname: fiona.Surname
    })

    fiona.register(['person', person])
    `}</Sample>

    <p>Alternatively, if you are registering a named function, you can jut pass the function and the name of the function will be used in registration</p>

    <Sample>{`
    fiona.register(person)
    `}</Sample>

    <p>Multiple functions can be registered in one call by passing multiple arguments, and configured constructor shorthands can be used to define extensions. For example, to register the <code>person</code>, and <code>luckyNumber</code> extensions, you can do something like this.</p>

    <Sample>{`
    fiona.register(person, ['luckyNumber', fiona.Number({ max: 10 })])
    `}</Sample>

    <p>A <code>person</code> method is added to seeded instances</p>
    
    <Sample input={`
    fiona(${seed}).person()
    `} output={`\n${JSON.stringify(fiona(seed).person(), null, 2)}`} />

    <p>Arguments are passed through, so in this case specifying the gender</p>

    <Sample input={`
    fiona(${seed}).person({ gender: 'female' })
    `} output={`\n${JSON.stringify(fiona(seed).person({ gender: 'female' }), null, 2)}`} />

    <p>A <code>fiona.Person</code> constructor is added to use as shorthand</p>

    <Sample input={`
    fiona(${seed}).array(3, fiona.Person)
    `} output={`\n${JSON.stringify(fiona(seed).array(3, fiona.Person), null, 2)}`} />

    <p>The shorthand constructor can also take arguments by calling it as a function</p>

    <Sample input={`
    fiona(${seed}).array(3, fiona.Person({ gender: 'female' }))
    `} output={`\n${JSON.stringify(fiona(seed).array(3, fiona.Person({ gender: 'female' })), null, 2)}`} />
  </ApiSection>

export default consume(Section)
