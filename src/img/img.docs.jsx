import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Img
      </span>
    }
  >
    <p>
      A seeded utility to return a data uri of an SVG placeholder image, which
      takes optional arguments for width and height.
    </p>

    <Sample
      input={`
      Fiona(${seed}).img()

      Fiona(${seed}).img({
        width: 200,
        height: 100
      })
      `}
      output={`
      ${Fiona(seed)
        .img()
        .slice(0, 30)} ... etc ... ${Fiona(seed)
        .img()
        .slice(-30)}

      ${Fiona(seed)
        .img({
          width: 200,
          height: 100
        })
        .slice(0, 30)} ... etc ... ${Fiona(seed)
        .img({
          width: 200,
          height: 100
        })
        .slice(-30)}
      `}
    />

    <img src={Fiona(seed).img()} alt="" style={{ maxWidth: '100%' }} />
    <img
      src={Fiona(seed).img({
        width: 200,
        height: 100
      })}
      alt=""
    />
  </ApiSection>
)

export default consume(Section)
