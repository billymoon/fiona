import { Article } from '../components'
import {
  DynamicOverview,
  QuickStart,
  SeededPRNG,
  Weighting,
  ChainedDataBuilder,
  Plugins
} from '../sections'
import { Layout } from '../app'

export default ({ url, state: { seed } }) =>
  <Layout url={url} seed={seed}>
    <Article><DynamicOverview seed={seed} /></Article>
    <Article><QuickStart seed={seed} /></Article>
    <Article><SeededPRNG seed={seed} /></Article>
    <Article><Weighting seed={seed} /></Article>
    <Article><ChainedDataBuilder seed={seed} /></Article>
    <Article><Plugins seed={seed} /></Article>
  </Layout>
