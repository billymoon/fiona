export { default as ThemeCreator, themeDefaults } from './theme'
export { default as Sample } from './sample'
export { default as Ribbon } from './ribbon'
export { default as StateFactory } from './state-factory'
export { isObject, mergeDeep } from './util'
export { Container, Row, Col, gridDefaults } from './grid'
export { default as Shelf, ShelfConfigurator } from './shelf'
export { default as Article, ArticleConfigurator } from './article'

/* Grid and layout components */

import { Container, Row, Col } from './grid'
import { ArticleConfigurator } from './article'
import { ShelfConfigurator } from './shelf'

export const configurableLayoutComponents = wrapWithState => {
  const WrappedContainer = wrapWithState(Container)
  const WrappedRow = wrapWithState(Row)
  const WrappedCol = wrapWithState(Col)
  const gridComponents = { Container: WrappedContainer, Row: WrappedRow, Col: WrappedCol }
  return {
    Container: WrappedContainer,
    Row: WrappedRow,
    Col: WrappedCol,
    Article: ArticleConfigurator(gridComponents),
    Shelf: ShelfConfigurator(gridComponents)
  }
}
