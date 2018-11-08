import { Layout, Article } from '../../docs/app'
import { provide } from '../../docs/app/state'

import {
  ExamplesIntro,
  ExamplesTemplateString,
  ExamplesTemplatePlugin,
  ExamplesPretend,
  ExamplesExpressMock
} from '../../docs/sections'

const Page = () =>
  <Layout>
    <Article><ExamplesIntro /></Article>
    <Article><ExamplesPretend /></Article>
    <Article><ExamplesExpressMock /></Article>
    <Article><ExamplesTemplateString /></Article>
    <Article><ExamplesTemplatePlugin /></Article>
  </Layout>

export default provide(Page)
