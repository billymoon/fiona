import { mergeDeep } from '.'

const defaultState = {
  awesomeness: 1
}

export const GlobalStateContext = React.createContext(defaultState)

export const injectGlobalState = Component => ({ ...props }) =>
  <GlobalStateContext.Consumer>
    {({ ...state }) => <Component {...state} {...props} />}
  </GlobalStateContext.Consumer>

export const GlobalStateFactory = newState => {

  let contexts = []

  class GlobalState extends React.Component {
    componentWillMount () {
      console.log(1, contexts)
      contexts.push(this)
      console.log(2, contexts)
    }

    componentWillUnmount () {
      console.log(3, contexts)
      contexts = contexts.filter(context => context !== this)
      console.log(4, contexts)
    }

    render () {
      return (
        <GlobalStateContext.Consumer>{({ ...currentState }) =>
          <GlobalStateContext.Provider value={mergeDeep({}, defaultState, currentState, this.state)}>
            {this.props.children}
          </GlobalStateContext.Provider>
        }</GlobalStateContext.Consumer>
      )
    }

    state = mergeDeep({}, defaultState, newState)
  }

  GlobalState.update = (...args) => {
    console.log(5, contexts)
    contexts.forEach(context => context.setState(...args))
    console.log(6, contexts)
  }

  return GlobalState
}
