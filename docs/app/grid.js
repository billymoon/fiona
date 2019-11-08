import { configurableLayoutComponents, config } from '.'

// TODO: fix configurable grid
const componentConfigurator = Component => {
  const ComponentProxy = ({ theme: { grid }, effects, ...props }) => (
    <Component config={Object.assign({}, config.theme.grid, grid)} {...props} />
  )
  return ComponentProxy
}

export const {
  Container,
  Row,
  Col,
  Article,
  Shelf
} = configurableLayoutComponents(componentConfigurator)
