import { fiona, injectState, ApiSection, Sample } from '../../docs/app'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>regex</span>}>
    <p>A very general use, seeded utility to generate a string that matches a supplied regular expression. It uses the <a href='http://npmjs.org/packages/randexp'>randexp</a> library to expand expressions, seeded by the instance of fiona.</p>

    <Sample input={`
    fiona(${seed}).regex(/[01]{8} (ro|cy)bo(rg|t)s/)
    `} output={`
    ${fiona(seed).regex(/[01]{8} (ro|cy)bo(rg|t)s/)}
    `} />
  </ApiSection>

export default injectState(Section)
