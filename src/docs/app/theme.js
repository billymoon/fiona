import { injectState, provideState } from '.'

import { mergeDeep, ThemeCreator, themeDefaults } from '.'

export const withTheme = Component => injectState(({ state, ...props }) => <Component theme={state.theme} state={state} {...props} />)

const ThemeFactory = properties => provideState({ initialState: (props, { freactal }) => ({
  theme: {
    ...mergeDeep({}, themeDefaults, freactal.state.theme, properties)
  }
}) })(({ children }) => children)

export const Theme = ThemeCreator(ThemeFactory)
