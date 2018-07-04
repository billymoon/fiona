import { injectState, configurableLayoutComponents, config } from '.'

const componentConfigurator = Component => {
  const ComponentProxy = ({ state: { theme: { grid } }, effects, ...props }) =>
    <Component config={Object.assign({}, config.theme.grid, grid)} {...props} />
  return injectState(ComponentProxy)
}

export const {
  Container,
  Row,
  Col,
  Article,
  Shelf
} = configurableLayoutComponents(componentConfigurator)
