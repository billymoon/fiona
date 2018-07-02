import { Sample } from '../../components'
import { fiona, injectState } from '../../app'

const Section = ({ state: { seed } }) =>
  <section>
    <h3>Template String</h3>

    <p>An easy way to build up a long string is to use a javascript template literal populated from data generated by fiona.</p>

    <Sample input={`
    const data = fiona(${seed}).data({
      name: fiona.call('name'),
      age: fiona.call('number', { max: 100 }),
      playThing: ({ data }) => data.age < 5 ? 'cuddly toys' : 'friends',
      sentences: ({ seeded, arr }) => arr(seeded.number({ min: 1, max: 5 }), fiona.call('sentence'))
    })

    const templateFunction = d => \`Dear \${d.name},

    I know you are \${d.age} years old, and like playing with \${d.playThing}.

    \${d.sentences.join('\\n\\n')}

    Have a nice day,

    Fiona
    x x x\`

    templateFunction(data)
    `} output={`
    ${(d => `Dear ${d.name},

    I know you are ${d.age} years old, and like playing with ${d.playThing}.

    ${d.sentences.join('\n\n    ')}

    Have a nice day,

    Fiona
    x x x
    `)(fiona(seed).data({
      name: fiona.call('name'),
      age: fiona.call('number', { max: 100 }),
      playThing: ({ data }) => data.age < 5 ? 'cuddly toys' : 'friends',
      sentences: ({ seeded, arr }) => arr(seeded.number({ min: 1, max: 5 }), fiona.call('sentence'))
    }))
    }`} />

    <div className='clearfix' />
  </section>

export default injectState(Section)
