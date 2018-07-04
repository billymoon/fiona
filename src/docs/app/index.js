export { provideState, injectState, update } from 'freactal'

// Seems to be overridden by explicitly exported components
export * from 'jsx-components'

export { default as config } from './config'
export { default as fonts } from './fonts'
export { default as state, inject, withState, connect, wrapWithState } from './state'
export { default as fiona } from './fiona-loader'
export { withTheme, Theme } from './theme'

export { default as Layout } from './layout'
export { default as Logo } from './logo'
export { default as Nav } from './nav'
export { default as ApiSection } from './api-section'
export { Container, Row, Col, Article, Shelf } from './grid'

import config from './config'
import { Sample as VanillaSample} from 'jsx-components'
export const Sample = ({ ...props }) => <VanillaSample breakpoint={`${config.theme.grid.breakpoints.lg}px`} {...props} />
