import { Layout, Article } from '../src/docs/app'
import { provide } from '../src/docs/app/state'

import {
  OverviewInfographic,
  OverviewDynamicOverview,
  OverviewQuickStart,
  OverviewSeededPRNG,
  OverviewWeighting,
  OverviewChainedDataBuilder,
  OverviewPlugins,
  OverviewContributing
} from '../src/docs/sections'

const Page = () =>
  <Layout>
    <Article><OverviewInfographic /></Article>
    <Article><OverviewDynamicOverview /></Article>
    <Article><OverviewQuickStart /></Article>
    <Article><OverviewSeededPRNG /></Article>
    <Article><OverviewWeighting /></Article>
    <Article><OverviewChainedDataBuilder /></Article>
    <Article><OverviewPlugins /></Article>
    <Article><OverviewContributing /></Article>
  </Layout>

export default provide(Page)
