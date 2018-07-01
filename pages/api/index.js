import { withState, Layout, Article } from '../../src/docs/app'

import {
  ApiOverview,
  ApiSearch
} from '../../src/docs/sections'
import ApiFnBool from '../../src/plugins/bool/fiona.bool.docs'
import ApiFnCall from '../../src/core/core-call.docs'
import ApiFnPlugin from '../../src/core/core-plugin.docs'
import ApiFnRandom from '../../src/core/core-random.docs'
import ApiFnChoose from '../../src/plugins/choose/fiona.choose.docs'
import ApiFnOneof from '../../src/plugins/choose/fiona.choose-oneof.docs'
import ApiFnArr from '../../src/plugins/arr/fiona.arr.docs'
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

// TODO document api for: reseed, clone, callback, data, info, chain, value, json, state, plugin, call, find
const Page = () =>
  <Layout>
    <Article>
      <ApiOverview />
      <ApiSearch />
      <section>
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
        <ApiFnArr />
        <ApiFnChoose />
        <ApiFnRegex />
        <ApiFnWeighted />
      </section>
    </Article>
  </Layout>

export default withState(Page)
