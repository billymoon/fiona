import { Layout, Article } from '../../../docs/app'
import { provide } from '../../../docs/app/state'

import { ExamplesImagePlaceholders } from '../../../docs/sections'

const Page = () => (
  <Layout>
    <Article>
      <h2>Image Placeholders</h2>
    </Article>
    <Article>
      <ExamplesImagePlaceholders />
    </Article>
  </Layout>
)

export default provide(Page)
