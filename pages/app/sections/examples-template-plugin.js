import React from 'react'
import { injectState } from 'freactal'
import _ from 'lodash'

import { Sample, fiona } from '../'

const type = item => item.constructor.toString().slice(9, -20)

const Section = ({ state: { seed } }) =>
  <section>
    <h3>Template Plugin</h3>

    <p>To build a custom template plugin, you could use any template language. This example uses a lodash template.</p>

    <Sample input={`
    const type = item => item.constructor.toString().slice(9, -20)

    fiona.fn.template = function (argOne, ...args) {
        let templateString

        if (type(argOne) === 'Array' && argOne.raw && type(argOne.raw) === 'Array') {
            // duck type string template, join it up into string
            templateString = argOne.reduce((a, b) => a + args.shift().toString() +  b)
        } else if (type(argOne) === 'Function') {
            // assume function returns template string
            templateString = argOne(this.value())
        } else if (type(argOne) === 'String') {
            // assume string is template string
            templateString = argOne
        }

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
    fiona.fn.template = function (argOne, ...args) {
      let templateString

      if (type(argOne) === 'Array' && argOne.raw && type(argOne.raw) === 'Array') {
          // duck type string template, join it up into string
        templateString = argOne.reduce((a, b) => a + args.shift().toString() + b)
      } else if (type(argOne) === 'Function') {
          // assume function returns template string
        templateString = argOne(this.value())
      } else if (type(argOne) === 'String') {
          // assume string is template string
        templateString = argOne
      }

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
