import { injectState } from '../app'

const ApiSearch = ({ effects: { setApiFilter }, state: { apiFilter }, ...props }) =>
  <input ref={el => el && el.focus()} value={apiFilter} placeholder='filter api methods' onChange={evt => setApiFilter(evt.target.value)} />

export default injectState(ApiSearch)
