export const themeDefaults = {
  fg: '#222',
  bg: '#fcfcfc'
}

const themeDark = {
  fg: '#eee',
  bg: '#444'
}

export default ThemeFactory => {
  const Default = ThemeFactory()

  const Light = ThemeFactory(themeDefaults)

  const Dark = ThemeFactory(themeDark)

  const Dynamic = ({ config, ...props }) => {
    const DynamicTheme = ThemeFactory(config)
    return <DynamicTheme {...props} />
  }

  return { Dynamic, Default, Light, Dark }
}
