const State = React.createContext({ fg: 'green', bg: 'yellow' })

class MasterState extends React.Component {
  render () {
    const { props: { children }, state } = this
    return (
      <State.Provider value={state}>
        {children}
      </State.Provider>
    )
  }

  increaseAwesomeness = () => {
    this.setState({
      awesomeness: Number(this.state.awesomeness.slice(0, -1)) + 10 + '%'
    })
  }

  state = {
    awesomeness: '20%',
    fg: 'red',
    bg: 'black',
    update: newState => this.setState(newState),
    actions: {
      pinkTheme: () => this.setState({ bg: 'pink', fg: 'white' }),
      blueTheme: () => this.setState({ bg: 'blue', fg: 'white' })
    }
  }
}

const injectState = Pure => ({ ...props }) =>
  <State.Consumer>
    {({ ...state }) => <Pure {...props} {...state} />}
  </State.Consumer>

const masterState = Pure => ({ ...props }) =>
  <MasterState>
    <Pure {...props} />
  </MasterState>

const provideState = newState => () => ({ children }) => 
  <State.Consumer>{({ ...oldState }) =>
    <State.Provider value={Object.assign({}, oldState, newState)}>
      {children}
    </State.Provider>
  }</State.Consumer>

const PureComponent = ({ bg, fg, children }) =>
  <div>
    {children}
    <style jsx>{`
      background: ${bg};
      color: ${fg};
    `}</style>
  </div>

const StatedComponent = injectState(PureComponent)

const PurePinkerizer = ({ actions: { pinkTheme } }) =>
  <button onClick={pinkTheme}>pink it</button>

const Pinkerizer = injectState(PurePinkerizer)

const PureGirlie = ({ update }) =>
  <button onClick={() => update({ fg: 'pink', bg: 'purple' })}>girlify it</button>

const Girlie = injectState(PureGirlie)

const PureReverse = ({ fg, bg, children }) =>
  <State.Consumer>{({ fg, bg }) =>
    <State.Provider value={{ fg: bg, bg: fg }}>
      {children}
    </State.Provider>
  }</State.Consumer>

const Reverse = injectState(PureReverse)

const Yellow = provideState({ fg: 'yellow', bg: 'brown' })(injectState(PureComponent))

console.log(Yellow)

const Page = ({ fg, bg, awesomeness, update, actions: { pinkTheme, blueTheme } }) =>
  <section>
    {awesomeness}
    <Yellow>
      <StatedComponent>
        Mollit ut dolor sunt esse exercitation culpa anim in ut non dolore elit nisi nisi officia dolore.
      </StatedComponent>
    </Yellow>
    <button onClick={() => update({ awesomeness: Number(awesomeness.slice(0, -1)) + 10 + '%' })}>unleash some awesome</button>
    <button onClick={blueTheme}>change the theme blue</button>
    <button onClick={pinkTheme}>change the theme pink</button>
    <Pinkerizer />
    <Girlie />
    <State.Consumer>{({ update }) =>
      <button onClick={() => update({ fg: 'green', bg: 'lime' })}>green it</button>
    }</State.Consumer>
    Dolor officia irure esse dolor quis dolor nulla consequat ullamco sed nulla nisi voluptate voluptate fugiat deserunt minim duis.
    <StatedComponent>
      Mollit ut dolor sunt esse exercitation culpa anim in ut non dolore elit nisi nisi officia dolore.
      <State.Provider value={{ fg: 'orange', bg: 'red' }}>
        <Yellow>
          <StatedComponent>
            Mollit ut dolor sunt esse exercitation culpa anim in ut non dolore elit nisi nisi officia dolore.
          </StatedComponent>
          <Reverse>
            <StatedComponent>
              Mollit ut dolor sunt esse exercitation culpa anim in ut non dolore elit nisi nisi officia dolore.
            </StatedComponent>
          </Reverse>
          </Yellow>
        <StatedComponent>
          Mollit ut dolor sunt esse exercitation culpa anim in ut non dolore elit nisi nisi officia dolore.
        </StatedComponent>
      </State.Provider>
      <hr />
      <StatedComponent>
        1 Mollit ut dolor sunt esse exercitation culpa anim in ut non dolore elit nisi nisi officia dolore.
      </StatedComponent>
      <Reverse>
        <StatedComponent>
          2 Mollit ut dolor sunt esse exercitation culpa anim in ut non dolore elit nisi nisi officia dolore.
          <Reverse>
            <StatedComponent>
              3 Mollit ut dolor sunt esse exercitation culpa anim in ut non dolore elit nisi nisi officia dolore.
            </StatedComponent>        
          </Reverse>
        </StatedComponent>        
        <Reverse>
          <StatedComponent>
            4 Mollit ut dolor sunt esse exercitation culpa anim in ut non dolore elit nisi nisi officia dolore.
          </StatedComponent>        
        </Reverse>
      </Reverse>
      <hr />
      <State.Provider value={{ fg: bg, bg: fg }}>
        <StatedComponent>
          Mollit ut dolor sunt esse exercitation culpa anim in ut non dolore elit nisi nisi officia dolore.
        </StatedComponent>
        <State.Consumer>{({ fg, bg }) =>
          <State.Provider value={{ fg: bg, bg: fg }}>
            <StatedComponent>
              Mollit ut dolor sunt esse exercitation culpa anim in ut non dolore elit nisi nisi officia dolore.
            </StatedComponent>
          </State.Provider>
        }</State.Consumer>
      </State.Provider>
    </StatedComponent>
  </section>

export default masterState(injectState(Page))
