import { Fiona, consume, Sample } from '../../app'

const Section = ({ seed }) => (
  <section>
    <h3>Express Mock Server</h3>
    <p>
      This example assumes you have a project with dependencies added for{' '}
      <a href="https://www.npmjs.com/package/Fiona">Fiona</a>,{' '}
      <a href="https://www.npmjs.com/package/express">express</a> and{' '}
      <a href="https://www.npmjs.com/package/express-http-proxy">
        express-http-proxy
      </a>{' '}
      and that you have a development server running on port 3000 serving your
      web app.
    </p>
    <p>
      Define an express proxy server and run with nodejs - e.g. save the snippet
      as `server.js` and run `node server`
    </p>
    <Sample>{`
    // require dependencies
    const Fiona = require('fiona')
    const proxy = require('express-http-proxy')
    const express = require('express')
    
    // define express server
    const app = express()

    // define Fiona generated data handler for user api
    app.use('/api/user/:id', (req, res) => {
      res.end(Fiona(req.params.id).chain({
        fullname: Fiona.Fullname,
        age: Fiona.Number({ max: 100 })
      }).json())
    })

    // proxy other requests to main server
    app.use('/', proxy('http://localhost:3000'))

    // listen on an available port
    app.listen(3001, () => console.log(\`mocking '/api/user/:id' and proxying 3000 to 3001\`))
    `}</Sample>
    <p>
      The proxy server (running on{' '}
      <a href="http://localhost:3001">http://localhost:3001</a>) will forwarding
      traffic to your development server (running on{' '}
      <a href="http://localhost:3000">http://localhost:3000</a>) except api
      calls to <code>/api/user/:id</code> which will return generated data as
      json.
    </p>
    <p>
      From the proxied web page, you can now make requests to the user api along
      the lines of...
    </p>
    <Sample
      input={`
    fetch('/api/user/${seed}').then(r => r.json()).then(console.log)
    `}
      output={`\n${Fiona(seed).json({
        fullname: Fiona.Fullname,
        age: Fiona.Number({ max: 100 })
      })}`}
    />
    ... or with curl ...
    <Sample lang="none">{`
    $ curl http://localhost:3001/api/user/${seed}
    `}</Sample>
    <div className="clearfix" />
  </section>
)

export default consume(Section)
