import { withApi, withThemeState } from '../../app/state'

const ApiSearch = ({ setApiFilter, apiFilter, theme, ...props }) => (
  <div>
    <input
      ref={el => el && el.focus()}
      value={apiFilter}
      placeholder="filter api methods"
      onChange={evt => setApiFilter(evt.target.value)}
    />
    <style jsx>{`
      input {
        border: 3px solid ${theme.clr.secondaryAccent};
        width: 100%;
        padding: 4px 8px;
        font-size: 20px;
        box-sizing: border-box;
      }
      input:focus {
        outline-color: ${theme.clr.secondary};
      }
      @media screen and (min-width: 768px) {
        input {
          width: 240px;
        }
      }
    `}</style>
  </div>
)

export default withApi(withThemeState(ApiSearch))
