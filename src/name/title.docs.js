import { fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.</small>Title</span>}>
    <p>A seeded utility to return a salutation, optionally taking a gender to adhere to.</p>

    <Sample input={`
    fiona(${seed}).title() // can be either gender
    fiona(${seed}).title({ gender: 'male' }) // always male
    `} output={`
    ${fiona(seed).title()}
    ${fiona(seed).title({ gender: 'male' })}
    `} />
  </ApiSection>

export default consume(Section)