import { withState, Layout } from '../../documentation/app'
import { Article } from '../../documentation/components'
import {
  Api,
  ApiSearch,
  ApiOverview
} from '../../documentation/sections'

const Page = ({ url }) =>
  <Layout url={url}>
    <Article>
      <ApiOverview />
      <ApiSearch />
      <Api />
    </Article>
  </Layout>

export default withState(Page)
