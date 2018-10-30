import { Layout, Article } from '../src/docs/app'
import { provide } from '../src/docs/app/state'

import {
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
    <Article><OverviewDynamicOverview /></Article>
    <Article><OverviewQuickStart /></Article>
{/*
    <Article><OverviewSeededPRNG /></Article>
    <Article><OverviewWeighting /></Article>
*/}
    <Article><OverviewPlugins /></Article>
    <Article><OverviewChainedDataBuilder /></Article>
    <Article><OverviewContributing /></Article>
  </Layout>

export default provide(Page)
