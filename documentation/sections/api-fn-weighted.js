import { fiona, injectState, ApiSection } from '../app'
import { Sample } from '../components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<><small>fiona.fn.</small>weighted and <small>fiona.</small>weighted</>}>
    <p>A utility to be used in the chain, which modifies the seed value distribution allowing control over the distribution of seeded values. Weighting functions influence `fiona.fn.random`, `fiona.fn.bool`, `fiona.fn.number`, `fiona.fn.oneOf`, `fiona.fn.choice` and any other methods that rely on them. The primary use case for this method is to control the distribution of data to create more realistic data.</p>

    <p>Out of the box there are some predefined weighting functions: <code>linear</code>, <code>square</code>, <code>cube</code>, <code>quad</code>, <code>low</code></p>

    <Sample input={`
    fiona(${seed}).number()
    
    fiona(${seed}).weighted('cube').number()
    `} output={`
    ${fiona(seed).number()}

    ${fiona(seed).weighted('cube').number()}
    `} />

    <p>In most cases the upper and lower limits remain the same, but the distribution of the values in between change as with all the predefined functions, but you can also create custom functions that can be used for any purpose, for example to clamp outputs to min and max values.</p>

    <Sample nothing={fiona.weighted('clamp', i => i < 0.5 ? 0.5 : i > 0.7 ? 0.7 : i)} input={`
    fiona.weighted('clamp', i => i < 0.5 ? 0.5 : i > 0.7 ? 0.7 : i)
  
    fiona(${seed}).weighted('clamp').random()

    fiona(${seed}).weighted('clamp').number({ max: 100 })
    `} output={`

    // value is clamped from 0.5-0.7
    ${fiona(seed).weighted('clamp').random()}
    // value is clamped from 50-70
    ${fiona(seed).weighted('clamp').number({ max: 100 })}
    `} /> 
  </ApiSection>

export default injectState(Section)
