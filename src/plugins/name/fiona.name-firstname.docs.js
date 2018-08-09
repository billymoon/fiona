import { fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>firstname</span>}>
    <p>A seeded utility to return a single firstname, optionally taking a gender to adhere to.</p>

    <Sample input={`
    fiona(${seed}).firstname() // can be either gender
    fiona(${seed}).firstname({ gender: 'male' }) // always male
    `} output={`
    ${fiona(seed).firstname()}
    ${fiona(seed).firstname({ gender: 'male' })}
    `} />
  </ApiSection>

export default consume(Section)
