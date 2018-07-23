import { StateFactory, mergeDeep } from '.'
import config from './config'

export const GlobalState = StateFactory({
  theme: config.theme,
  seed: config.magicNumber,
  blink: false,
  apiFilter: '',
}, {
  doubleCool: ({ cool }) => ({ cool: cool * 2 }),
  setSeed: ({ seed }, newValue) => ({ seed: seed === newValue ? Math.floor(Math.random() * 33) : newValue }),
  setApiFilter: ({}, newValue) => ({ apiFilter: newValue }),
  clickSeed: ({ seed }, index) => ({ blink: null, seed: (index === 24 ? config.magicNumber : index) === seed ? Math.floor(Math.random() * 33) : (index === 24 ? config.magicNumber : index) })
  // TODO: re-instate blink
  // initialize: effects => state => Object.assign({}, state, {
  //   interval: process.browser && effects.toggleBlink()
  // }),
  // // TODO: why is each click creating new blink state?
  // toggleBlink: ({ toggleBlink }) => state => {
  //   if (state.blink !== null) {
  //     setTimeout(toggleBlink, 500)

  //     return Object.assign({}, state, {
  //       blink: !state.blink
  //     })
  //   } else {
  //     return state
  //   }
  // },
})

export const withState = GlobalState.withState

export const connect = GlobalState.inject
