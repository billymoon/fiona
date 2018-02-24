import { Article } from '../components'
import { Layout, state } from '../app'
import { ExamplesIntro } from '../app/sections'

const Page = ({ url }) =>
  <Layout url={url}>
    <Article><ExamplesIntro /></Article>
  </Layout>

export default state(Page)
