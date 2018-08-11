import { CreateContext, update } from 'jsx-components'

import config from './config'

const globalState = {
  theme: config.theme,
  seed: config.magicNumber,
  blink: false,
  apiFilter: '',
  blinkInterval: null,
  chatter: []
}

const actions = {
  setSeed: update('seed', current => newValue => newValue ? Math.floor(Math.random() * 33) : newValue),
  setBlinkInterval: update('blinkInterval', () => newValue => newValue),
  setChatter: update('chatter', () => newValue => newValue),
  setApiFilter: update('apiFilter', () => newValue => newValue),
  clickSeed: update(null, ({ seed, blinkInterval }) => index => {
    clearInterval(blinkInterval)
    const newSeed = (index === 24 ? config.magicNumber : index) === seed ? Math.floor(Math.random() * 33) : (index === 24 ? config.magicNumber : index)
    return { seed: newSeed }
  }),
  toggleBlink: update('blink', blink => blink === null ? null : !blink),
  cancelBlink: update('blinkInterval', blink => {
    clearInterval(blinkInterval)
    return null
  })
}

export const { provide, consume } = CreateContext(globalState, actions)
