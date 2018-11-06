/* global test expect */

const fiona = require('../core')
fiona.register(['choose', require('../choose/choose')])
fiona.register(['lorem', require('./lorem').lorem])
fiona.register(['word', require('./lorem').word])
fiona.register(['sentence', require('./lorem').sentence])
fiona.register(['paragraph', require('./lorem').paragraph])

test('fiona.Lorem', () => {
  expect(fiona(1).lorem()).toBe('velit consectetur proident et ullamco exercitation deserunt culpa ut excepteur laboris ex nostrud in sit')
})

test('fiona.Lorem (can specify approximately how many words)', () => {
  expect(fiona(1).lorem({ qty: 2 })).toBe('velit consectetur')
})

test('fiona.Lorem (sometimes starts lorem ipsum)', () => {
  expect(fiona(7).lorem({ qty: 2 })).toBe('lorem ipsum proident id')
})

test('fiona.Word', () => {
  expect(fiona(1).word()).toBe('velit')
  expect(fiona(2).word()).toBe('eiusmod')
  expect(fiona(3).word()).toBe('nulla')
})

test('fiona.Sentence', () => {
  expect(fiona(1).sentence()).toBe('Velit consectetur proident et ullamco exercitation deserunt culpa ut excepteur laboris ex nostrud in sit in aliqua ad commodo non mollit esse eiusmod enim occaecat sunt.')
})

test('fiona.Paragraph', () => {
  expect(fiona(1).paragraph()).toBe('Amet proident labore ullamco nostrud deserunt in nisi excepteur laboris aliquip adipisicing sunt sed reprehenderit magna enim ea non mollit velit do ut occaecat dolor fugiat aliqua.  Pariatur esse laboris amet laborum adipisicing proident ut mollit consectetur sunt in sed aute consequat excepteur magna sint aliquip ullamco elit qui sit in eu nostrud id dolore do.  Duis mollit deserunt in aliqua velit exercitation ullamco pariatur nostrud sit veniam aute culpa ea ex occaecat reprehenderit commodo esse voluptate ut magna minim consectetur in incididunt qui elit excepteur amet.  Lorem ipsum nostrud in pariatur fugiat voluptate dolor ut proident laborum quis tempor qui nisi duis consequat eu dolor minim elit cillum aliquip aliqua ad.  Est incididunt sint dolore fugiat consectetur proident aliquip pariatur nulla deserunt ea exercitation labore esse sunt occaecat aliqua anim nostrud magna dolore culpa in voluptate velit sit cupidatat in quis.')
})
