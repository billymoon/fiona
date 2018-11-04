import { consume } from '../../app'

const Section = ({ seed }) =>
  <section>
    <h2>API</h2>
    <p>For demonstration purposes, a seed of <code>{seed}</code> is used, but changing this should render different, but consistent results.</p>
  </section>

export default consume(Section)
