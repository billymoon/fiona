import { injectState } from '../../app'

const Section = ({ state: { seed } }) =>
  <section>
    <h2>API</h2>
    <p>Fiona has a jQuery like plugin architecture where methods are attached to <code>fiona.fn</code> to operate on an instance, and directly on <code>fiona</code> when used as utility.</p>
    <p>For demonstration purposes, a seed of <code>{seed}</code> is used, but changing this should render different, but consistent results.</p>
  </section>

export default injectState(Section)
