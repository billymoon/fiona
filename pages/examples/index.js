import { Layout, Article } from '../../src/docs/app'
import { provide } from '../../src/docs/app/state'

import {
  ExamplesIntro,
  ExamplesTemplateString,
  ExamplesTemplatePlugin,
  ExamplesPretend,
  ExamplesExpressMock
} from '../../src/docs/sections'

const Page = () =>
  <Layout>
    <Article><ExamplesIntro /></Article>
    <Article><ExamplesPretend /></Article>
    <Article><ExamplesExpressMock /></Article>
    <Article><ExamplesTemplateString /></Article>
    <Article><ExamplesTemplatePlugin /></Article>
  </Layout>

export default provide(Page)
