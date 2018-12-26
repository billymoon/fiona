import { Container, Row, Col } from '../grid'

// export configurable Article component that accepts pre-configured grid components
export const ArticleConfigurator = ({ Container, Row, Col }) => ({ children, style }) =>
  <Container style={style}>
    <Row>
      <Col md={8 / 12} offset-md={2 / 12}>
        {children}
      </Col>
    </Row>
  </Container>

// export the Article component with vanilla grid components
export default ArticleConfigurator({ Container, Row, Col })
