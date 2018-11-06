import { Layout, Article } from "../../src/docs/app";
import { provide } from "../../src/docs/app/state";

import { ApiOverview, ApiSearch } from "../../src/docs/sections";

import ApiFnBool from "../../src/bool/bool.docs";
// import ApiFnFind from '../../src/find/find.docs'
// import ApiFnString from '../../src/string/string.docs'
// import ApiFnCallback from '../../src/core/core-callback.docs'
// import ApiFnData from '../../src/core/core-data.docs'
// import ApiFnReseed from '../../src/core/core-reseed.docs'
// import ApiFnClone from '../../src/core/core-clone.docs'
// import ApiFnInfo from '../../src/core/core-info.docs'
// import ApiFnState from '../../src/core/core-state.docs'
// import ApiFnChain from '../../src/core/core-chain.docs'
// import ApiFnValue from '../../src/core/core-value.docs'
// import ApiFnJson from '../../src/json/json.docs'
// import ApiFnCall from '../../src/core/core-call.docs'
// import ApiFnPlugin from '../../src/core/core-plugin.docs'
// import ApiFnRandom from '../../src/core/core-random.docs'
import ApiFnChoose from "../../src/choose/choose.docs";
// import ApiFnOneof from '../../src/choose/choose-oneof.docs'
// import ApiFnArray from '../../src/array/array.docs'
// import ApiFnDate from '../../src/date/date.docs'
// import ApiFnDuplicable from '../../src/duplicable/duplicable.docs'
// import ApiFnFirstname from '../../src/name/name-firstname.docs'
// import ApiFnFirstnames from '../../src/name/name-firstnames.docs'
// import ApiFnGender from '../../src/name/name-gender.docs'
// import ApiFnLastname from '../../src/name/name-lastname.docs'
// import ApiFnName from '../../src/name/name.docs'
// import ApiFnTitle from '../../src/name/name-title.docs'
// import ApiFnNamedata from '../../src/name/name-namedata.docs'
// import ApiFnLorem from '../../src/lorem/lorem.docs'
// import ApiFnPara from '../../src/lorem/lorem-para.docs'
// import ApiFnSentence from '../../src/lorem/lorem-sentence.docs'
// import ApiFnWord from '../../src/lorem/lorem-word.docs'
// import ApiFnRegex from '../../src/regex/regex.docs'
// import ApiFnWeighted from '../../src/weighted/weighted.docs'
// import ApiFnNumber from '../../src/number/number.docs'
// import ApiFnShuffle from '../../src/shuffle/shuffle.docs'

const Page = () => (
  <Layout>
    <Article>
      <ApiOverview />
      <ApiSearch />
      <section>
        <ApiFnBool />
        <ApiFnChoose />
        {/*
        <ApiFnCallback />
        <ApiFnReseed />
        <ApiFnClone />
        <ApiFnInfo />
        <ApiFnState />
        <ApiFnFind />
        <ApiFnString />
        <ApiFnData />
        <ApiFnChain />
        <ApiFnValue />
        <ApiFnJson />
        <ApiFnRandom />
        <ApiFnNumber />
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
        <ApiFnRegex />
        <ApiFnWeighted />
  */}
      </section>
    </Article>
  </Layout>
);

export default provide(Page);
