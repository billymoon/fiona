import Link from 'next/link'

import { Fiona, consume, Sample } from '../../app'

const NPM = ({ name }) => (
  <Link href={`https://www.npmjs.com/package/${name}`}>
    <a>{name}</a>
  </Link>
)

const Section = ({ seed }) => (
  <section>
    <h2>Contributing</h2>

    <p>
      Fiona aims to be performant, robust, well documented,{' '}
      <Link href="/static/dependency-graph.svg">
        <a>well organised</a>
      </Link>
      ,{' '}
      <Link href="/static/reports/coverage/index.html">
        <a>well tested</a>
      </Link>{' '}
      and{' '}
      <Link href="/static/reports/size/main.html">
        <a>small</a>
      </Link>{' '}
      (full library is ~8KB core is ~3KB gzipped).
    </p>

    <p>
      Fiona is open source,{' '}
      <Link href="https://github.com/billymoon/Fiona">
        <a>fork me on github</a>
      </Link>
      . Pull requests and issues welcome. The most useful thing the community
      could contribute to this project at this time is to help build up the
      methods to become a rich tapestry of data generating utilities.
    </p>

    <p>
      The code style is terse and succinct, and hopefully easy to understand and
      work with. The file structure is based around colocation, so the src
      folder includes the main library code, it's tests, and the documentation.
    </p>

    <p>
      Whilst there are very few dependencies (only <NPM name="randexp" />) in
      the Fiona library, there are several used to aid development:
    </p>

    <ul>
      <li>
        <NPM name="ava" /> for testing
      </li>
      <li>
        <NPM name="webpack" /> and <NPM name="babel-cli" /> for bundling
        distributable
      </li>
      <li>
        <NPM name="@zeit/git-hooks" /> for development lifecycle scripting
      </li>
      <li>
        <NPM name="prettier" /> for linting
      </li>
      <li>
        <NPM name="react" /> and <NPM name="next" /> for documentation website
      </li>
    </ul>

    <p>
      Updating or creating a pull request will trigger a deployment using zeit's
      now service, so you can preview the suggested changes in a production like
      environment.
    </p>
  </section>
)

export default consume(Section)
