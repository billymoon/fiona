import { Layout, Article } from '../docs/app'
import { provide } from '../docs/app/state'

import {
  OverviewDynamicOverview,
  OverviewHowFionaWorks,
  OverviewQuickStart,
  OverviewSeededPRNG,
  OverviewDistribution,
  OverviewExtending,
  OverviewContributing
} from '../docs/sections'

const Page = () => (
  <Layout>
    <Article>
      <OverviewDynamicOverview />
    </Article>
    <Article>
      <OverviewHowFionaWorks />
    </Article>
    <Article>
      <OverviewQuickStart />
    </Article>
    <Article>
      <OverviewSeededPRNG />
    </Article>
    <Article>
      <OverviewDistribution />
    </Article>
    <Article>
      <OverviewExtending />
    </Article>
    <Article>
      <OverviewContributing />
    </Article>
  </Layout>
)

Page.getInitialProps = (...atgs) => {
  console.log(atgs)
  return {}
}

export default provide(Page)
