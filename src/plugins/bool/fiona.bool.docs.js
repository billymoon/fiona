import { fiona, connect, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>bool</span>}>
    <p>A seeded utility to return true or false. Takes `chance` option to change the probability of true as decimal value between 0 and 1 which defaults to 0.5.</p>

    <Sample input={`
    fiona(${seed}).bool()
    `} output={`
    ${fiona(seed).bool()}
    `} />
  </ApiSection>

export default connect(Section)
