import { fiona, connect, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>firstnames</span>}>
    <p>A seeded utility to return firstnames, optionally taking a gender to adhere to. This is useful for producing more realistic name data where people might have multiple first and middle names.</p>

    <Sample input={`
    fiona(${seed}).firstnames() // can be either gender
    fiona(${seed}).firstnames({ gender: 'male' }) // always male
    `} output={`
    ${fiona(seed).firstnames()}
    ${fiona(seed).firstnames({ gender: 'male' })}
    `} />
  </ApiSection>

export default connect(Section)
