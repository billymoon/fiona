import { mergeDeep } from '..'

const StateFactory = (initialState, actionDefinitions) => {
  const Context = React.createContext(initialState)

  let actions = {}

  Object.entries(actionDefinitions).forEach(([name, actionDefinition]) => {
    actions[name] = (...args) => initialState = mergeDeep({}, initialState, actionDefinition(Object.assign({}, initialState, actions), ...args))
  })

  class Wrapper extends React.Component {
    constructor (props) {
      super(props)
      Object.entries(actionDefinitions).forEach(([name, actionDefinition]) => {
        actions[name] = (...args) => this.setState(mergeDeep(this.state, actionDefinition(Object.assign({}, this.state, actions), ...args)))
      })
    }

    render () {
      const { props: { children }, state } = this
      return (
        <Context.Provider value={state}>
          {children}
        </Context.Provider>
      )
    }

    state = initialState
  }
  
  const inject = Pure => ({ ...props }) =>
    <Context.Consumer>
      {({ ...state }) => <Pure {...state} {...actions} {...props} />}
    </Context.Consumer>

  const withState = Pure => ({ ...props }) =>
    <Wrapper>
      <Pure {...props} />
    </Wrapper>

  // TODO: are actions needed to be included in value?
  const provide = newState => () => ({ children }) => 
    <Context.Consumer>{({ ...state }) =>
      <Context.Provider value={Object.assign({}, state, actions, newState)}>
        {children}
      </Context.Provider>
    }</Context.Consumer>

  const mutate = fn => ({ children }) =>
  <Context.Consumer>{({ ...state }) =>
    <Context.Provider value={fn(Object.assign({}, state, actions))}>
      {children}
    </Context.Provider>
  }</Context.Consumer>

  // TODO: much better naming
  // TODO: only export needed functions
  return {
    Context,
    Wrapper,
    inject,
    withState,
    provide,
    mutate,
    actions,
  }
}

export default StateFactory
