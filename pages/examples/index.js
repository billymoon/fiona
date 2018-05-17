import { withState, Layout } from '../../documentation/app'
import { Article } from '../../documentation/components'
import {
  ExamplesIntro,
  ExamplesTemplateString,
  ExamplesTemplatePlugin,
  ExamplesPretend,
  ExamplesExpressMock
} from '../../documentation/sections'

const Page = ({ url, state: { seed } }) =>
  <Layout url={url} seed={seed}>
    <Article><ExamplesIntro /></Article>
    <Article><ExamplesPretend seed={seed} /></Article>
    <Article><ExamplesExpressMock seed={seed} /></Article>
    <Article><ExamplesTemplateString seed={seed} /></Article>
    <Article><ExamplesTemplatePlugin seed={seed} /></Article>
  </Layout>


export default withState(Page)
