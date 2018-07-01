import { injectState } from './'
import { Container as DefaultContainer, Row as DefaultRow, Col as DefaultCol, ArticleCreator, ShelfCreator } from '../components'

export const defaultConfig = {
  equalized: true,
  unit: 10,
  fluidish: true,
  breakpoints: { xs: 0, sm: 768, md: 992, lg: 1200, xl: 1200, xxl: 1200 }
}

const configured = Component => injectState(({ state, effects, ...props }) => <Component config={Object.assign({}, defaultConfig, (state.theme || {}).grid)} {...props} />)

export const Container = configured(DefaultContainer)
export const Row = configured(DefaultRow)
export const Col = configured(DefaultCol)

export const Article = ArticleCreator({ Container, Row, Col })
export const Shelf = ShelfCreator({ Container, Row, Col })
