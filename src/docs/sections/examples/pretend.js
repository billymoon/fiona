import Pretender from 'fetch-pretender'

import { fiona, consume, Sample } from '../../app'

if (process.browser) {
  window.Pretender = Pretender
}

const pretender = new Pretender()

const modelMock = seed => fiona(seed).data({
  fullname: ({ seeded }) => seeded.fullname(),
  color: ({ seeded }) => seeded.oneOf(['red', 'yellow', 'blue']),
  age: ({ seeded }) => seeded.number({ max: 100 })
})

pretender.get('/user/:id', request => [
  200,
  { 'Content-Type': 'application/json' },
  JSON.stringify(modelMock(request.params.id))
])

pretender.get('/*all', pretender.passthrough)

const Section = ({ seed }) =>
  <section>
    <h3>Mocking `fetch` with Fetch Pretender</h3>

    <p>Assuming some kind of setup code loading <a href='https://github.com/sstur/fetch-pretender'>Fetch Pretender</a></p>

    <Sample>{`
    // Load a copy of \`fetch-pretender\`
    const fetchPretenderScript = document.createElement('script')
    fetchPretenderScript.src = 'https://cdn.rawgit.com/billymoon/fetch-pretender/master/dist/pretender.js'
    document.head.appendChild(fetchPretenderScript)
    `}</Sample>

    <p>You can define a mock server like this...</p>

    <Sample>{`
    const pretender = new Pretender()

    const modelMock = seed => fiona(seed).data({
      fullname: ({ seeded }) => seeded.fullname(),
      color: ({ seeded }) => seeded.oneOf(['red', 'yellow', 'blue']),
      age: ({ seeded }) => seeded.number({ max: 100 })
    })

    pretender.get('/user/:id', request => [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(modelMock(request.params.id))
    ])    
    `}</Sample>

    <p>Calls to fetch on specified routes will now be patched to return mock results generated by fiona.</p>

    <Sample input={`
    fetch('/user/${seed}').then(r => r.text()).then(console.log)
    `} output={`
    ${JSON.stringify(fiona(seed).data({
      fullname: ({ seeded }) => seeded.fullname(),
      color: ({ seeded }) => seeded.oneOf(['red', 'yellow', 'blue']),
      age: ({ seeded }) => seeded.number({ max: 100 })
    }))}
    `} />

    <div className='clearfix' />
  </section>

export default consume(Section)
