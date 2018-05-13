import { provideState, injectState, update } from 'freactal'

import config from './config'

// const inject = Component => {
//   return injectState(({ state, effects, ...props }) => {
//     // console.log(state, props)
//     // return <Component state={state} effects={effects} {...props} />
//     return <Component {...state} {...effects} {...props} />
//   })
// }

// export const inject = Component => injectState(({ state, effects, ...props }) => <Component {...state} {...effects} {...props} />)

export const connect = (componentState, ComponentPure) => provideState(componentState)(injectState(({ state, effects, ...props }) => <ComponentPure {...state} {...effects} {...props} />))

// export const connect = (ComponentPure, componentState) => {
//   return provideState(componentState)(inject(ComponentPure))
// }

// export { inject }

const initialState = () => ({
  seed: 952684,
  theme: config.theme
})

const effects = {
  setSeed: update(({ seed }, newValue) => ({
    seed: seed === newValue ? Math.floor(Math.random() * 33) : newValue
  }))
}

export default provideState({ initialState, effects })

export const withState = Component => provideState({ initialState, effects })(injectState(Component))
