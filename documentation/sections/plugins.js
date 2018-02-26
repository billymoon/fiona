import { Sample } from '../app/'

const Section = ({ seed }) =>
  <section>
    <h2>Plugins</h2>

    <p>There is a very simple jQuery like plugin architecture, and some powerful plugins inluded in the fiona library. Pull requests adding more general use plugins very welcome. You can also create single use plugins as a means to extend the functionality of fiona on a case by case basis.</p>

    <p>To create a plugin that does not operate on a fiona instance, just attach it to the root fiona object...</p>

    <Sample>{`
    fiona.snakeToSpinalCase = input => input.replace(/_/g, '-')
    // ... then you can use like ...
    fiona.snakeToSpinalCase('some_case_string') //-> some-case-string
    `}</Sample>

    <p>To create a plugin that operates on a fiona instance and retuns a value, add to `fiona.fn`.</p>

    <p><i>n.b. use the es5 `function(){}` form so that the plugin uses the correct context</i></p>

    <Sample>{`
    fiona.fn.bottles = function () { return \`There are \${this.number({ max: 10 })} green bottles on the wall\` }
    // ... then you can use like ...
    fiona(${seed}).bottles()
    // will return something like  \`There are 7 green bottles on the wall\`
    // this will also work from inside a data structure ...
    fiona(${seed}).data({
      bottles: ({ seeded }) => seeded.bottles()
    })
    `}</Sample>

    <p>To create a chainable plugin, just return `this`</p>

    <Sample>{`
    fiona.fn.addFavouriteColor = function () {
      this.chain({
        favouriteColor: [this.number({ max: 255 }), this.number({ max: 255 }), this.number({ max: 255 })]
      })
      return this
    }
    // ... then you can use like ...
    const data = fiona(${seed}).chain({
      luckyNumber: ({ seeded }) => seeded.number({ min: 1, max: 10 })
    }).addFavouriteColor().value()
    // will return something like { luckyNumber: 7, favouriteColor: [223, 122, 154] }
    `}</Sample>
  </section>

export default Section
