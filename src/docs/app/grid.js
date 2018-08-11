import { configurableLayoutComponents, config, consume } from '.'

// TODO: fix configurable grid
const componentConfigurator = Component => {
  const ComponentProxy = ({ theme: { grid }, ...props }) =>
    <Component config={Object.assign({}, config.theme.grid, grid)} {...props} />
  return consume(ComponentProxy)
}

export const {
  Container,
  Row,
  Col,
  Article,
  Shelf
} = configurableLayoutComponents(componentConfigurator)
