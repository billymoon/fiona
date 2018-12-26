import { consume } from '../app/context'

const UnleaseAwesome = ({ awesome }) =>
  <span>the steps to awesome castle is: {awesome.castle.steps} {awesome.castle.slopes}</span>

export default consume(UnleaseAwesome)
