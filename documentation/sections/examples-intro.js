import { injectState } from 'freactal'

const Section = ({ state: { seed } }) =>
  <section>
    <h2>Examples</h2>
  </section>

export default injectState(Section)
