import React from 'react'
import { injectState } from 'freactal'
import _ from 'lodash'

import { Sample, fiona } from '../'

const Section = ({ state: { seed } }) =>
  <section>
    <h3>Template Plugin</h3>

    <p>To build a custom template plugin, you could use any template language. This example uses a lodash template.</p>

    <Sample input={`
    fiona.fn.template = function (template, ...args) {
      const templateString = template.reduce((a, b) => a + args.shift().toString() + b)
      // assuming lodash is loaded
      // render template with values
      return _.template(templateString)(this.value())
    }

    fiona().chain({
        name: ({ seeded }) => seeded.name(),
        color: ({ seeded }) => seeded.oneOf(['red', 'orange', 'yellow', 'green', 'blue'])
    }).template\`Hi <%= name %>,

    Your favourite colour is <%= color %>.

    Have a nice day,

    Fiona
    x x x\`
    `} output={
    fiona.fn.template = function (template, ...args) {
      const templateString = template.reduce((a, b) => a + args.shift().toString() + b)
      // assuming lodash is loaded
      // render template with values
      return _.template(templateString)(this.value())
    },

    fiona(seed).chain({
      name: ({ seeded }) => seeded.name(),
      color: ({ seeded }) => seeded.oneOf(['red', 'orange', 'yellow', 'green', 'blue'])
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
