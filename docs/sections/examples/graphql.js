import Head from 'next/head'
import { Fiona, consume, Sample } from '../../app'
import fetchMock from 'fetch-mock'

fetchMock.config.fallbackToNetwork = true

// console.log(server)

// fetchMock.post('http://localhost:3000/graphql', server.getHandler());
let hasRun = false
const Section = ({ seed }) => {
  if (process.browser) {
    window.fetchMock = fetchMock

    const modelMock = seed =>
      Fiona(seed).object({
        fullname: seeded => seeded.fullname(),
        color: seeded => seeded.oneOf(['red', 'yellow', 'blue']),
        age: seeded => seeded.number({ max: 100 })
      })

    const data = Fiona().object({
      posts: Fiona.Array(10, () => ({
        id: Fiona.Number,
        title: Fiona.Lorem,
        views: Fiona.Number,
        user_id: Fiona.Number
      })),
      users: [{ id: 123, name: 'John Doe' }, { id: 456, name: 'Jane Doe' }],
      comments: [
        {
          id: 987,
          post_id: 1,
          body: 'Consectetur adipiscing elit',
          date: new Date('2017-07-03')
        },
        {
          id: 995,
          post_id: 1,
          body: 'Nam molestie pellentesque dui',
          date: new Date('2017-08-17')
        }
      ]
    })

    const server = JsonGraphqlServer({ data })

    if (!hasRun) {
      hasRun = true
      fetchMock.post('http://localhost:1231/graphql', server.getHandler())
    }

    fetch('http://localhost:1231/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: 'query allPosts { allPosts { title, user_id } }'
      })
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
      })
  }

  return (
    <section>
      <Head>
        <script
          src={`https://cdn.jsdelivr.net/npm/json-graphql-server@2.1.3/lib/json-graphql-server.client.min.js`}
        />
      </Head>

      <div className="clearfix" />
    </section>
  )
}

export default consume(Section)
