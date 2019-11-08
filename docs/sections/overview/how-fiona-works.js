import Link from 'next/link'
import { Fiona, consume, Shelf, Row, Col } from '../../app'

const Section = ({ seed }) => (
  <section>
    <h2>How Fiona works</h2>
    <Row>
      <Col sm={6 / 12} push-sm={6 / 12}>
        <img src="/static/img/seeded-data.png" alt="" />
      </Col>
      <Col sm={6 / 12} pull-sm={6 / 12}>
        <p>
          The XOR shift PRNG at Fiona's core generates on demand a set of pseudo
          random data.
        </p>
        <p>
          For a given seed, the generated data is identical, changing the seed
          changes the data.
        </p>
        <p>The data appears to be random, but is deterministic.</p>
      </Col>
    </Row>
    <Row>
      <Col sm={6 / 12}>
        <img src="/static/img/data-flow.png" alt="" />
      </Col>
      <Col sm={6 / 12}>
        <p>
          When a seed is passed to Fiona, it returns a seeded instance with data
          generation methods.
        </p>
        <p>
          Each time a method needs random data, the seeded instance carves off a
          chunk from the PRNG.
        </p>
        <p>Complex data structures can be built up in a repeatable way.</p>
        <p>
          Fiona clones the seeded instance for each piece of data, seeding the
          clone with a combination of the original seed, and the data path. This
          means that adding to the data structure does not change existing
          values.
        </p>
        <p>
          <b>
            The data generated remains consistent even with updates to the
            structure.
          </b>
        </p>
      </Col>
    </Row>
    <style jsx>{`
      img {
        width: 100%;
      }
    `}</style>
  </section>
)

export default consume(Section)
