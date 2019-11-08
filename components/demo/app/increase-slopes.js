import { consume } from '../app/context'

const IncreaseSlopes = ({ label, increaseSlopes }) =>
  <button onClick={() => increaseSlopes(3)}>{label}</button>

export default consume(IncreaseSlopes)
