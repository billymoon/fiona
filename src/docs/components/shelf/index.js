const Shelf = ({ Container, Row, Col }) => ({ head, section1, section2, section3, split, indent, rtl, children, ...props }) => {
  const splitr = section2 ? section3 ? 1 / 3 : 1 / 2 : 1
  const split1 = split && !section3 ? split : splitr
  const split2 = split && !section3 ? 1 - split : splitr
  const split3 = splitr
  const push1 = rtl ? section2 ? split2 + (section3 ? split3 : 0) : 0 : 0
  const pull2 = rtl ? section3 ? 0 : split1 : 0
  const pull3 = rtl ? split1 + split2 : 0
  return (
    <Container {...props}>
      {head &&
      <Row>
        <Col sm={1} offset-sm={indent}>{head}</Col>
      </Row>
      }
      {section1 &&
      <Row>
        <Col sm={split1} push-sm={push1} offset-sm={indent}>{section1}</Col>
        {section2 &&
        <Col sm={split2} pull-sm={pull2}>{section2}</Col>
        }
        {section2 && section3 &&
        <Col sm={split3} pull-sm={pull3}>{section3}</Col>
        }
      </Row>
      }
      {children &&
      <Row>
        <Col sm={split || 1} offset-sm={indent}>{children}</Col>
      </Row>
      }
    </Container>
  )
}

Shelf.defaultProps = {
  rtl: false,
  indent: 0
}

export default Shelf
