import { Fiona, consume, ApiSection, Sample } from '../../../../docs/app'

const Section = ({ seed }) => (
  <span>
    <ApiSection
      heading={
        <span>
          <small>Fiona.</small>Json
        </span>
      }
    >
      <p>A method to return current data object as json string.</p>

      <Sample
        input={`
      Fiona(${seed}).json({
        fullname: Fiona.Fullname,
        age: Fiona.Number({ max: 100 })
      })
      `}
        output={`\n${JSON.stringify(
          Fiona(seed).object({
            fullname: Fiona.Fullname,
            age: Fiona.Number({ max: 100 })
          }),
          null,
          2
        )}`}
      />

      <p>
        <b>n.b.</b> the <code>Fiona.Json</code> method proxies through to{' '}
        <code>Fiona.Object</code> then formats the output, so all arguments
        accepted by <code>Fiona.Object</code> are accepted by{' '}
        <code>Fiona.Json</code>
      </p>
    </ApiSection>
  </span>
)

export default consume(Section)
