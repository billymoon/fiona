const ArticleCreator = ({ Container, Row, Col }) => ({ children, ...props }) =>
  <Container {...props}>
    <Row>
      <Col md={8 / 12} offset-md={2 / 12}>
        {children}
      </Col>
    </Row>
  </Container>

export default ArticleCreator
