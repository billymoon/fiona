import { injectState, provideState } from 'freactal'

import { isObject, mergeDeep } from './util'
export { isObject, mergeDeep }

import { defaults as gridDefaults, Container as PureContainer, Row as PureRow, Col as PureCol } from './grid'
export const Col = injectState(PureCol)
export const Row = injectState(PureRow)
export const Container = provideState({ initialState: (props, { freactal }) => ({
  theme: mergeDeep({}, { grid: gridDefaults }, freactal.state.theme)
}) })(injectState(PureContainer))
const ContainerRowCol = { Container, Row, Col }

import ShelfCreator from './shelf'
export const Shelf = ShelfCreator(ContainerRowCol)

import ArticleCreator from './article'
export const Article = ArticleCreator(ContainerRowCol)

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
