const CreateContext = (initialState, actionDefinitions) => {
  const Context = React.createContext(initialState)

  let actions = {}

  class ContextProviderWrapper extends React.Component {
    constructor (props) {
      super(props)
      Object.entries(actionDefinitions).forEach(([name, actionDefinition]) => {
        actions[name] = (...args) => {
          const actioned = actionDefinition(Object.assign({}, this.state, actions), ...args)
          return this.setState(actioned)
        }
      })
    }

    render () {
      const { props: { children }, state } = this
      return (
        <Context.Provider value={state}>{children}</Context.Provider>
      )
    }

    state = initialState
  }
  
  const consume = Pure => ({ ...props }) =>
    <Context.Consumer>{({ ...state }) =>
      <Pure {...state} {...actions} {...props} />
    }</Context.Consumer>

  const provide = Pure => ({ ...props }) =>
    <ContextProviderWrapper>
      <Pure {...props} />
    </ContextProviderWrapper>

  return {
    consume,
    provide
  }
}

export const update = (path, updater) => {
  const updateFunction = typeof updater === 'function' ? updater : () => {
    return typeof updater === 'object' ? Object.assign({}, updater) : updater
  }

  return (state, ...args) => {
    const parts = path.split('.')
    const currentValue = parts.reduce((memo, item) => memo[item], state)
    const newValue = updateFunction(currentValue, state)
    const sliced = { [parts.slice(-1)]: (typeof newValue === 'function' ? newValue(...args) : newValue) }
    const diced = parts.slice(0, -1).reduce((memo, item) => memo[item], state)
    Object.assign(diced, sliced)
    return state
  }
}

export default CreateContext
