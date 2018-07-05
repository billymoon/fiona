import { connect, configurableLayoutComponents, config } from '.'

const componentConfigurator = Component => {
  const ComponentProxy = ({ theme: { grid }, effects, ...props }) =>
    <Component config={Object.assign({}, config.theme.grid, grid)} {...props} />
  return connect(ComponentProxy)
}

export const {
  Container,
  Row,
  Col,
  Article,
  Shelf
} = configurableLayoutComponents(componentConfigurator)
