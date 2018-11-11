/* global test expect */

const Fiona = require('../core')
Fiona.register(['choose', require('../choose/choose')])
Fiona.register(['lorem', require('./lorem').lorem])
Fiona.register(['word', require('./lorem').word])
Fiona.register(['sentence', require('./lorem').sentence])
Fiona.register(['paragraph', require('./lorem').paragraph])

test('Fiona.Lorem', () => {
  expect(Fiona(1).lorem()).toBe(
    'velit consectetur proident et ullamco exercitation deserunt culpa ut excepteur laboris ex nostrud in sit'
  )
})

test('Fiona.Lorem (can specify approximately how many words)', () => {
  expect(Fiona(1).lorem({ qty: 2 })).toBe('velit consectetur')
})

test('Fiona.Lorem (sometimes starts lorem ipsum)', () => {
  expect(Fiona(7).lorem({ qty: 2 })).toBe('lorem ipsum proident id')
})

test('Fiona.Word', () => {
  expect(Fiona(1).word()).toBe('velit')
  expect(Fiona(2).word()).toBe('eiusmod')
  expect(Fiona(3).word()).toBe('nulla')
})

test('Fiona.Sentence', () => {
  expect(Fiona(1).sentence()).toBe(
    'Velit consectetur proident et ullamco exercitation deserunt culpa ut excepteur laboris ex nostrud in sit in aliqua ad commodo non mollit esse eiusmod enim occaecat sunt.'
  )
})

test('Fiona.Paragraph', () => {
  expect(Fiona(1).paragraph()).toBe(
    'Amet proident labore ullamco nostrud deserunt in nisi excepteur laboris aliquip adipisicing sunt sed reprehenderit magna enim ea non mollit velit do ut occaecat dolor fugiat aliqua.  Pariatur esse laboris amet laborum adipisicing proident ut mollit consectetur sunt in sed aute consequat excepteur magna sint aliquip ullamco elit qui sit in eu nostrud id dolore do.  Duis mollit deserunt in aliqua velit exercitation ullamco pariatur nostrud sit veniam aute culpa ea ex occaecat reprehenderit commodo esse voluptate ut magna minim consectetur in incididunt qui elit excepteur amet.  Lorem ipsum nostrud in pariatur fugiat voluptate dolor ut proident laborum quis tempor qui nisi duis consequat eu dolor minim elit cillum aliquip aliqua ad.  Est incididunt sint dolore fugiat consectetur proident aliquip pariatur nulla deserunt ea exercitation labore esse sunt occaecat aliqua anim nostrud magna dolore culpa in voluptate velit sit cupidatat in quis.'
  )
})
