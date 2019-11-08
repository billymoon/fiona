import { provide } from '../app/context'
import IncreaseAwesome from '../app/increase-awesome'
import IncreaseSlopes from '../app/increase-slopes'
import UnleaseAwesome from '../app/unleash-awesome'

const Main = () =>
  <section>
    <IncreaseAwesome label="increment the awesome" />
    <IncreaseSlopes label="increment the slopes" />
    <UnleaseAwesome />
  </section>

export default provide(Main)
