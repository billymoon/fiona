import { connect, ApiSection } from '../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.</small>call</span>}>
    <p>See Quickstart section in <a href='/'>Overview</a></p>
  </ApiSection>

export default connect(Section)
