import Link from 'next/link'
import { Layout, Article, Shelf } from '../../docs/app'
import { provide } from '../../docs/app/state'

import { ExamplesIntro, ExamplesDashboard } from '../../docs/sections'

const Page = () => (
  <Layout>
    <Article>
      <ExamplesIntro />
    </Article>
    <ExamplesDashboard />
  </Layout>
)

export default provide(Page)
