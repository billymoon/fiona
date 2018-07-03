import { injectState, provideState } from 'freactal'

import { default as ThemeCreator, themeDefaults } from 'jsx-components/theme'
import { mergeDeep } from 'jsx-components/util'

export const withTheme = Component => injectState(({ state, ...props }) => <Component theme={state.theme} state={state} {...props} />)

const ThemeFactory = properties => provideState({ initialState: (props, { freactal }) => ({
  theme: {
    ...mergeDeep({}, themeDefaults, freactal.state.theme, properties)
  }
}) })(({ children }) => children)

export const Theme = ThemeCreator(ThemeFactory)
