import React from 'react'
import { provideState, injectState, update } from 'freactal'

import '../src/plugins'

import { Container, Row, Col } from './components'
import { Layout, Logo } from './app'

import { DynamicOverview, QuickStart, SeededPRNG, Weighting, ChainedDataBuilder, Plugins, Api } from './app/sections'

const fiona = require('../src')

if (process.browser) {
  window.fiona = fiona // eslint-disable-line
}

const Article = ({ children, ...props }) =>
  <Container {...props}>
    <Row>
      <Col md={8 / 12} offset-md={2 / 12}>
        {children}
      </Col>
    </Row>
  </Container>

const Content = injectState(({ state: { seed, theme } }) =>
  <div>
    <Article style={{ textAlign: 'center' }}><Logo /></Article>
    <Article style={{ textAlign: 'center' }}><h1>{fiona(seed).regex(/(The )?(Seeded )?((Pseudo )?Random )?Data Generator/)}</h1></Article>
    <Article><DynamicOverview /></Article>
    <Article><QuickStart /></Article>
    <Article><SeededPRNG /></Article>
    <Article><Weighting /></Article>
    <Article><ChainedDataBuilder /></Article>
    <Article><Plugins /></Article>
    <Article><Api /></Article>
  </div>
)

export default provideState({
  initialState: () => ({
    seed: 952684
  }),
  effects: {
    setSeed: update(({ seed }, newValue) => ({
      seed: seed === newValue ? Math.floor(Math.random() * 33) : newValue
    }))
  }
})(() => <Layout><Content /></Layout>)
