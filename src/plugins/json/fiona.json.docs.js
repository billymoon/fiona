import { fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) =>
  <span>
    <ApiSection heading={<span><small>fiona.fn.</small>json</span>}>

      <p>A method to return current data object as json string.</p>

      <Sample input={`
      fiona(${seed}).chain({
        name: fiona.call('name')
      }).json()
      `} output={`
      ${fiona(seed).chain({ name: fiona.call('name'), age: fiona.call('number', { max: 100 }) }).json()}
      `} />

      <p>Optionally takes spacing argument to pass onto `JSON.stringify`.</p>

      <Sample input={`
      fiona(${seed}).chain({
        name: fiona.call('name')
      }).json(2)
      `} output={`${fiona(seed).chain({ name: fiona.call('name'), age: fiona.call('number', { max: 100 }) }).json(2)}`} />

    </ApiSection>
  </span>

export default consume(Section)
