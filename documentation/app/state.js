import { provideState, update } from 'freactal'

export default provideState({
  initialState: () => ({
    seed: 952684
  }),
  effects: {
    setSeed: update(({ seed }, newValue) => ({
      seed: seed === newValue ? Math.floor(Math.random() * 33) : newValue
    }))
  }
})
