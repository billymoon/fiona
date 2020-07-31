export const themeDefaults = {
  fg: '#222',
  bg: '#fcfcfc'
}

const themeDark = {
  fg: '#eee',
  bg: '#444'
}

const Theme = ThemeFactory => {
  const Default = ThemeFactory()

  const Light = ThemeFactory(themeDefaults)

  const Dark = ThemeFactory(themeDark)

  const Dynamic = ({ config, ...props }) => {
    const DynamicTheme = ThemeFactory(config)
    return <DynamicTheme {...props} />
  }

  return { Dynamic, Default, Light, Dark }
}

export default Theme