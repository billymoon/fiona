import { injectState } from './'
import { configurableLayoutComponents } from 'jsx-components'

export const defaultConfig = {
  equalized: true,
  unit: 10,
  fluidish: true,
  breakpoints: { xs: 0, sm: 768, md: 992, lg: 1200, xl: 1400, xxl: 1400 }
}

const componentConfigurator = Component => {
  const ComponentProxy = ({ state: { theme: { grid } }, effects, ...props }) =>
    <Component config={Object.assign({}, defaultConfig, grid)} {...props} />
  return injectState(ComponentProxy)
}

export const {
  Container,
  Row,
  Col,
  Article,
  Shelf
} = configurableLayoutComponents(componentConfigurator)
