import { Layout, Article } from '../../docs/app'
import { provide } from '../../docs/app/state'

import { ApiOverview, ApiNav } from '../../docs/sections'

// import ApiFnClone from '../../docs/sections/api/items/core/core-clone.docs'
// import ApiFnFind from '../../docs/sections/api/items/find/find.docs'
import ApiFnFirstname from '../../docs/sections/api/items/name/firstname.docs'
import ApiFnGender from '../../docs/sections/api/items/name/gender.docs'
import ApiFnNamedata from '../../docs/sections/api/items/name/namedata.docs'
import ApiFnFullname from '../../docs/sections/api/items/name/fullname.docs'
import ApiFnInfo from '../../docs/sections/api/items/core/info.docs'
import ApiFnSurname from '../../docs/sections/api/items/name/surname.docs'
import ApiFnNumber from '../../docs/sections/api/items/core/primitives/number/number.docs'
import ApiFnObject from '../../docs/sections/api/items/core/primitives/object/object.docs'
import ApiFnRandom from '../../docs/sections/api/items/core/random.docs'
import ApiFnRegister from '../../docs/sections/api/items/core/register/register.docs'
// import ApiFnReseed from '../../docs/sections/api/items/core/core-reseed.docs'
// import ApiFnState from '../../docs/sections/api/items/core/core-state.docs'
import ApiFnString from '../../docs/sections/api/items/core/primitives/string/string.docs'
import ApiFnTitle from '../../docs/sections/api/items/name/title.docs'
import ApiFnDistribution from '../../docs/sections/api/items/core/distribution/distribution.docs'
import ApiFnArray from '../../docs/sections/api/items/core/primitives/array/array.docs'
import ApiFnBool from '../../docs/sections/api/items/bool/bool.docs'
import ApiFnChoose from '../../docs/sections/api/items/choose/choose.docs'
import ApiFnDate from '../../docs/sections/api/items/date/date.docs'
import ApiFnImg from '../../docs/sections/api/items/img/img.docs'
import ApiFnDuplicable from '../../docs/sections/api/items/duplicable/duplicable.docs'
import ApiFnJson from '../../docs/sections/api/items/core/primitives/json/json.docs'
import ApiFnLorem from '../../docs/sections/api/items/lorem/lorem.docs'
import ApiFnOneof from '../../docs/sections/api/items/choose/one-of.docs'
import ApiFnParagraph from '../../docs/sections/api/items/lorem/paragraph.docs'
import ApiFnRegex from '../../docs/sections/api/items/regex/regex.docs'
import ApiFnSentence from '../../docs/sections/api/items/lorem/sentence.docs'
import ApiFnShuffle from '../../docs/sections/api/items/shuffle/shuffle.docs'
import ApiFnWord from '../../docs/sections/api/items/lorem/word.docs'

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
