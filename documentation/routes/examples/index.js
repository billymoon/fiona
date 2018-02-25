import { Article } from '../../components'
import { Layout, state } from '../../app'
import {
  ExamplesIntro,
  ExamplesTemplateString,
  ExamplesTemplatePlugin
} from '../../sections'

const Page = ({ url }) =>
  <Layout url={url}>
    <Article><ExamplesIntro /></Article>
    <Article><ExamplesTemplateString /></Article>
    <Article><ExamplesTemplatePlugin /></Article>
  </Layout>

export default state(Page)
