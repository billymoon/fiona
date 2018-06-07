import Link from 'next/link'

import { Sample } from '../../components'
import { fiona, injectState } from '../../app'

const Section = ({ state: { seed } }) =>
  <section>
    <h2>Contributing</h2>

    <p>Fiona aims to be performant, robust, well documented and <Link><a href='/static/reports/coverage/index.html'>well tested</a></Link>.</p>

    <p>Fiona is open source, <Link><a href='https://github.com/billymoon/fiona'>fork me on github</a></Link>. Pull requests and issues welcome.</p>
  </section>

export default injectState(Section)
