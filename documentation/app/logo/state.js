export default {
  initialState: () => ({
    blink: false
  }),
  effects: {
    initialize: effects => state => Object.assign({}, state, {
      interval: process.browser && effects.toggleBlink()
    }),
    // TODO: why is each click creating new blink state?
    toggleBlink: ({ toggleBlink }) => state => {
      // console.log(1, state.blink)
      if (state.blink !== null) {
        // console.log(3, state.blink)
        setTimeout(toggleBlink, 500)

        return Object.assign({}, state, {
          blink: !state.blink
        })
      } else {
        return state
      }
    },
    clickSeed: ({ setSeed }, index) => state => {
      setSeed(index === 24 ? 952684 : index)

      const newState = Object.assign({}, state, {
        blink: null
      })
      // console.log(2, newState.blink)
      return newState
    }
  }
}
