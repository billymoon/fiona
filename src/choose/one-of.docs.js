import { fiona, consume, ApiSection, Sample } from '../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.</small>OneOf</span>}>
    <p>A seeded weighted method to select one item from a passed array.</p>

    <Sample input={`
    fiona(${seed}).oneOf(['pink', 'powder blue', 'purple'])
    `} output={`
    ${fiona(seed).oneOf(['pink', 'powder blue', 'purple'])}
    `} />

    <p>The current distribution function will influence the choice, so for example, elements appearing earlier are more likely to be chosen when a weighting reduces the pseudo random values.</p>

    <Sample input={`
    fiona(${seed}).distribution(i => i * i * i).oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    `} output={`
    ${fiona(seed).distribution(i => i * i * i).oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])}
    `} />
  </ApiSection>

export default consume(Section)
