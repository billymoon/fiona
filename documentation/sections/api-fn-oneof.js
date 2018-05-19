import { fiona, injectState, ApiSection } from '../app'
import { Sample } from '../components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<><small>fiona.fn.</small>oneOf</>}>
    <p>A seeded weighted method to select one item from a passed array.</p>

    <Sample input={`
    fiona(${seed}).oneOf(['pink', 'powder blue', 'purple'])
    `} output={`
    ${fiona(seed).oneOf(['pink', 'powder blue', 'purple'])}
    `} />

    <p>The current weighting function will influence the choice, so for example, elements appearing earlier are more likely to be chosen when a weighting reduces the pseudo random values.</p>

    <Sample input={`
    fiona(${seed}).weighting(i => i * i * i).oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    `} output={`
    ${fiona(seed).weighting(i => i * i * i).oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])}
    `} />
  </ApiSection>

export default injectState(Section)
