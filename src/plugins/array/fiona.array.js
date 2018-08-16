const fiona = require('../../')
const { type } = require('../../utils')

fiona.plugin('array', ({ seeded }, qty, fn, postProcess=i=>i) => {
  const postProcessor = type(postProcess) === 'String' ? i => i.join(postProcess) : postProcess
  return postProcessor(seeded.data(({ arr }) => arr(qty, fn)))
})