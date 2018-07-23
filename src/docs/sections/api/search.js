import { connect } from '../../app'

// TODO: why does filter not retain or reset value properly on navigation
const ApiSearch = ({ setApiFilter, apiFilter, ...props }) =>
  <input ref={el => el && el.focus()} value={apiFilter} placeholder='filter api methods' onChange={evt => setApiFilter(evt.target.value)} />

export default connect(ApiSearch)
