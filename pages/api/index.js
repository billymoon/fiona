import { Article } from '../components'
import { Layout, state } from '../app'
import { Api } from '../app/sections'

const Page = ({ url }) =>
  <Layout url={url}>
    <Article><Api /></Article>
  </Layout>

export default state(Page)
