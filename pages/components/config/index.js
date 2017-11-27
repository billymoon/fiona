import { provideState, injectState } from 'freactal'

export default provideState({ initialState: ({ config }) => config || {} })(injectState(({ children }) => children))
