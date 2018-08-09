import { CreateContext, update } from 'jsx-components'

import config from './config'

const globalState = {
  theme: config.theme,
  seed: config.magicNumber,
  blink: false,
  apiFilter: '',
  blinkInterval: null
}

const actions = {
  setSeed: update('seed', current => newValue => newValue ? Math.floor(Math.random() * 33) : newValue),
  setApiFilter: update('apiFilter', () => newValue => newValue),
  clickSeed: update('seed', seed => index => {
    // actions.cancelBlink({ blinkInterval })
    const newSeed = (index === 24 ? config.magicNumber : index) === seed ? Math.floor(Math.random() * 33) : (index === 24 ? config.magicNumber : index)
    return newSeed
  }),
  // TODO: why is each click creating new blink state?
  toggleBlink: update('blink', blink => blink === null ? null : !blink),
  cancelBlink: update('blinkInterval', blink => {
    clearInterval(blinkInterval)
    return null
  })
}

export const { provide, consume } = CreateContext(globalState, actions)

// // TODO: when toggle blink and navigate away, can try to set state in interval when component already destroyed
// const initialize = ({ toggleBlink }) => {
//   if (process.browser) {
//     const blinkInterval = setInterval(toggleBlink, 500)
//     return {
//       blinkInterval
//     }
//   } else {
//     return {}
//   }
// }
