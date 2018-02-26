import { connect } from '../state'

import Component from './component'
import state from './state'

export default connect(state, Component)
