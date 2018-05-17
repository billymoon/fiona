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

const Page = ({ url, state: { seed } }) =>
  <Layout url={url} seed={seed}>
    <Article><DynamicOverview seed={seed} /></Article>
    <Article><QuickStart seed={seed} /></Article>
    <Article><SeededPRNG seed={seed} /></Article>
    <Article><Weighting seed={seed} /></Article>
    <Article><ChainedDataBuilder seed={seed} /></Article>
    <Article><Plugins seed={seed} /></Article>
  </Layout>


export default withState(Page)
