import { Layout, Article } from '../../../docs/app'
import { provide } from '../../../docs/app/state'

import {
  ExamplesTemplateString,
  ExamplesTemplatePlugin
} from '../../../docs/sections'

const Page = () => (
  <Layout>
    <Article>
      <h2>Populate Template</h2>
    </Article>
    <Article>
      <ExamplesTemplateString />
    </Article>
    <Article>
      <ExamplesTemplatePlugin />
    </Article>
  </Layout>
)

export default provide(Page)
