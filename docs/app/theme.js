import { consume, config } from '.'

import { mergeDeep, ThemeCreator, themeDefaults } from '.'

export const withTheme = Component => consume(Component)

// TODO: re-implement functionality with new react context state
const ThemeFactory = properties => ({ children }) => children
// const ThemeFactory = properties => provideState({ initialState: (props, { freactal }) => ({
//   theme: {
//     ...mergeDeep({}, themeDefaults, freactal.state.theme, properties)
//   }
// }) })(({ children }) => children)

const ThemeStateContext = React.createContext(themeDefaults)

export const injectWithState = Component => ({ ...props }) => (
  <ThemeStateContext.Consumer>
    {({ ...state }) => <Component {...state} {...props} />}
  </ThemeStateContext.Consumer>
)

export const ThemeStateFactory = themeState => {
  class ThemeState extends React.Component {
    render() {
      const {
        state,
        props: { children }
      } = this
      return (
        <ThemeStateContext.Consumer>
          {({ theme }) => (
            <ThemeStateContext.Provider
              value={
                (mergeDeep({}, themeDefaults, { theme: theme || {} }), state)
              }
            >
              {children}
            </ThemeStateContext.Provider>
          )}
        </ThemeStateContext.Consumer>
      )
    }

    state = {
      theme: themeState
    }
  }

  return { ThemeState }
}

export const Theme = ThemeCreator(ThemeFactory)
