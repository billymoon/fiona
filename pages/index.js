import styled from 'styled-components'
import fiona from '../src/fiona'

const HappyHello = styled.div`
  color: purple;
  font-size: 30px;
`

export default () =>
  <div>
    <HappyHello>Fiona - seeded random data assistant</HappyHello>
    <p>{fiona('moon').number(10)} green bottles</p>
  </div>
