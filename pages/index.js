import React from 'react'

import { Article } from './components'
import {
  DynamicOverview,
  QuickStart,
  SeededPRNG,
  Weighting,
  ChainedDataBuilder,
  Plugins
} from './app/sections'
import { Layout, state } from './app'

const Page = ({ url }) =>
  <Layout url={url}>
    <Article><DynamicOverview /></Article>
    <Article><QuickStart /></Article>
    <Article><SeededPRNG /></Article>
    <Article><Weighting /></Article>
    <Article><ChainedDataBuilder /></Article>
    <Article><Plugins /></Article>
  </Layout>

export default state(Page)
