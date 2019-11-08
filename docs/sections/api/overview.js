import { consume, withApi } from '../../app'

const Section = ({ seed, reseed }) => (
  <section>
    <p>
      For demonstration purposes, a seed of <code>{seed}</code> is used, but
      changing this should render different, but consistent results.
    </p>
  </section>
)

export default withApi(consume(Section))
