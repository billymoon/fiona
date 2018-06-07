import { injectState, ApiSection } from '../docs/app'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<span><small>fiona.</small>plugin</span>}>
    <p>See Plugins section in <a href='/'>Overview</a></p>
  </ApiSection>

export default injectState(Section)
