import { provideState, injectState, update } from 'freactal'

import config from './config'

export const connect = (componentState, ComponentPure) => provideState(componentState)(injectState(({ state, effects, ...props }) => <ComponentPure {...state} {...effects} {...props} />))

export { injectState }

const initialState = () => ({
  seed: 952684,
  theme: config.theme,
  apiFilter: ''
})

const effects = {
  setSeed: update(({ seed }, newValue) => ({
    seed: seed === newValue ? Math.floor(Math.random() * 33) : newValue
  })),
  setApiFilter: update(({ apiFilter }, newValue) => ({
    apiFilter: newValue
  }))
}

const localState = provideState({ initialState, effects })

export const withState = Component => localState(Component)
