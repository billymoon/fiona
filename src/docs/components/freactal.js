import { injectState, provideState } from 'freactal'

import { isObject, mergeDeep } from './util'
export { isObject, mergeDeep }

export { Container, Row, Col } from './grid'

export { default as ShelfCreator } from './shelf'

export { default as ArticleCreator } from './article'

export const withTheme = Component => injectState(({ state, ...props }) => <Component theme={state.theme} state={state} {...props} />)

import ThemeCreator, { themeDefaults } from './theme'
export const ThemeFactory = properties => provideState({ initialState: (props, { freactal }) => ({
  theme: {
    ...mergeDeep({}, themeDefaults, freactal.state.theme, properties)
  }
}) })(({ children }) => children)
export const Theme = ThemeCreator(ThemeFactory)

export { default as Sample } from './sample'
export { default as Ribbon } from './ribbon'
