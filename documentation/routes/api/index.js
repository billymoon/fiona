import { Article } from '../../components'
import { Layout } from '../../app'
import { Api } from '../../sections'

export default ({ url, state: { seed } }) =>
  <Layout url={url} seed={seed}>
    <Article><Api seed={seed} /></Article>
  </Layout>
