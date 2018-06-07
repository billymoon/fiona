import { fiona, injectState, ApiSection } from '../../docs/app'
import { Sample } from '../../docs/components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<><small>fiona.fn.</small>choose</>}>
    <p>A seeded weighted method to select a specified number of items from a passed array.</p>

    <Sample input={`
    fiona(${seed}).choose(2, ['pink', 'powder blue', 'purple'])
    `} output={`
    ${JSON.stringify(fiona(seed).choose(2, ['pink', 'powder blue', 'purple']))}
    `} />

    <p>Like `fiona.fn.oneOf`, the current weighting function will influence the choice.</p>

    <Sample input={`
    fiona(${seed}).weighting(i => i * i * i).choose(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    `} output={`
    ${JSON.stringify(fiona(seed).weighting(i => i * i * i).choose(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))}
    `} />
  </ApiSection>

export default injectState(Section)