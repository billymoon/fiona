import { provideState, injectState, update } from '.'

import config from './config'

export { injectState }

const initialState = () => ({
  seed: 952684,
  theme: config.theme
})

const effects = {
  setSeed: update(({ seed }, newValue) => ({
    seed: seed === newValue ? Math.floor(Math.random() * 33) : newValue
  }))
}

const localState = provideState({ initialState, effects })

export const wrapWithState = (componentState, ComponentPure) => provideState(componentState)(connect(ComponentPure))

export const connect = ComponentPure => {
  const Component = ({ state, effects, ...props }) => <ComponentPure {...state} {...effects} {...props} />
  return injectState(Component)
}

export const withState = Component => localState(Component)


/* new React Context based state solution */

export const GlobalStateContext = React.createContext({
  // seed: 952684,
  // theme: config.theme,
  // apiFilter: ''
})

export class GlobalState extends React.Component {
  render () {
    return (
      <GlobalStateContext.Provider value={this.state}>
        {this.props.children}
      </GlobalStateContext.Provider>
    );
  }

  state = {
    theme: config.theme,

    seed: 952684,
    setSeed: newValue => {
      this.setState({
        seed: this.state.seed === newValue ? Math.floor(Math.random() * 33) : newValue
      })
    },

    apiFilter: '',
    setApiFilter: newValue => {
      this.setState({
        apiFilter: newValue
      })
    }
  }
}

export const globalState = Component => ({ ...props }) => {
  return (<GlobalStateContext.Consumer>{
      ({ ...state }) => <Component {...state} {...props} />
    }</GlobalStateContext.Consumer>
  )
}
