import { fiona, consume, ApiSection, Sample } from '../docs/app'

const Section = ({ seed }) =>
  <span>
    <ApiSection heading={<span><small>fiona.fn.</small>data</span>}>

      <p>Any functions encountered in objects, arrays, or main argument when executed are passed an object with properties as follows:</p>

      <ul>
        <li><b>seeded</b>: a clone of the current instance of fiona seeded with the initial seed, and position of the called function within the data structure</li>
        <li><b>data</b>: the calculated data so far</li>
        <li><b>pos</b>: the position of called function within the data structure</li>
        <li><b>me</b>: a reference to the parent instance of fiona</li>
        <li><b>arr</b>: array generation helper taking the same arguments as `fiona.fn.arr`</li>
      </ul>

      <Sample input={`
      fiona(${seed}).data({
        initseed: ({ seeded }) => seeded.info().initseed,
        firstname: fiona.call('firstname'),
        surname: fiona.call('surname'),
        fullname: ({ data }) => \`\${data.surname}, \${data.firstname}\`,
        pos: ({ pos }) => pos,
        nested: [{ position: ({ pos }) => pos }],
        parentseed: ({ me }) => me.info().initseed,
        array: ({ arr }) => arr({ min: 5, max: 10 }, fiona.call('number'))
      })
      `} output={`${JSON.stringify(fiona(seed).data({
        initseed: ({ seeded }) => seeded.info().initseed,
        firstname: fiona.call('firstname'),
        surname: fiona.call('surname'),
        fullname: ({ data }) => `${data.surname}, ${data.firstname}`,
        pos: ({ pos }) => pos,
        nested: [{ position: ({ pos }) => pos }],
        parentseed: ({ me }) => me.info().initseed,
        array: ({ arr }) => arr({ min: 5, max: 10 }, fiona.call('number'))
      }), null, 2)}`} />
      <p>The main method for setting data on the instance of fiona.</p>

      <p>The input can be numeric or string, it will simply return the input value passed in.</p>

      <Sample input={`
      fiona(${seed}).data(123)
      `} output={`
      ${JSON.stringify(fiona(seed).data(123))}
      `} />

      <Sample input={`
      fiona(${seed}).data('abc')
      `} output={`
      ${JSON.stringify(fiona(seed).data('abc'))}
      `} />

      <p>If the input is an object, it be traversed, executing any functions found, and returning the resulting object.</p>

      <Sample input={`
      fiona(${seed}).data({ abc: 123 })
      fiona(${seed}).data({ def: () => 456 })
      fiona(${seed}).data({ g: { h: 8, f: () => 9 } }))
      `} output={`
      ${JSON.stringify(fiona(seed).data({ abc: 123 }))}
      ${JSON.stringify(fiona(seed).data({ def: () => 456 }))}
      ${JSON.stringify(fiona(seed).data({ g: { h: 8, f: () => 9 } }))}
      `} />

      <p>Similarly, arrays will be traversed and functions executed.</p>

      <Sample input={`
      fiona(${seed}).data([
        1,
        'two',
        () => 'three',
        {
          four: () => 'five',
          six: [
            7,
            () => 4 + 4
          ]
        }
      ])
      `} output={`\n${JSON.stringify(fiona(seed).data([1, 'two', () => 'three', { four: () => 'five', six: [7, () => 4 + 4] }]), null, 2)}`} />

      <p>If the argument is a function, it will be executed and returned.</p>

      <Sample input={`
      fiona(${seed}).data(() => 'happy' + ' ' + 'days')
      `} output={`
      ${JSON.stringify(fiona(seed).data(() => 'happy' + ' ' + 'days'))}
      `} />
    </ApiSection>
  </span>

export default consume(Section)
