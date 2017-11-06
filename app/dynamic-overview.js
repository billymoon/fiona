import { injectState } from 'freactal'
import fiona from '../src/fiona'

export default injectState(({ state: { seed } }) =>
  <p>{fiona(seed).regex(`Fiona is a (helper|tool|library) for (creating|generating) (large)? (chunks|sets) of (seeded|pseudo|mock) random data\\. (At it's core it uses|It is based around) a (Xorshift(256)? )?(PRNG|pseudo random number generator) that (enables|assists with|makes a mockery of) (generating|creating) (repeatable|predictable) (seemingly|apparently|authentic (feeling|looking)) random data\\.`)}</p>
)
