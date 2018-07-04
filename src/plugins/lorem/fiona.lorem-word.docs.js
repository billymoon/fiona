import { fiona, injectState, ApiSection, Sample } from '../../docs/app'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>word</span>}>
    <p>A seeded utility to return a single word from lorem ipsum text.</p>

    <Sample input={`
    fiona(${seed}).word()
    `} output={`
    ${fiona(seed).word()}
    `} />
  </ApiSection>

export default injectState(Section)
