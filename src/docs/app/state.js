import { provideState, injectState, update } from '.'

import config from './config'

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

export const wrapWithState = (componentState, ComponentPure) => provideState(componentState)(connect(ComponentPure))

export const connect = ComponentPure => {
  const Component = ({ state, effects, ...props }) => <ComponentPure {...state} {...effects} {...props} />
  return injectState(Component)
}

export const withState = Component => localState(Component)
