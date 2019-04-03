import { Fiona, consume, Sample, withTheme } from '../../app'

const Section = ({ seed, theme }) => (
  <section>
    <div>
      <style jsx>{`
        img {
          width: 9%;
          margin: 0.5%;
          border-radius: 50%;
        }
      `}</style>

      <p>
        Image placeholders are base64 encoded datauri stringified svg files.
        These strings can be used in place of a src attribute in HTML, or as
        background image defined in css.
      </p>

      <Sample
        input={`
        Fiona(${seed}).img()
      `}
        output={`
        ${Fiona(seed)
          .img()
          .slice(0, 30)}...etc...${Fiona(seed)
          .img()
          .slice(-20)}
      `}
      />

      <h3>Scalable placeholder images</h3>

      <p>
        With default options, the image width and height of 1000px, and The
        colours will be chosen randomly.
      </p>

      <pre>
        <code>{`
<img src={Fiona(seed).img()} style={{
  width: 100,
  height: 100,
  borderRadius: '50%'
}} />
        `}</code>
      </pre>

      {Fiona(seed)
        .array(10, Fiona.Number)
        .map(i => (
          <img key={i} src={Fiona(i).img()} alt="" />
        ))}
    </div>

    <pre>
      <code>{`
<img src={Fiona(seed).img()} />
        `}</code>
    </pre>
    <div>
      <img src={Fiona(seed + 1).img()} alt="" style={{ maxWidth: '100%' }} />
    </div>

    <div>
      <style jsx>{`
        img {
          width: 100%;
        }
      `}</style>

      <h3>Custom colours and size</h3>

      <p>
        You can also customise colours by passing an array of objects definng
        gradients...
      </p>

      <pre>
        <code>{`
<img src={Fiona(seed).img({
  height: 200,
  width: 400,
  bg: '${theme.clr.secondaryAccent}',
  colors: [
    { start: '${theme.clr.primary}',
        end: '${theme.clr.accent}' },
    { start: '${theme.clr.secondary}',
        end: '${theme.clr.secondaryAccent}' }
  ]
})} alt="" />
        `}</code>
      </pre>

      <img
        src={Fiona(seed).img({
          height: 200,
          width: 400,
          bg: theme.clr.secondaryAccent,
          colors: [
            { start: theme.clr.primary, end: theme.clr.accent },
            { start: theme.clr.secondary, end: theme.clr.secondaryAccent }
          ]
        })}
        alt=""
      />
    </div>
  </section>
)

export default consume(Section)
