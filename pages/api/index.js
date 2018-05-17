import { withState, Layout } from '../../documentation/app'
import { Article } from '../../documentation/components'
import { Api } from '../../documentation/sections'

const Page = ({ url, state: { seed } }) =>
  <Layout url={url} seed={seed}>
    <Article><Api seed={seed} /></Article>
  </Layout>

export default withState(Page)
