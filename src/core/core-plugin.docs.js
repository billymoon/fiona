import { consume, ApiSection } from '../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.</small>plugin</span>}>
    <p>See Plugins section in <a href='/'>Overview</a></p>
  </ApiSection>

export default consume(Section)
