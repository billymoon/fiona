import { fiona, consume, Sample } from '../../app'

const Section = ({ seed }) =>
  <section>
    <h2>Weighting</h2>

    <p>The idea of adding a weighting to the output of random allows for powerful manipulation of large sets of pseudo random data. For example, the distribution of income is not even, where many more people are on low income than high. If we simply choose from 10,000 to 1,000,000 then the average income would be around 505,000. If we add weighting, we can make this represent our target distribution much more accurately.</p>

    <Sample input={`
    const cube = i => i * i * i

    fiona(${seed}).distribution(cube).number({ min: 10000, max: 100000 })
    fiona(${seed + 1}).distribution(cube).number({ min: 10000, max: 100000 })
    fiona(${seed + 2}).distribution(cube).number({ min: 10000, max: 100000 })
    fiona(${seed + 3}).distribution(cube).number({ min: 10000, max: 100000 })
    fiona(${seed + 4}).distribution(cube).number({ min: 10000, max: 100000 })
    `} output={`


    ${fiona(seed).distribution(i => i * i * i).number({ min: 10000, max: 100000 })}
    ${fiona(seed + 1).distribution(i => i * i * i).number({ min: 10000, max: 100000 })}
    ${fiona(seed + 2).distribution(i => i * i * i).number({ min: 10000, max: 100000 })}
    ${fiona(seed + 3).distribution(i => i * i * i).number({ min: 10000, max: 100000 })}
    ${fiona(seed + 4).distribution(i => i * i * i).number({ min: 10000, max: 100000 })}
    `}>{`
    // salary is integer between 10,000 and 100,000 but much more likely to be low
    `}</Sample>

    <div className='clearfix' />

    <p>The weighting function takes a floating point number from 0-1 and returns a number from 0-1. Bezier easing functions are a nice way to shape your data.</p>

    <Sample input={`
    import bezierEasing from 'bezier-easing'

    const salaryDistribution = bezierEasing(0.5, 0.5, 1, 0)

    fiona(${seed}).distribution(salaryDistribution).number({ min: 10000, max: 100000 })
    fiona(${seed + 1}).distribution(salaryDistribution).number({ min: 10000, max: 100000 })
    fiona(${seed + 2}).distribution(salaryDistribution).number({ min: 10000, max: 100000 })
    fiona(${seed + 3}).distribution(salaryDistribution).number({ min: 10000, max: 100000 })
    fiona(${seed + 4}).distribution(salaryDistribution).number({ min: 10000, max: 100000 })
    `} output={`




    ${fiona(seed).distribution(require('bezier-easing')(0.5, 0.5, 1, 0)).number({ min: 10000, max: 100000 })}
    ${fiona(seed + 1).distribution(require('bezier-easing')(0.5, 0.5, 1, 0)).number({ min: 10000, max: 100000 })}
    ${fiona(seed + 2).distribution(require('bezier-easing')(0.5, 0.5, 1, 0)).number({ min: 10000, max: 100000 })}
    ${fiona(seed + 3).distribution(require('bezier-easing')(0.5, 0.5, 1, 0)).number({ min: 10000, max: 100000 })}
    ${fiona(seed + 4).distribution(require('bezier-easing')(0.5, 0.5, 1, 0)).number({ min: 10000, max: 100000 })}
    `} />

    <div className='clearfix' />

    <p>You can also clamp or otherwise manipulate the output with weighting functions...</p>

    <Sample input={`
    fiona(${seed}).distribution(i => i < 0.4 ? 0.4 : i).number({ max: 100000 })
    fiona(${seed + 1}).distribution(i => i < 0.4 ? 0.4 : i).number({ max: 100000 })
    fiona(${seed + 2}).distribution(i => i < 0.4 ? 0.4 : i).number({ max: 100000 })
    fiona(${seed + 3}).distribution(i => i < 0.4 ? 0.4 : i).number({ max: 100000 })
    fiona(${seed + 4}).distribution(i => i < 0.4 ? 0.4 : i).number({ max: 100000 })
    `} output={`
    ${fiona(seed).distribution(i => i < 0.4 ? 0.4 : i).number({ max: 100000 })}
    ${fiona(seed + 1).distribution(i => i < 0.4 ? 0.4 : i).number({ max: 100000 })}
    ${fiona(seed + 2).distribution(i => i < 0.4 ? 0.4 : i).number({ max: 100000 })}
    ${fiona(seed + 3).distribution(i => i < 0.4 ? 0.4 : i).number({ max: 100000 })}
    ${fiona(seed + 4).distribution(i => i < 0.4 ? 0.4 : i).number({ max: 100000 })}
    `}>{`
    // any salary that would have been less than 40k will be 40k because the number method
    // is based on a call to random which has been passed through the weighting function
    `}</Sample>

    <div className='clearfix' />
  </section>

export default consume(Section)
