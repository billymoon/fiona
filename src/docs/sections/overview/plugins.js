import { consume, Sample } from '../../app'

// TODO: make samples render real values
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

    <p>To create a plugin that operates on a fiona instance and retuns a value, register with `fiona.plugin`. The first argument is an object providing `seeded`, subsequent arguments are passed through when calling the plugin</p>

    <Sample>{`
    fiona.plugin('bottles', (seeded, color) => {
        return \`There are \${seeded.number({ max: 10 })} \${color} bottles on the wall\`
    })

    // ... then you can use like ...
    fiona(${seed}).bottles('green')

    // will return something like  \`There are 7 green bottles on the wall\`
    // this will also work from inside a data structure ...
    fiona(${seed}).data({
      bottles: seeded => seeded.bottles('green')
    })
    `}</Sample>

    <p>To create a chainable plugin, just return seeded</p>

    <Sample>{`
    fiona.plugin('addFavouriteColor', seeded => {
      seeded.chain({
        favouriteColor: [
            seeded.number({ max: 255 }),
            seeded.number({ max: 255 }),
            seeded.number({ max: 255 })
        ]
      })
      return seeded
    })

    // ... then you can use like ...
    const data = fiona(${seed}).chain({
      luckyNumber: seeded => seeded.number({ min: 1, max: 10 })
    }).addFavouriteColor().value()

    // will return something like { luckyNumber: 7, favouriteColor: [223, 122, 154] }
    `}</Sample>
  </section>

export default consume(Section)
