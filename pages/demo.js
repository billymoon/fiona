import { withState, Layout, Article } from '../src/docs/app'
import { ThemeStateFactory, injectWithState } from '../src/docs/app/theme'

const { ThemeState: ThemeCoca } = ThemeStateFactory({ drink: 'coca cola', cool: 'yes', clicker: update => update({ drink: 'rum and coke' }) })
const { ThemeState: ThemeDark } = ThemeStateFactory({ drink: 'pepsi cola', cool: 'no' })

const DrinkUI = ({ theme: { drink, cool }, clicker }) => <p onClick={clicker}>{cool} drink {drink}</p>
// const DrinkDarkUI = ({ drink, burn }) => <p>drink {drink} - burn {burn}</p>

// const Drink = injectCoca(DrinkUI)
// const Drink = DrinkUI
const Drink = injectWithState(DrinkUI)

const MyStateContext = React.createContext({
  awesome: 1, cool: 2
})

// console.log(injectCoca)

// const { ThemeDark: { ThemeState }, injectDark: { injectWithState } } = ThemeStateFactory({ drink: 'petrol', burn: 'house down' })

console.log(Drink)

import {
  OverviewDynamicOverview,
  OverviewQuickStart,
  OverviewSeededPRNG,
  OverviewWeighting,
  OverviewChainedDataBuilder,
  OverviewPlugins,
  OverviewContributing
} from '../src/docs/sections'

const Page = () =>
  <Layout>
    <Article>
      <ThemeCoca>
        <Drink />
        <ThemeDark>
          <Drink />
          <ThemeCoca>
            <Drink />
          </ThemeCoca>
        </ThemeDark>
      </ThemeCoca>
      <ThemeDark>
        <Drink />
        <Drink theme={{ drink: "oil" }} />
      </ThemeDark>
      <Drink theme={{ drink: 'water' }} />
      <MyStateContext.Consumer>{({ ...awesome }) =>
        <p>Veniam in {JSON.stringify(awesome)} adipisicing dolore sunt ut quis ad pariatur cillum aliquip anim commodo labore voluptate elit fugiat nulla anim.</p>
      }</MyStateContext.Consumer>
      <MyStateContext.Provider value={{ awesome: 4, cool: 6 }}>
        <MyStateContext.Consumer>{({ ...awesome }) =>
          <p>Veniam in {JSON.stringify(awesome)} adipisicing dolore sunt ut quis ad pariatur cillum aliquip anim commodo labore voluptate elit fugiat nulla anim.</p>
        }</MyStateContext.Consumer>
        <MyStateContext.Provider value={{ awesome: 1, cool: 3 }}>
          <MyStateContext.Consumer>{({ ...awesome }) =>
            <p>Veniam in {JSON.stringify(awesome)} adipisicing dolore sunt ut quis ad pariatur cillum aliquip anim commodo labore voluptate elit fugiat nulla anim.</p>
          }</MyStateContext.Consumer>
        </MyStateContext.Provider>
      </MyStateContext.Provider>
    </Article>
    <Article><OverviewDynamicOverview /></Article>
    <Article><OverviewQuickStart /></Article>
    <Article><OverviewSeededPRNG /></Article>
    <Article><OverviewWeighting /></Article>
    <Article><OverviewChainedDataBuilder /></Article>
    <Article><OverviewPlugins /></Article>
    <Article><OverviewContributing /></Article>
  </Layout>

export default withState(Page)
