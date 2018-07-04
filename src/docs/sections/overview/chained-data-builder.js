import { injectState, Sample } from '../../app'

const Section = ({ state: { seed } }) =>
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

export default injectState(Section)
