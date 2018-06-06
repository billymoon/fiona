import { Container, Row, Col } from '..'

const Article = ({ children, ...props }) =>
  <Container {...props}>
    <Row>
      <Col md={8 / 12} offset-md={2 / 12}>
        {children}
      </Col>
    </Row>
  </Container>

export default Article
