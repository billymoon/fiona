import { fiona, connect, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>arr</span>}>
    <p>A seeded array generation utility, which takes <code>qty</code> (how many items in array) and a callback that is called with <code>{`{ seeded }`}</code> which should return the value of each array item.</p>

    <Sample input={`
    fiona(${seed}).arr(10, fiona.call('number'))
    `} output={`
    [${fiona(seed).arr(10, fiona.call('number')).join(', ')}]
    `} />

    <p>Which is equivalent this method which gives full access to seeded instance (useful for adding weighting to values)</p>

    <Sample>{`
    fiona(${seed}).arr(10, ({ seeded }) => seeded.number())
    `}</Sample>

    <p>Which is also equivalent to using the <code>arr</code> function passed to <code>data's</code> callback</p>

    <Sample>{`
    fiona(${seed}).data(({ arr }) => arr(10, ({ seeded }) => seeded.number()))
    `}</Sample>
  </ApiSection>

export default connect(Section)
