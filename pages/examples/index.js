import { withState, Layout } from '../../src/docs/app'
import { Article } from '../../src/docs/components'
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


export default withState(Page)
