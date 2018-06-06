import { withState, Layout } from '../src/docs/app'
import { Article } from '../src/docs/components'
import {
  OverviewDynamicOverview,
  OverviewQuickStart,
  OverviewSeededPRNG,
  OverviewWeighting,
  OverviewChainedDataBuilder,
  OverviewPlugins
} from '../src/docs/sections'

const Page = () =>
  <Layout>
    <Article><OverviewDynamicOverview /></Article>
    <Article><OverviewQuickStart /></Article>
    <Article><OverviewSeededPRNG /></Article>
    <Article><OverviewWeighting /></Article>
    <Article><OverviewChainedDataBuilder /></Article>
    <Article><OverviewPlugins /></Article>
  </Layout>


export default withState(Page)
