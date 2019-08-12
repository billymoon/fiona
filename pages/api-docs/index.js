import { Layout, Article } from '../../docs/app'
import { provide } from '../../docs/app/state'

import { ApiOverview, ApiNav } from '../../docs/sections'

// import ApiFnClone from '../../src/core/core-clone.docs'
// import ApiFnFind from '../../src/find/find.docs'
import ApiFnFirstname from '../../src/name/firstname.docs'
import ApiFnGender from '../../src/name/gender.docs'
import ApiFnNamedata from '../../src/name/namedata.docs'
import ApiFnFullname from '../../src/name/fullname.docs'
import ApiFnInfo from '../../src/core/info.docs'
import ApiFnSurname from '../../src/name/surname.docs'
import ApiFnNumber from '../../src/core/primitives/number/number.docs'
import ApiFnObject from '../../src/core/primitives/object/object.docs'
import ApiFnRandom from '../../src/core/random.docs'
import ApiFnRegister from '../../src/core/register/register.docs'
// import ApiFnReseed from '../../src/core/core-reseed.docs'
// import ApiFnState from '../../src/core/core-state.docs'
import ApiFnString from '../../src/core/primitives/string/string.docs'
import ApiFnTitle from '../../src/name/title.docs'
import ApiFnDistribution from '../../src/core/distribution/distribution.docs'
import ApiFnArray from '../../src/core/primitives/array/array.docs'
import ApiFnBool from '../../src/bool/bool.docs'
import ApiFnChoose from '../../src/choose/choose.docs'
import ApiFnDate from '../../src/date/date.docs'
import ApiFnImg from '../../src/img/img.docs'
import ApiFnDuplicable from '../../src/duplicable/duplicable.docs'
import ApiFnJson from '../../src/core/primitives/json/json.docs'
import ApiFnLorem from '../../src/lorem/lorem.docs'
import ApiFnOneof from '../../src/choose/one-of.docs'
import ApiFnParagraph from '../../src/lorem/paragraph.docs'
import ApiFnRegex from '../../src/regex/regex.docs'
import ApiFnSentence from '../../src/lorem/sentence.docs'
import ApiFnShuffle from '../../src/shuffle/shuffle.docs'
import ApiFnWord from '../../src/lorem/word.docs'

const Page = () => (
  <Layout>
    <Article>
      <ApiOverview />
      <section style={{ minHeight: '80vh' }}>
        <ApiNav />
        <section>
          <ApiFnArray />
          <ApiFnBool />
          <ApiFnChoose />
          <ApiFnDate />
          <ApiFnImg />
          <ApiFnDuplicable />
          <ApiFnJson />
          <ApiFnLorem />
          <ApiFnOneof />
          <ApiFnParagraph />
          <ApiFnRegex />
          <ApiFnSentence />
          <ApiFnNumber />
          <ApiFnShuffle />
          <ApiFnWord />
          <ApiFnDistribution />
          <ApiFnRandom />
          <ApiFnGender />
          <ApiFnTitle />
          <ApiFnNamedata />
          <ApiFnFirstname />
          <ApiFnSurname />
          <ApiFnFullname />
          <ApiFnInfo />
          <ApiFnRegister />
          <ApiFnObject />
          <ApiFnString />
          {/*
          <ApiFnClone />
          <ApiFnReseed />
          <ApiFnState />
          <ApiFnFind />
          */}
        </section>
      </section>
    </Article>
  </Layout>
)

export default provide(Page)
