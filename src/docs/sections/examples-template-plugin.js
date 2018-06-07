import _ from 'lodash'

import { fiona, injectState } from '../app'
import { Sample } from '../components'

const Section = ({ state: { seed } }) =>
  <section>
    <h3>Template Plugin</h3>

    <p>To build a custom template plugin, you could use any template language. This example uses a lodash template.</p>

    <Sample input={`
    fiona.plugin('template', ({ seeded }, template, ...args) => {
      const templateString = template.reduce((a, b) => a + args.shift().toString() + b)
      // assuming lodash is loaded
      // render template with values
      return _.template(templateString)(seeded.value())
    })

    fiona(${seed}).chain({
        name: ({ seeded }) => seeded.name(),
        color: ({ seeded }) => seeded.oneOf(['red', 'orange', 'yellow', 'green', 'blue'])
    }).template\`Hi <%= name %>,

    Your favourite colour is <%= color %>.

    Have a nice day,

    Fiona
    x x x\`
    `} output={
    fiona.plugin('template', ({ seeded }, template, ...args) => {
      const templateString = template.reduce((a, b) => a + args.shift().toString() + b)
      // assuming lodash is loaded
      // render template with values
      return _.template(templateString)(seeded.value())
    }),

    fiona(seed).chain({
      name: fiona.call('name'),
      color: fiona.call('oneOf', ['red', 'orange', 'yellow', 'green', 'blue'])
    }).template`
    Hi <%= name %>,

    Your favourite colour is <%= color %>.

    Have a nice day,

    Fiona
    x x x
    `
    } />

    <div className='clearfix' />
  </section>

export default injectState(Section)