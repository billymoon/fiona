import { injectState } from 'freactal'
import fiona from '../../src/fiona'

import { Sample } from './'

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
  </section>
)
