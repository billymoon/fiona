import { withState, Layout, Article } from '../src/docs/app'

// import {
//   OverviewDynamicOverview,
//   OverviewQuickStart,
//   OverviewSeededPRNG,
//   OverviewWeighting,
//   OverviewChainedDataBuilder,
//   OverviewPlugins,
//   OverviewContributing
// } from '../src/docs/sections'
/*
    <Article><OverviewDynamicOverview /></Article>
    <Article><OverviewQuickStart /></Article>
    <Article><OverviewSeededPRNG /></Article>
    <Article><OverviewWeighting /></Article>
    <Article><OverviewChainedDataBuilder /></Article>
    <Article><OverviewPlugins /></Article>
    <Article><OverviewContributing /></Article>
*/
const Page = () =>
  <Layout>
    <Article><p>Ullamco nostrud excepteur in laborum incididunt mollit aute eu occaecat consectetur elit anim ut mollit officia et adipisicing.</p></Article>
  </Layout>

export default withState(Page)
