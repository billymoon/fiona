import { Fiona, consume, ApiSection, Sample } from '../../../../docs/app'

const Section = ({ seed }) => (
  <span>
    <ApiSection
      heading={
        <span>
          <small>Fiona.</small>String
        </span>
      }
    >
      <p>A method to populate stirng literal template with resolved values.</p>

      <Sample
        input={`
      Fiona(${seed}).string\`Hi \${Fiona.Firstname}, how are you?\`
      `}
        output={`\n${JSON.stringify(
          Fiona(seed).string`Hi ${Fiona.Firstname}, how are you?`
        )}`}
      />
    </ApiSection>
  </span>
)

export default consume(Section)
