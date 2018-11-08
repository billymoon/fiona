import { fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.</small>Choose</span>}>
    <p>A seeded weighted method to select a specified number of items from a passed array.</p>

    <Sample input={`
    fiona(${seed}).choose(2, ['pink', 'powder blue', 'purple'])
    `} output={`
    ${JSON.stringify(fiona(seed).choose(2, ['pink', 'powder blue', 'purple']))}
    `} />

    <p>Like `fiona.fn.oneOf`, the current distribution function will influence the choice.</p>

    <Sample input={`
    fiona(${seed}).distribution(i => i * i * i).choose(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    `} output={`
    ${JSON.stringify(fiona(seed).distribution(i => i * i * i).choose(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))}
    `} />
  </ApiSection>

export default consume(Section)
