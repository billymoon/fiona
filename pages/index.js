import { provideState, update } from 'freactal'

import fiona from '../src/fiona'
import '../plugins'

import { Shelf } from '../components'
import { Layout, Logo, DynamicOverview, QuickStart, SeededPRNG, Weighting, ChainedDataBuilder } from '../app'

if (process.browser) {
  window.fiona = fiona
}

export default provideState({
  initialState: () => ({
    seed: 24
  }),
  effects: {
    setSeed: update(({ seed }, newValue) => ({
      seed: seed === newValue ? Math.floor(Math.random() * 33) : newValue
    }))
  }
})(() =>
  <Layout>
    <Shelf style={{ textAlign: 'center' }}><Logo /></Shelf>
    <Shelf><DynamicOverview /></Shelf>
    <Shelf><QuickStart /></Shelf>
    <Shelf><SeededPRNG /></Shelf>
    <Shelf><Weighting /></Shelf>
    <Shelf><ChainedDataBuilder /></Shelf>
    <style global jsx>{`
      code {
        color: #bd10e0;
        font-family: Menlo,Monaco,Lucida Console,Liberation Mono, DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace, serif;
        font-size: 13px;
        line-height: 20px;
        // padding-right: 30px;
      }
      body {
        font-family: helvetica, arial, sans-serif;
        max-width: 900px;
        margin: auto;
      }
      .clearfix {
        clear: both;
      }
    `}</style>
  </Layout>
)
