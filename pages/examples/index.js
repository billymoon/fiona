import { withState, Layout } from '../../documentation/app'
import { Article } from '../../documentation/components'
import {
  ExamplesIntro,
  ExamplesTemplateString,
  ExamplesTemplatePlugin,
  ExamplesPretend,
  ExamplesExpressMock
} from '../../documentation/sections'

const Page = ({ url }) =>
  <Layout url={url}>
    <Article><ExamplesIntro /></Article>
    <Article><ExamplesPretend /></Article>
    <Article><ExamplesExpressMock /></Article>
    <Article><ExamplesTemplateString /></Article>
    <Article><ExamplesTemplatePlugin /></Article>
  </Layout>


export default withState(Page)
