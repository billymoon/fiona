import { Layout, Article } from '../docs/app'
import { provide } from '../docs/app/state'

import {
  OverviewDynamicOverview,
  OverviewQuickStart,
  OverviewSeededPRNG,
  OverviewDistribution,
  OverviewExtending,
  OverviewContributing
} from '../docs/sections'

const Page = () =>
  <Layout>
    <Article><OverviewDynamicOverview /></Article>
    <Article><OverviewQuickStart /></Article>
    <Article><OverviewSeededPRNG /></Article>
    <Article><OverviewDistribution /></Article>
    <Article><OverviewExtending /></Article>
    <Article><OverviewContributing /></Article>
  </Layout>

export default provide(Page)
