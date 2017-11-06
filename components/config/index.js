import { provideState } from 'freactal'

export default provideState({ initialState: ({ config }) => config || {} })(({ children }) => children)
