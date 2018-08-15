import { Layout, Article } from '../../src/docs/app'
import { provide } from '../../src/docs/app/state'

import {
  ApiOverview,
  ApiSearch
} from '../../src/docs/sections'

import ApiFnBool from '../../src/plugins/bool/fiona.bool.docs'
import ApiFnFind from '../../src/plugins/find/fiona.find.docs'
import ApiFnCallback from '../../src/core/core-callback.docs'
import ApiFnData from '../../src/core/core-data.docs'
import ApiFnReseed from '../../src/core/core-reseed.docs'
import ApiFnClone from '../../src/core/core-clone.docs'
import ApiFnInfo from '../../src/core/core-info.docs'
import ApiFnState from '../../src/core/core-state.docs'
import ApiFnChain from '../../src/core/core-chain.docs'
import ApiFnValue from '../../src/core/core-value.docs'
import ApiFnJson from '../../src/plugins/json/fiona.json.docs'
import ApiFnCall from '../../src/core/core-call.docs'
import ApiFnPlugin from '../../src/core/core-plugin.docs'
import ApiFnRandom from '../../src/core/core-random.docs'
import ApiFnChoose from '../../src/plugins/choose/fiona.choose.docs'
import ApiFnOneof from '../../src/plugins/choose/fiona.choose-oneof.docs'
import ApiFnArray from '../../src/plugins/array/fiona.array.docs'
import ApiFnDate from '../../src/plugins/date/fiona.date.docs'
import ApiFnDuplicable from '../../src/plugins/duplicable/fiona.duplicable.docs'
import ApiFnFirstname from '../../src/plugins/name/fiona.name-firstname.docs'
import ApiFnFirstnames from '../../src/plugins/name/fiona.name-firstnames.docs'
import ApiFnGender from '../../src/plugins/name/fiona.name-gender.docs'
import ApiFnLastname from '../../src/plugins/name/fiona.name-lastname.docs'
import ApiFnName from '../../src/plugins/name/fiona.name.docs'
import ApiFnTitle from '../../src/plugins/name/fiona.name-title.docs'
import ApiFnNamedata from '../../src/plugins/name/fiona.name-namedata.docs'
import ApiFnLorem from '../../src/plugins/lorem/fiona.lorem.docs'
import ApiFnPara from '../../src/plugins/lorem/fiona.lorem-para.docs'
import ApiFnSentence from '../../src/plugins/lorem/fiona.lorem-sentence.docs'
import ApiFnWord from '../../src/plugins/lorem/fiona.lorem-word.docs'
import ApiFnRegex from '../../src/plugins/regex/fiona.regex.docs'
import ApiFnWeighted from '../../src/plugins/weighted/fiona.weighted.docs'
import ApiFnNumber from '../../src/plugins/number/fiona.number.docs'
import ApiFnShuffle from '../../src/plugins/shuffle/fiona.shuffle.docs'

const Page = () =>
  <Layout>
    <Article>
      <ApiOverview />
      <ApiSearch />
      <section>
        <ApiFnCallback />
        <ApiFnReseed />
        <ApiFnClone />
        <ApiFnInfo />
        <ApiFnState />
        <ApiFnFind />
        <ApiFnData />
        <ApiFnChain />
        <ApiFnValue />
        <ApiFnJson />
        <ApiFnRandom />
        <ApiFnNumber />
        <ApiFnBool />
        <ApiFnPlugin />
        <ApiFnCall />
        <ApiFnDate />
        <ApiFnShuffle />
        <ApiFnDuplicable />
        <ApiFnGender />
        <ApiFnTitle />
        <ApiFnFirstname />
        <ApiFnFirstnames />
        <ApiFnLastname />
        <ApiFnName />
        <ApiFnNamedata />
        <ApiFnLorem />
        <ApiFnWord />
        <ApiFnSentence />
        <ApiFnPara />
        <ApiFnOneof />
        <ApiFnArray />
        <ApiFnChoose />
        <ApiFnRegex />
        <ApiFnWeighted />
      </section>
    </Article>
  </Layout>

export default provide(Page)
