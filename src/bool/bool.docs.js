import { fiona, consume, ApiSection, Sample } from '../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.</small>Bool</span>}>
    <p>A seeded utility to return true or false. Takes `chance` option to change the probability of true as decimal value between 0 and 1 which defaults to 0.5.</p>

    <Sample input={`
    fiona(${seed}).bool()
    `} output={`
    ${fiona(seed).bool()}
    `} />

    <Sample input={`
    fiona(${seed}).string\`The rumour is \${fiona.Bool}\`
    `} output={`
    ${JSON.stringify(fiona(seed).string`The rumour is ${fiona.Bool}`)}
    `} />

    <Sample input={`
    fiona(${seed}).array(5, fiona.Bool({ chance: 0.3 }))
    `} output={`
    ${JSON.stringify(fiona(seed).array(5, fiona.Bool({ chance: 0.3 })))}
    `} />
  </ApiSection>

export default consume(Section)
