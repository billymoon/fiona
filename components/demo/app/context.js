import { CreateContext, update } from '../../create-context'

export const { provide, consume } = CreateContext({
  awesome: {
    castle: {
      steps: 0,
      slopes: 5
    }
  }
}, {
  increaseAwesome: update('awesome.castle.steps', current => qty => current + qty),
  increaseSlopes: update('awesome.castle.slopes', (current, state) => qty => current + qty + state.awesome.castle.steps)
})
