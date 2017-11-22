import React from 'react'
import { injectState } from 'freactal'

import fiona from '../../../src'
import { Sample } from '../'

export default injectState(({ state: { seed, theme } }) =>
  <section>
    <h2>API</h2>

    <p>Fiona has a jQuery like plugin architecture where methods are attached to `fiona.fn` to operate on an instance, and directly on `fiona` when used as utility.</p>

    <p>For demonstration purposes, a seed of `24` is used, but changing this should render different, but consistent results.</p>

    <h3><small>fiona.fn.</small>random</h3>

    <p>Seeded version of native `Math.random` method.</p>

    <Sample input={`
    fiona(${seed}).random()
    `} output={`
    ${fiona(seed).random().toString()}
    `} />

    <h3><small>fiona.fn.</small>bool</h3>

    <p>A seeded utility to return true or false. Takes `chance` option to change the probability of true as decimal value between 0 and 1 which defaults to 0.5.</p>

    <Sample input={`
    fiona(${seed}).bool()
    `} output={`
    ${fiona(seed).bool()}
    `} />

    <h3><small>fiona.fn.</small>date</h3>

    <p>A seeded utility to return a date as a string in format `YYYY-MM-DD`. Range is between `min` and `max` options, which default to 1940 and 2000 and can be overridden with strings parsable by the native `Date()` method. There is also a `long` to output full `Date.prototype.toISOString` format.</p>

    <Sample input={`
    fiona(${seed}).date()

    fiona(${seed}).date({
      min: '1980',
      max: '2080',
      long: true
    })
    `} output={`
    "${fiona(seed).date()}"

    "${fiona(seed).date({ min: '1980', max: '2080', long: true })}"
    `} />

    <h3><small>fiona.fn.</small>duplicable</h3>

    <p>A seeded utility to help to produce duplicated data sometimes. By default, the seed will be picked from a pool of 10 possibilities, 10 per cent of the time.</p>

    <p>In this example, the pool is 2, and the frequency is <b>0.6</b> so the numbers will be <b>373260</b> or <b>153925</b>, 60% of the time, and the other numbers will be pseudo random according to the input seed.</p>

    <Sample input={`
    fiona(${seed}).duplicable({ frequency: 0.6, pool: 2 }).number()
    fiona(${seed + 1}).duplicable({ frequency: 0.6, pool: 2 }).number()
    fiona(${seed + 2}).duplicable({ frequency: 0.6, pool: 2 }).number()
    fiona(${seed + 3}).duplicable({ frequency: 0.6, pool: 2 }).number()
    fiona(${seed + 4}).duplicable({ frequency: 0.6, pool: 2 }).number()
    fiona(${seed + 5}).duplicable({ frequency: 0.6, pool: 2 }).number()
    fiona(${seed + 6}).duplicable({ frequency: 0.6, pool: 2 }).number()
    fiona(${seed + 7}).duplicable({ frequency: 0.6, pool: 2 }).number()
    fiona(${seed + 8}).duplicable({ frequency: 0.6, pool: 2 }).number()
    fiona(${seed + 9}).duplicable({ frequency: 0.6, pool: 2 }).number()
    fiona(${seed + 10}).duplicable({ frequency: 0.6, pool: 2 }).number()
    `} output={`
    ${fiona(seed).duplicable({ frequency: 0.6, pool: 2 }).number()}
    ${fiona(seed + 1).duplicable({ frequency: 0.6, pool: 2 }).number()}
    ${fiona(seed + 2).duplicable({ frequency: 0.6, pool: 2 }).number()}
    ${fiona(seed + 3).duplicable({ frequency: 0.6, pool: 2 }).number()}
    ${fiona(seed + 4).duplicable({ frequency: 0.6, pool: 2 }).number()}
    ${fiona(seed + 5).duplicable({ frequency: 0.6, pool: 2 }).number()}
    ${fiona(seed + 6).duplicable({ frequency: 0.6, pool: 2 }).number()}
    ${fiona(seed + 7).duplicable({ frequency: 0.6, pool: 2 }).number()}
    ${fiona(seed + 8).duplicable({ frequency: 0.6, pool: 2 }).number()}
    ${fiona(seed + 9).duplicable({ frequency: 0.6, pool: 2 }).number()}
    ${fiona(seed + 10).duplicable({ frequency: 0.6, pool: 2 }).number()}
    `} />
    
    <h3><small>fiona.fn.</small>gender</h3>

    <p>A seeded utility to return `male` or `female` evenly distributed.</p>

    <Sample input={`
    fiona(${seed}).gender()
    `} output={`
    ${fiona(seed).gender()}
    `} />

    <h3><small>fiona.fn.</small>title</h3>

    <p>A seeded utility to return a salutation, optionally taking a gender to adhere to.</p>

    <Sample input={`
    fiona(${seed}).title() // can be either gender
    fiona(${seed}).title({ gender: 'male' }) // always male
    `} output={`
    ${fiona(seed).title()}
    ${fiona(seed).title({ gender: 'male' })}
    `} />

    <h3><small>fiona.fn.</small>firstname</h3>

    <p>A seeded utility to return a single firstname, optionally taking a gender to adhere to.</p>

    <Sample input={`
    fiona(${seed}).firstname() // can be either gender
    fiona(${seed}).firstname({ gender: 'male' }) // always male
    `} output={`
    ${fiona(seed).firstname()}
    ${fiona(seed).firstname({ gender: 'male' })}
    `} />

    <h3><small>fiona.fn.</small>firstnames</h3>

    <p>A seeded utility to return firstnames, optionally taking a gender to adhere to. This is useful for producing more realistic name data where people might have multiple first and middle names.</p>

    <Sample input={`
    fiona(${seed}).firstname() // can be either gender
    fiona(${seed}).firstname({ gender: 'male' }) // always male
    `} output={`
    ${fiona(seed).firstname()}
    ${fiona(seed).firstname({ gender: 'male' })}
    `} />
    
    <h3><small>fiona.fn.</small>lastname</h3>

    <p>A seeded utility to return a single lastname.</p>

    <Sample input={`
    fiona(${seed}).lastname()
    `} output={`
    ${fiona(seed).lastname()}
    `} />
    
    <h3><small>fiona.fn.</small>name</h3>

    <p>A seeded utility to return a full name, optionally taking a gender to adhere to. This is useful for producing more realistic name data where people might have multiple first and middle names, and sometimes double barrel lastnames joined with hyphen.</p>

    <Sample input={`
    fiona(${seed}).name() // can be either gender
    fiona(${seed}).name({ gender: 'male' }) // always male
    `} output={`
    ${fiona(seed).name()}
    ${fiona(seed).name({ gender: 'male' })}
    `} />

    <h3><small>fiona.</small>namedata</h3>
    
    <p>the data used to generate names and salutations is exposed as `fiona.namedata` shich can be inspected, and modified.</p>

    <Sample>{`
    fiona.namedata = {
      male: {
        firstname: ['Jack', 'James', /* etc... */ 'Hunter', 'Zachary'],
        title: ['Mr', 'Dr', 'Sir', 'Lord']
      },
      female: {
        firstname: ['Fiona', 'Aria', 'Mia', /* etc... */ 'Matilda', 'Lauren'],
        title: ['Miss', 'Mrs', 'Dr', 'Ms', 'Dame']
      },
      lastname: ['Moon', 'Smith', 'Brown', /* etc... */ 'Mitchell', 'Fraser']
    }
    `}</Sample>

    <h3><small>fiona.fn.</small>number</h3>

    <p>A seeded utility to return a positive integer, taking options min and max, which default to 0 and 1,000,000.</p>

    <Sample input={`
    fiona(${seed}).number()
    fiona(${seed}).number({ max: 10 })
    fiona(${seed}).number({ min: 10, max: 20 })
    `} output={`
    ${fiona(seed).number()}
    ${fiona(seed).number({ max: 10 })}
    ${fiona(seed).number({ min: 10, max: 20 })}
    `} />

    <h3><small>fiona.fn.</small>lorem</h3>

    <p>A seeded utility to return lorem ipsum text, optionally takes `qty` which is approximate number of words and defaults to `15`.</p>

    <Sample input={`
    fiona(${seed}).lorem()

    fiona(${seed}).lorem({ qty: 3 })

    fiona(${seed}).lorem({ qty: 50 })
    `} output={`
    ${fiona(seed).lorem()}

    ${fiona(seed).lorem({ qty: 3 })}

    ${fiona(seed).lorem({ qty: 50 })}
    `} />
    
    <h3><small>fiona.fn.</small>sentence</h3>

    <p>A seeded utility to return a sentence of lorem ipsum text.</p>

    <Sample input={`
    fiona(${seed}).sentence()
    `} output={`
    ${fiona(seed).sentence()}
    `} />
    
    <h3><small>fiona.fn.</small>para</h3>

    <p>A seeded utility to return a paragraph of lorem ipsum text.</p>

    <Sample input={`
    fiona(${seed}).para()
    `} output={`
    ${fiona(seed).para()}
    `} />
    
    <h3><small>fiona.fn.</small>oneOf</h3>

    <p>A seeded weighted method to select one item from a passed array.</p>

    <Sample input={`
    fiona(${seed}).oneOf(['pink', 'powder blue', 'purple'])
    `} output={`
    ${fiona(seed).oneOf(['pink', 'powder blue', 'purple'])}
    `} />
    
    <p>The current weighting function will influence the choice, so for example, elements appearing earlier are more likely to be chosen when a weighting reduces the pseudo random values.</p>

    <Sample input={`
    fiona(${seed}).weighting(i => i * i * i).oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    `} output={`
    ${fiona(seed).weighting(i => i * i * i).oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])}
    `} />
    
    <h3><small>fiona.fn.</small>choose</h3>

    <p>A seeded weighted method to select a specified number of items from a passed array.</p>

    <Sample input={`
    fiona(${seed}).choose(2, ['pink', 'powder blue', 'purple'])
    `} output={`
    ${fiona(seed).choose(2, ['pink', 'powder blue', 'purple'])}
    `} />
    
    <p>Like `fiona.fn.oneOf`, the current weighting function will influence the choice.</p>

    <Sample input={`
    fiona(${seed}).weighting(i => i * i * i).choose(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    `} output={`
    ${JSON.stringify(fiona(seed).weighting(i => i * i * i).choose(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))}
    `} />
    
    <h3><small>fiona.fn.</small>regex</h3>

    <p>A very general use, seeded utility to generate a string that matches a supplied regular expression. It uses the <a href='http://npmjs.org/packages/randexp'>randexp</a> library to expand expressions, seeded by the instance of fiona.</p>

    <Sample input={`
    fiona(${seed}).regex(/\d{8} (ro|cy)bo(rg|t)s?/)
    `} output={`
    ${fiona(seed).regex(/\d{8} (ro|cy)bo(rg|t)s?/)}
    `} />

    <h3><small>fiona.fn.</small>weighted and <small>fiona.</small>weighted</h3>

    <p>A utility to be used in the chain, which modifies the seed value distribution allowing control over the distribution of seeded values. Weighting functions influence `fiona.fn.random`, `fiona.fn.bool`, `fiona.fn.number`, `fiona.fn.oneOf`, `fiona.fn.choice` and any other methods that rely on them. The primary use case for this method is to control the distribution of data to create more realistic data.</p>
    
    <p>Out of the box there are some predefined weighting functions as follows.</p>

    <ul>
      <li>linear</li>
      <li>square</li>
      <li>cube</li>
      <li>quad</li>
      <li>low</li>
    </ul>

    <Sample input={`
    fiona(${seed}).number()
    
    fiona(${seed}).weighted('cube').number()
    `} output={`
    ${fiona(seed).number()}

    ${fiona(seed).weighted('cube').number()}
    `} />

    <p>In most cases the upper and lower limits remain the same, but the distribution of the values in between change as with all the predefined functions, but you can also create custom functions that can be used for any purpose, for example to clamp outputs to min and max values.</p>

    <Sample input={`
    fiona.weighted('clamp', i => i < 0.5 ? 0.5 : i > 0.7 ? 0.7 : i)
  
    fiona(${seed}).weighted('clamp').random()

    fiona(${seed}).weighted('clamp').number({ max: 100 })
    `} output={`

    // value is clamped from 0.5-0.7
    ${fiona(seed).weighted('clamp').random()}
    // value is clamped from 50-70
    ${fiona(seed).weighted('clamp').number({ max: 100 })}
    `} />    

{/*
  reseed
  clone
  callback
  data
  info
  chain
  value
  state
*/}

  </section>
)
