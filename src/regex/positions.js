import types from './types.js'

const positions = {}

positions.wordBoundary = () => ({ type: types.POSITION, value: 'b' })
positions.nonWordBoundary = () => ({ type: types.POSITION, value: 'B' })
positions.begin = () => ({ type: types.POSITION, value: '^' })
positions.end = () => ({ type: types.POSITION, value: '$' })

export default positions
