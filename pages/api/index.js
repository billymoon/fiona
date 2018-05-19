import { withState, Layout } from '../../documentation/app'
import { Article } from '../../documentation/components'
import {
  ApiOverview,
  ApiSearch,  
  ApiFnBool,
  ApiFnCall,
  ApiFnChoose,
  ApiFnDate,
  ApiFnDuplicable,
  ApiFnFirstname,
  ApiFnFirstnames,
  ApiFnGender,
  ApiFnLastname,
  ApiFnLorem,
  ApiFnName,
  ApiFnNumber,
  ApiFnOneof,
  ApiFnPara,
  ApiFnPlugin,
  ApiFnRandom,
  ApiFnRegex,
  ApiFnSentence,
  ApiFnTitle,
  ApiFnWord,
  ApiFnWeighted,
  ApiFnNamedata
} from '../../documentation/sections'

// TODO document api for: reseed, clone, callback, data, info, chain, value, json, state, plugin, call
const Page = ({ url }) =>
  <Layout url={url}>
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
        <ApiFnChoose />
        <ApiFnRegex />
        <ApiFnWeighted />
      </section>
    </Article>
  </Layout>

export default withState(Page)
