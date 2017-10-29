import { Component } from 'react'
import Head from 'next/head'

import fiona from '../src/fiona'
import '../plugins'

import { Logo } from '../components/Svg.js'

if (process.browser) {
  window.fiona = fiona
}

const Sample = ({ title, children, ...props }) => {
  const lines = children.split('\n')
  const lastline = lines[lines.length - 1]
  const indent = (/^ +$/.test(lastline) && lastline.length) || 0
  const code = lines.map(line => line.slice(indent)).join('\n')
  return (
    <div {...props}>
      <pre>
        <code>{title && <b>// {title}</b>}{code}</code>
      </pre>
      <style jsx>{`
        float: left;
        pre, code {
          white-space: pre-wrap;
          max-width: 100%;
        }
      `}</style>
    </div>
  )
}

export default class Main extends Component {
  state = {
    selected: 24,
    blink: false,
    clicked: false
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({ blink: !this.state.blink })
      setTimeout(() => this.setState({ blink: !this.state.blink }), 300)
    }, 5000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const { selected, blink, clicked } = this.state
    return (
      <div>
        <Head>
          <link rel='icon' href='/static/favicon.png' sizes='16x16' type='image/png' />
        </Head>
        <div className='centered'>
          <Logo selected={selected} className={blink && !clicked ? 'blink' : ''} clickHandler={index => evt => this.setState({ clicked: true, selected: selected === index ? Math.floor(Math.random() * 33) : index })} />
        </div>
        <p>{fiona(selected).regex(`Fiona is a (helper|tool|library) for (creating|generating) (large)? (chunks|sets) of (seeded|pseudo|mock) random data\\. (At it's core it uses|It is based around) a (Xorshift(256)? )?(PRNG|pseudo random number generator) that (enables|assists with|makes a mockery of) (generating|creating) (repeatable|predictable) (seemingly|apparently|authentic (feeling|looking)) random data\\.`)}</p>

        <h2>Quickstart</h2>

        <p>Install via npm in usual way (<code>npm install fiona</code> and import into your app <code>import fiona from 'fiona'</code>) or from cdn (<code>{`<script src='https://cdn.jsdelivr.net/npm/fiona'></script>`}</code>)</p>

        <p><i>n.b. you can open the console and edit/run code from this page</i></p>

        <p>The most basic use case is to generate a random number: <code>{`fiona({ max: 1000000, min: 0 }).number()`}</code></p>

        <Sample title='input'>{`
        const myNumber = fiona(${selected || 952684}).number()
        const age = fiona(${selected || 952684}).number({ max: 100 })
        `}</Sample>

        <Sample title='output'>
          {'\n' + fiona(selected || 952684).number() +
           '\n' + fiona(selected || 952684).number({ max: 100 })
          }
        </Sample>

        <div className='clearfix' />

        <p>It becomes more useful when creating data structures.</p>

        <Sample title='input'>{`
        const ibanregex = /[A-Z]{2}\\d{2}( \\d{4}){4,5} \\d{1,3}/

        fiona(${selected || 952684}).data({
          age: ({ seeded }) => seeded.number({ max: 100 }),
          name: ({ seeded }) => seeded.name(),
          iban: ({ seeded }) => seeded.regex(ibanregex),
          favouriteColor: ({ seeded }) => seeded.oneOf([
            'red',
            'yellow',
            'blue'
          ])
        })
        `}</Sample>
        <Sample title='output'>
          {'\n\n\n' + JSON.stringify(fiona(selected || 952684).data({
            age: ({ seeded }) => seeded.number({ max: 100 }),
            name: ({ seeded }) => seeded.name(),
            iban: ({ seeded }) => seeded.regex(/[A-Z]{2}\d{2}( \d{4}){4,5} \d{0,3}/),
            favouriteColor: ({ seeded }) => seeded.oneOf(['red', 'yellow', 'blue'])
          }), null, 2)}
        </Sample>

        <div className='clearfix' />

        <h2>Seeded pseudo random number generator</h2>

        <p>At it's core, fiona has a seeded prng that will give back approximately evenly distributed floating point numbers between 0 and 1. The seed defaults to <code>{`Math.random()`}</code> can be passed in during initialisation. <code>{`fiona(seed = Math.random())`}</code></p>

        <Sample title='input'>{`
        const seeded = fiona(${selected || 952684})
        seeded.number()
        seeded.number()
        `}</Sample>

        <Sample title='output'>
          {'\n// hint: change the seed in the page banner\n' + fiona(selected || 952684).number() +
           '\n' + fiona(selected || 952684).callback(function () { this.number(); return this }).number()
          }
        </Sample>

        <div className='clearfix' />

        <p>The prng sets the initial seed when fiona is initialised, then tracks new seeds generated in consistent sequence internally. The seed can be reset to the initial value, or any arbitrary value at any time. This makes it easy to ensure data is repeatable.</p>

        <Sample title='input'>{`
        const seeded = fiona(${selected || 952684})
        seeded.number()
        seeded.reseed(${(selected || 952684) + 1})
        seeded.number()
        seeded.reseed(null) // reset seed
        seeded.number()
        `}</Sample>

        <Sample title='output'>{(function () {
          const out = ['']
          const seeded = fiona(selected || 952684)
          out.push(seeded.number())
          seeded.reseed((selected || 952684) + 1)
          out.push(seeded.number())
          seeded.reseed(null)
          out.push(seeded.number())
          return out.join('\n\n')
        })()}</Sample>

        <div className='clearfix' />

        <h2>Weighting</h2>

        <p>The idea of adding a weighting to the output of random allows for powerful manipulation of large sets of pseudo random data. For example, the distribution of income is not even, where many more people are on low income than high. If we simply choose from 10,000 to 1,000,000 then the average income would be around 505,000. If we add weighting, we can make this represent our target distribution much more accurately.</p>

        <Sample>{`
        const salary = fiona(${selected || 952684}).weighting(i => i * i * i).number(100000, 10000)
        // salary is integer between 10,000 and 100,000 but much more likely to be low
        `}</Sample>

        <div className='clearfix' />

        <p>The weighting function takes a floating point number from 0-1 and returns a number from 0-1. Bezier easing functions are a nice way to shape your data.</p>

        <Sample>{`
        import bezierEasing from 'bezier-easing'
        const salary = fiona(${selected || 952684}).weighting(bezierEasing(0.5, 1, 0, 1)).number(100000, 10000)
        `}</Sample>

        <div className='clearfix' />

        <p>You can also clamp or otherwise manipulate the output with weighting functions...</p>

        <Sample>{`
        const salary = fiona(${selected || 952684}).weighting(i => i < 0.1 ? 0.1 : i).number(100000)
        // any salary that would have been less than 10k will be 10k because the number method
        // is based on a call to random which has been passed through the weighting function
        `}</Sample>

        <div className='clearfix' />

        <h2>Chained data builder</h2>

        <p>Fiona supports jQuery like chaining and extendable plugin system. There is a data builder that takes advantage of this system to assist in building complex data structures that can be modified without the existing values changing. This works by using an inline function to set the values on the data structure, which is passed a clone of the chained fiona instance seeded with the position in the data structure (the path of the function setting the value) as `seeded`.</p>

        <p>There are also some core helper methods for selecting random elements from arrays for example.</p>

        <Sample>{`
        const seeded = fiona(${selected || 952684})
        
        // add some data to the instance
        seeded.chain({
          species: 'human',
          gender: ({ seeded }) => seeded.oneOf(['Male', 'Female']),
          planet: ({ data }) => data.gender === 'Male' ? 'Mars' : 'Venus'
        })

        // add some more data later on (extends existing data)
        seeded.chain({
          sentence: ({ me, seeded }) => \`I am a \${me.value().gender} from \${me.value().planet}\`
        })

        // call .value to get data
        const plainOldObject = seeded.value()
        `}</Sample>

        <div className='clearfix' />

        <p>The chained data method works by recursing and traversing objects and arrays, and any functions it finds, it will execute them, passing them the current data, a new seeded instance based on position in the data structure, the position as a path and an array builder helper.</p>

        <style global jsx>{`
          code {
            color: #bd10e0;
            font-family: Menlo,Monaco,Lucida Console,Liberation Mono, DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace, serif;
            font-size: 13px;
            line-height: 20px;
          }
          body {
            font-family: helvetica, arial, sans-serif;
            max-width: 840px;
            margin: auto;
          }
          p, pre, h2, h2 {
            padding: 0 15px;
          }
          .centered {
            text-align: center;
          }
          .clearfix {
            clear: both;
          }
          svg {
            width: 500px;
            max-width: 100%;
            height: auto;
            -webkit-user-select: none; /* webkit (safari, chrome) browsers */
            -moz-user-select: none; /* mozilla browsers */
            -khtml-user-select: none; /* webkit (konqueror) browsers */
            -ms-user-select: none; /* IE10+ */
          }
          svg path {
            stroke: #000;
          }
          svg path.inner {
            fill: #fff;
          }
          svg.blink g.selected path.inner {
            fill: #bd10e0;
          }
          svg path.inner:hover, svg path.outer:hover {
            cursor: pointer;
          }
          svg g.filled path.inner {
            fill: #000;
          }
          svg g.filled.selected path.inner {
            fill: #bd10e0;
          }
          svg path.outer {
            stroke: #000;
            fill: #000;
          }
          svg g.selected path.outer {
            stroke: #bd10e0;
            fill: #bd10e0;
          }
        `}</style>
      </div>
    )
  }
}
