import { provideState } from 'freactal'

import { mergeDeep } from '..'

const themeDefaults = {
  fg: '#222',
  bg: '#fcfcfc'
}

export const ThemeFactory = properties => provideState({ initialState: (props, { freactal }) => ({
  theme: {
    ...mergeDeep({}, themeDefaults, freactal.state.theme, properties)
  }
}) })(({ children }) => children)

const Default = ThemeFactory()

const Light = ThemeFactory(themeDefaults)

const Dark = ThemeFactory({
  fg: '#eee',
  bg: '#444'
})

const Dynamic = ({ config, ...props }) => {
  const DynamicTheme = ThemeFactory(config)
  return <DynamicTheme {...props} />
}

export default { Dynamic, Default, Light, Dark }
