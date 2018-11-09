import { fiona, consume, ApiSection, Sample } from '../../../../docs/app'

const Section = ({ seed }) =>
  <span>
    <ApiSection heading={<span><small>fiona.</small>Json</span>}>

      <p>A method to return current data object as json string.</p>

      <Sample input={`
      fiona(${seed}).json({
        fullname: fiona.Fullname,
        age: fiona.Number({ max: 100 })
      })
      `} output={`\n${JSON.stringify(fiona(seed).object({ fullname: fiona.Fullname, age: fiona.Number({ max: 100 }) }), null, 2)}`} />

      <p><b>n.b.</b> the <code>fiona.Json</code> method proxies through to <code>fiona.Object</code> then formats the output, so all arguments accepted by <code>fiona.Object</code> are accepted by <code>fiona.Json</code></p>
    </ApiSection>
  </span>

export default consume(Section)
