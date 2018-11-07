import { Layout, Article } from "../../src/docs/app";
import { provide } from "../../src/docs/app/state";

import { ApiOverview, ApiSearch } from "../../src/docs/sections";

// import ApiFnClone from '../../src/core/core-clone.docs'
// import ApiFnFind from '../../src/find/find.docs'
// import ApiFnFirstname from '../../src/name/name-firstname.docs'
// import ApiFnGender from '../../src/name/name-gender.docs'
// import ApiFnInfo from '../../src/core/core-info.docs'
// import ApiFnLastname from '../../src/name/name-lastname.docs'
// import ApiFnNamedata from '../../src/name/name-namedata.docs'
// import ApiFnNumber from '../../src/number/number.docs'
// import ApiFnRandom from '../../src/core/core-random.docs'
// import ApiFnRegister from '../../src/core/core-plugin.docs'
// import ApiFnReseed from '../../src/core/core-reseed.docs'
// import ApiFnState from '../../src/core/core-state.docs'
// import ApiFnString from '../../src/string/string.docs'
// import ApiFnTitle from '../../src/name/name-title.docs'
import ApiFnDistribution from "../../src/core/distribution/distribution.docs";
import ApiFnArray from "../../src/core/primitives/array/array.docs";
import ApiFnBool from "../../src/bool/bool.docs";
import ApiFnChoose from "../../src/choose/choose.docs";
import ApiFnDate from "../../src/date/date.docs";
import ApiFnDuplicable from "../../src/duplicable/duplicable.docs";
import ApiFnJson from "../../src/core/primitives/json/json.docs";
import ApiFnLorem from "../../src/lorem/lorem.docs";
import ApiFnOneof from "../../src/choose/one-of.docs";
import ApiFnParagraph from "../../src/lorem/paragraph.docs";
import ApiFnRegex from "../../src/regex/regex.docs";
import ApiFnSentence from "../../src/lorem/sentence.docs";
import ApiFnShuffle from "../../src/shuffle/shuffle.docs";
import ApiFnWord from "../../src/lorem/word.docs";

const Page = () => 
  <Layout>
    <Article>
      <ApiOverview />
      <ApiSearch />
      <section>
        <ApiFnArray />
        <ApiFnBool />
        <ApiFnChoose />
        <ApiFnDate />
        <ApiFnDuplicable />
        <ApiFnJson />
        <ApiFnLorem />
        <ApiFnOneof />
        <ApiFnParagraph />
        <ApiFnRegex />
        <ApiFnSentence />
        <ApiFnShuffle />
        <ApiFnWord />
        <ApiFnDistribution />
        {/*
        <ApiFnClone />
        <ApiFnFind />
        <ApiFnFirstname />
        <ApiFnGender />
        <ApiFnInfo />
        <ApiFnLastname />
        <ApiFnNamedata />
        <ApiFnNumber />
        <ApiFnRegister />
        <ApiFnRandom />
        <ApiFnReseed />
        <ApiFnState />
        <ApiFnString />
        <ApiFnTitle />
        */}
      </section>
    </Article>
  </Layout>

export default provide(Page);
