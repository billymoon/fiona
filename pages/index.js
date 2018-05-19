import { withState, Layout } from '../documentation/app'
import { Article } from '../documentation/components'
import {
  OverviewDynamicOverview,
  OverviewQuickStart,
  OverviewSeededPRNG,
  OverviewWeighting,
  OverviewChainedDataBuilder,
  OverviewPlugins
} from '../documentation/sections'

const Page = ({ url }) =>
  <Layout url={url}>
    <Article><OverviewDynamicOverview /></Article>
    <Article><OverviewQuickStart /></Article>
    <Article><OverviewSeededPRNG /></Article>
    <Article><OverviewWeighting /></Article>
    <Article><OverviewChainedDataBuilder /></Article>
    <Article><OverviewPlugins /></Article>
  </Layout>


export default withState(Page)
