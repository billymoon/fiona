import { withState, Layout } from '../documentation/app'
import { Article } from '../documentation/components'
import {
  DynamicOverview,
  QuickStart,
  SeededPRNG,
  Weighting,
  ChainedDataBuilder,
  Plugins
} from '../documentation/sections'

const Page = ({ url }) =>
  <Layout url={url}>
    <Article><DynamicOverview /></Article>
    <Article><QuickStart /></Article>
    <Article><SeededPRNG /></Article>
    <Article><Weighting /></Article>
    <Article><ChainedDataBuilder /></Article>
    <Article><Plugins /></Article>
  </Layout>


export default withState(Page)
