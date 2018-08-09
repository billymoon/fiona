import Link from 'next/link'

import { fiona, connect, Sample } from '../../app'

const NPM = ({ name }) => <Link href={`https://www.npmjs.com/package/${name}`}><a>{name}</a></Link>

const Section = ({ seed }) =>
  <section>
    <h2>Contributing</h2>

    <p>Fiona aims to be performant, robust, well documented and <Link href='/static/reports/coverage/index.html'><a>well tested</a></Link>.</p>

    <p>Fiona is open source, <Link href='https://github.com/billymoon/fiona'><a>fork me on github</a></Link>. Pull requests and issues welcome.</p>

    <p>The code style is terse and succinct, and hopefully easy to understand and work with. The file structure is based around colocation, so the src folder includes the main library code, it's tests, and the documentation.</p>

    <p>Whilst there are very few dependencies (<NPM name='randexp' /> and <NPM name='bezier-easing' />) in the fiona library, there are several used to aid development:</p>

    <ul>
      <li><NPM name='jest' /> for testing</li>
      <li><NPM name='webpack' /> and <NPM name='babel-cli' /> for bundling distributable</li>
      <li><NPM name='taskr' /> and <NPM name='husky' /> for development lifecycle scripting</li>
      <li><NPM name='standard' /> for linting</li>
      <li><NPM name='react' /> and <NPM name='next' /> for documentation website</li>
    </ul>

    <p>Updating or creating a pull request will trigger a deployment using zeit's now service.</p>
  </section>

export default connect(Section)
