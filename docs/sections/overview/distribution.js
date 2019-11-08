// TODO: do we need to include bezier easing library?
import bezierEasing from 'bezier-easing'
import { Fiona, consume, Sample } from '../../app'

const Section = ({ seed }) => (
  <section>
    <h2>Distribution</h2>

    <p>
      Adding distribution to the output of random allows for powerful
      manipulation of the results. For example, the distribution of income is
      not even, where many more people are on low income than high. If we simply
      choose from 10,000 to 1,000,000 then the average income would be around
      505,000 which is unrealistically high. If we add distribution, we can make
      this represent our target distribution much more accurately so the top and
      bottom income remain the same, but the values tend to be much closer to
      the bottom end of the scale.
    </p>

    <Sample
      input={`
    const tendToLow = i => i * i * i
    const income = seeded => seeded.distribution(tendToLow).number({ max: 100000 })

    Fiona(${seed}).array(5, income)
    `}
      output={`
    ${JSON.stringify(
      Fiona(seed).array(5, seeded =>
        seeded.distribution(i => i * i * i).number({ max: 100000 })
      )
    )}
    `}
    />

    <div className="clearfix" />

    <p>
      The distribution function takes a floating point number from 0-1 and
      returns a number from 0-1. Bezier easing functions are a nice way to shape
      your data.
    </p>

    <Sample
      input={`
    import bezierEasing from 'bezier-easing'

    const salaryDistribution = bezierEasing(0.5, 0.5, 1, 0)
    const income = seeded => seeded.distribution(salaryDistribution).number({ max: 100000 })

    Fiona(${seed}).array(5, income)
    `}
      output={`
    ${JSON.stringify(
      Fiona(seed).array(5, seeded =>
        seeded
          .distribution(bezierEasing(0.5, 0.5, 1, 0))
          .number({ min: 10000, max: 100000 })
      )
    )}
    `}
    />

    <div className="clearfix" />

    <p>
      You can also clamp or otherwise manipulate the output with distribution
      functions. In this example, any salary that would have been less than 40k
      will be 40k because the number method is based on a call to random which
      has been passed through the distribution function
    </p>

    <Sample
      input={`
    Fiona(${seed}).array(5, seeded => seeded.distribution(i => i < 0.4 ? 0.4 : i).number({ max: 100000 })
    `}
      output={`
    ${JSON.stringify(
      Fiona(seed).array(5, seeded =>
        seeded.distribution(i => (i < 0.4 ? 0.4 : i)).number({ max: 100000 })
      )
    )}
    `}
    />

    <div className="clearfix" />
  </section>
)

export default consume(Section)
