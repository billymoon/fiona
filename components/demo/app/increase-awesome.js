import { consume } from '../app/context'

const IncreaseAwesome = ({ label, increaseAwesome }) =>
  <button onClick={() => increaseAwesome(2)}>{label}</button>

export default consume(IncreaseAwesome)
