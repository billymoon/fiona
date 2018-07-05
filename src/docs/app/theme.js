import { connect, provideState } from '.'

import { mergeDeep, ThemeCreator, themeDefaults } from '.'

export const withTheme = Component => connect(Component)

const ThemeFactory = properties => provideState({ initialState: (props, { freactal }) => ({
  theme: {
    ...mergeDeep({}, themeDefaults, freactal.state.theme, properties)
  }
}) })(({ children }) => children)

export const Theme = ThemeCreator(ThemeFactory)
