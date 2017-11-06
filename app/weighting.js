import { injectState } from 'freactal'

import { Sample } from './'

export default injectState(({ state: { seed } }) =>
  <section>
    <h2>Weighting</h2>

    <p>The idea of adding a weighting to the output of random allows for powerful manipulation of large sets of pseudo random data. For example, the distribution of income is not even, where many more people are on low income than high. If we simply choose from 10,000 to 1,000,000 then the average income would be around 505,000. If we add weighting, we can make this represent our target distribution much more accurately.</p>

    <Sample>{`
    const salary = fiona(${seed}).weighting(i => i * i * i).number(100000, 10000)
    // salary is integer between 10,000 and 100,000 but much more likely to be low
    `}</Sample>

    <div className='clearfix' />

    <p>The weighting function takes a floating point number from 0-1 and returns a number from 0-1. Bezier easing functions are a nice way to shape your data.</p>

    <Sample>{`
    import bezierEasing from 'bezier-easing'
    const salary = fiona(${seed}).weighting(bezierEasing(0.5, 1, 0, 1)).number(100000, 10000)
    `}</Sample>

    <div className='clearfix' />

    <p>You can also clamp or otherwise manipulate the output with weighting functions...</p>

    <Sample>{`
    const salary = fiona(${seed}).weighting(i => i < 0.1 ? 0.1 : i).number(100000)
    // any salary that would have been less than 10k will be 10k because the number method
    // is based on a call to random which has been passed through the weighting function
    `}</Sample>

    <div className='clearfix' />
  </section>
)
