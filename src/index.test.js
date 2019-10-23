import test from 'ava'
import Fiona from './index.js'

test('registers extensions to Fiona', t => {
  t.deepEqual(
    Object.keys(Fiona).sort(),
    [
      'version',
      'register',
      'Random',
      'Clone',
      'Number',
      'Object',
      'Json',
      'String',
      'Array',
      'Bool',
      'Choose',
      'OneOf',
      'Date',
      'Img',
      'Duplicable',
      'Lorem',
      'Word',
      'Sentence',
      'Paragraph',
      'Gender',
      'Title',
      'Firstname',
      'Firstnames',
      'Surname',
      'Fullname',
      'Regex',
      'Shuffle',
      'namedata'
    ].sort()
  )
})
