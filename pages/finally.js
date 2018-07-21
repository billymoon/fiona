import { StateFactory } from '../src/docs/app'

const {
  Context,
  Wrapper,
  injectState,
  masterState,
  provideState,
  mutateState,
  actions
} = StateFactory({
  cool: 5,
  fg: 'red',
  bg: 'orange'
}, {
  doubleCool: ({ cool }) => ({ cool: cool * 2 })
})

actions.doubleCool()
actions.doubleCool()
actions.doubleCool()
setTimeout(() => {
  actions.doubleCool()
}, 1000)

const PureComponent = ({ state: { bg, fg }, children }) =>
  <div>
    {children}
    <style jsx>{`
      background: ${bg};
      color: ${fg};
    `}</style>
  </div>

const StatedComponent = injectState(PureComponent)

const PureSilverBullet = ({ setState }) =>
  <button onClick={() => setState({ fg: 'silver', bg: 'blue' })}>silver bullet</button>

const SilverBullet = injectState(PureSilverBullet)

const Reverse = mutateState(({ fg, bg }) => ({ fg: bg, bg: fg }))
const Green = mutateState(({ bg }) => ({ fg: 'green', bg }))

const Yellow = provideState({ fg: 'yellow', bg: 'brown' })(injectState(PureComponent))

const coolness = (setState, cool) => () => setState({ cool: cool + 1 })

const Page = ({ state: { cool }, setState }) =>
  <section>
    <button onClick={actions.doubleCool}>doublecool</button>
    {cool}
    <Yellow>
      <StatedComponent>
        Sint id sit qui eu consectetur ad aliqua ut labore elit elit culpa laborum sunt sit exercitation.
      </StatedComponent>
    </Yellow>
    <SilverBullet />
    <button onClick={coolness(setState, cool)}>awesome</button>
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

export default masterState(injectState(Page))

