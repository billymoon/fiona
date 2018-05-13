import { Article } from '../../components'
import { Layout } from '../../app'
import {
  ExamplesIntro,
  ExamplesTemplateString,
  ExamplesTemplatePlugin,
  ExamplesPretend
} from '../../sections'

export default ({ url, state: { seed } }) =>
  <Layout url={url} seed={seed}>
    <Article><ExamplesIntro /></Article>
    <Article><ExamplesPretend seed={seed} /></Article>
    <Article><ExamplesTemplateString seed={seed} /></Article>
    <Article><ExamplesTemplatePlugin seed={seed} /></Article>
  </Layout>
