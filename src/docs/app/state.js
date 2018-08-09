import { StateFactory, mergeDeep } from '.'
import config from './config'

const globalState = {
  theme: config.theme,
  seed: config.magicNumber,
  blink: false,
  apiFilter: '',
  blinkInterval: null
}


const actions = {
  setSeed: ({ seed }, newValue) => ({ seed: seed === newValue ? Math.floor(Math.random() * 33) : newValue }),
  setApiFilter: ({}, newValue) => ({ apiFilter: newValue }),
  clickSeed: ({ seed, blinkInterval }, index) => {
    actions.cancelBlink({ blinkInterval })
    const newSeed = (index === 24 ? config.magicNumber : index) === seed ? Math.floor(Math.random() * 33) : (index === 24 ? config.magicNumber : index)
    return {
      blink: null,
      seed: newSeed
    }
  },
  // TODO: why is each click creating new blink state?
  toggleBlink: ({ blink }) => {
    if (blink !== null) {
      return {
        blink: !blink
      }
    } else {
      return {}
    }
  },
  cancelBlink: ({ blinkInterval }) => {
    clearInterval(blinkInterval)
    return {
      blink: null
    }
  }
}

// TODO: when toggle blink and navigate away, can try to set state in interval when component already destroyed
const initialize = ({ toggleBlink }) => {
  if (process.browser) {
    const blinkInterval = setInterval(toggleBlink, 500)
    return {
      blinkInterval
    }
  } else {
    return {}
  }
}

export const GlobalState = StateFactory(globalState, actions, initialize)

export const withState = GlobalState.withState

export const connect = GlobalState.inject
