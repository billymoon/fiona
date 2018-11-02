import { Layout, Article } from '../src/docs/app'
import { provide } from '../src/docs/app/state'

import {
  OverviewDynamicOverview,
  OverviewQuickStart,
  OverviewSeededPRNG,
  OverviewDistribution,
  OverviewChainedDataBuilder,
  OverviewExtending,
  OverviewContributing
} from '../src/docs/sections'

const Page = () =>
  <Layout>
    <Article><OverviewDynamicOverview /></Article>
    <Article><OverviewQuickStart /></Article>
    <Article><OverviewSeededPRNG /></Article>
    <Article><OverviewDistribution /></Article>
    <Article><OverviewExtending /></Article>
    <Article><OverviewChainedDataBuilder /></Article>
    <Article><OverviewContributing /></Article>
  </Layout>

export default provide(Page)
