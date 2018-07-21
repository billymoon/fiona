import { StateFactory, mergeDeep } from '../src/docs/app'

const initialState = {
  state: {
    beforeTen: true,
    cool: 5,
    awesomeness: '20%'
  },
  theme: {
    fg: 'red',
    bg: 'orange'
  }
}

const actionDefinitions = {
  afterTen: ({}) => ({ state: { beforeTen: false } }),
  reverse: ({ theme: { fg , bg } }) => ({ theme: { fg: bg, bg: fg } }),
  silverBullet: ({ theme: { fg }, state: { beforeTen } }) => ({ theme: { fg: beforeTen ? 'silver' : 'black' } }),
  doubleCool: ({ state: { cool } }) => ({ state: { cool: cool * 2 }, theme: { bg: 'gold' } }),
  incereaseCool: ({ state: { cool } }) => ({ state: { cool: cool + 1 } }),
  uberAwesome: ({ state: { awesomeness } }, inc = 1) => ({ state: { awesomeness: Number(awesomeness.slice(0, -1)) + inc + '%' } })
}

const ThemeState = StateFactory(initialState, actionDefinitions)

ThemeState.actions.uberAwesome()
// ThemeState.actions.uberAwesome(15)
setTimeout(() => ThemeState.actions.afterTen(), 10000)

const PureComponent = ({ theme: { bg, fg }, children }) =>
  <div>
    {children}
    <style jsx>{`
      background: ${bg};
      color: ${fg};
    `}</style>
  </div>

const StatedComponent = ThemeState.inject(PureComponent)

const PureSilverBullet = () =>
  <button onClick={ThemeState.actions.silverBullet}>silver bullet</button>

const SilverBullet = ThemeState.inject(PureSilverBullet)

const Reverse = ThemeState.mutate(({ theme: { fg, bg } }) => ({ theme: { fg: bg, bg: fg } }))
const Green = ThemeState.mutate(({ theme: { bg } }) => ({ theme: { fg: 'green', bg } }))

const Yellow = ThemeState.provide({ theme: { fg: 'yellow', bg: 'brown' } })(ThemeState.inject(PureComponent))

const Page = ({ state: { cool, awesomeness, beforeTen } }) =>
  <section>
    <button onClick={ThemeState.actions.doubleCool}>doublecool</button>
    <button onClick={ThemeState.actions.reverse}>reverse</button>
    {cool} :: {awesomeness} :: {beforeTen.toString()}
    <Yellow>
      <StatedComponent>
        Sint id sit qui eu consectetur ad aliqua ut labore elit elit culpa laborum sunt sit exercitation.
      </StatedComponent>
    </Yellow>
    <SilverBullet />
    <button onClick={ThemeState.actions.incereaseCool}>more cool</button>
    <button onClick={() => ThemeState.actions.uberAwesome()}>awesome</button>
    Lorem ipsum
    <StatedComponent>
      Sint id sit qui eu consectetur ad aliqua ut labore elit elit culpa laborum sunt sit exercitation.
    </StatedComponent>
    <Yellow>
      <StatedComponent>
        Sint id sit qui eu consectetur ad aliqua ut labore elit elit culpa laborum sunt sit exercitation.
      </StatedComponent>
    </Yellow>
    <Yellow>
      <Reverse>
        <StatedComponent>
          Sint id sit qui eu consectetur ad aliqua ut labore elit elit culpa laborum sunt sit exercitation.
        </StatedComponent>
      </Reverse>
    </Yellow>
    <Reverse>
      <Yellow>
        <StatedComponent>
          Sint id sit qui eu consectetur ad aliqua ut labore elit elit culpa laborum sunt sit exercitation.
        </StatedComponent>
      </Yellow>
      <StatedComponent>
        Sint id sit qui eu consectetur ad aliqua ut labore elit elit culpa laborum sunt sit exercitation.
      </StatedComponent>      
      <Green>
        <StatedComponent>
          Sint id sit qui eu consectetur ad aliqua ut labore elit elit culpa laborum sunt sit exercitation.
        </StatedComponent>      
      </Green>
    </Reverse>
  </section>

export default ThemeState.wrap(ThemeState.inject(Page))

