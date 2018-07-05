import { globalState } from '../../app'

const ApiSearch = ({ setApiFilter, apiFilter, ...props }) =>
  <input ref={el => el && el.focus()} value={apiFilter} placeholder='filter api methods' onChange={evt => setApiFilter(evt.target.value)} />

export default globalState(ApiSearch)
