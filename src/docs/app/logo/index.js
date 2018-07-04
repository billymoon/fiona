import { wrapWithState } from '..'

import Component from './component'
import state from './state'

export default wrapWithState(state, Component)
