import { withApi, withThemeState } from '../../app/state'

const apis = [
  'Fiona.Random',
  'Fiona.Number',
  'Fiona.Bool',
  'Fiona.Date',

  'Fiona.Array',
  'Fiona.String',
  'Fiona.Regex',
  'Fiona.Object',
  'Fiona.Json',

  'Fiona.Shuffle',
  'Fiona.Choose',
  'Fiona.OneOf',

  'Fiona.Lorem',
  'Fiona.Paragraph',
  'Fiona.Sentence',
  'Fiona.Word',

  'Fiona.Gender',
  'Fiona.Title',
  'Fiona.Firstname',
  'Fiona.Surname',
  'Fiona.Fullname',
  'Fiona.namedata',

  'Fiona.Img',

  'Fiona.Info',
  'Fiona.Duplicable',
  'Fiona.Distribution',
  'Fiona.register'
]

const ApiSearch = ({ setApiFilter, theme, ...props }) => (
  <div>
    <ul>
      {apis.map(api => (
        <li key={api}>
          <a
            href={`#${api}`}
            onClick={evt => {
              evt.preventDefault()
              setApiFilter(api)
            }}
          >
            {api.replace(/^Fiona\./, '')}
          </a>
        </li>
      ))}
    </ul>
    <div className="clearfix" />
    <style jsx>{`
      a {
        font-size: 14px;
      }

      ul {
        margin: 0;
        padding: 0;
      }

      li {
        margin: 0 10px 0 0;
        list-style-type: none;
        float: left;
      }

      .clearfix {
        clear: both;
      }
    `}</style>
  </div>
)

export default withApi(withThemeState(ApiSearch))
