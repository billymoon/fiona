import { fiona, consume, ApiSection, Sample } from '../../../../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.</small>Number</span>}>
    <p>A seeded utility to return a number, taking options min and max and precision, which default to 0 and 1,000,000 and 0.</p>

    <Sample input={`
    fiona(${seed}).number()
    fiona(${seed}).number({ max: 10 })
    fiona(${seed}).number({ min: 10, max: 20 })
    `} output={[
      fiona(seed).number(),
      fiona(seed).number({ max: 10 }),
      fiona(seed).number({ min: 10, max: 20 })
    ].join('\n')} />

    <p>If you add a precision, instead of an integer you will get a float rounded to specified precision.</p>

    <Sample input={`
    fiona(${seed}).number({ precision: 2 })
    fiona(${seed}).number({ precision: -2 })
    `} output={[
    fiona(seed).number({ precision: 2 }),
    fiona(seed).number({ precision: -2 })
    ].join('\n')} />
  </ApiSection>

export default consume(Section)
