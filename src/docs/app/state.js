import { provideState, injectState, update } from 'freactal'

import fiona from '../..'
import config from './config'

export const connect = (componentState, ComponentPure) => {
  const Component = ({ state, effects, ...props }) => <ComponentPure {...state} {...effects} {...props} />
  return provideState(componentState)(injectState(Component))
}

export { injectState }

const initialState = () => ({
  seed: 952684,
  theme: config.theme,
  apiFilter: '',
  weighting: [0.95, 0.75, 1, 0.8]
})

const effects = {
  setSeed: update(({ seed }, newValue) => ({
    seed: seed === newValue ? Math.floor(Math.random() * 33) : newValue
  })),
  setApiFilter: update((state, apiFilter) => ({ apiFilter })),
  setWeighting: update((state, weighting) => ({ weighting }))
}

const localState = provideState({ initialState, effects })

export const withState = Component => localState(Component)
