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
        <code>
          <b>// {title}</b>{'\n'}
          {code}
        </code>
      </pre>
      <style jsx>{`
        float: left;
        pre {
          white-space: pre-wrap;
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
        {[
          `Fiona is a (helper|tool|library) for (creating|generating) (large)? (chunks|sets) of (seeded|pseudo|mock) random data\\.`,
          `(At it's core it uses|It is based around) a (Xorshift(256)? )?(PRNG|pseudo random number generator) that (enables|assists with|makes a mockery of) (generating|creating) (repeatable|predictable) (seemingly|apparently|authentic (feeling|looking)) random data\\.`
        ].map((item, index) => <p key={index}>{fiona(selected).regex(item)}</p>)}

        <Sample title='input'>{`
        fiona(${selected || 952684}).data({
          age: ({ seeded }) => seeded.number({ max: 100 }),
          name: ({ seeded }) => seeded.name(),
          favouriteColor: ({ seeded }) => seeded.oneOf([
            'red',
            'pink',
            'orange',
            'green',
            'blue'
          ])
        })
        `}</Sample>
        <Sample title='output'>
          {'\n' + JSON.stringify(fiona(selected || 952684).data({
            age: ({ seeded }) => seeded.number({ max: 100 }),
            name: ({ seeded }) => seeded.name(),
            favouriteColor: ({ seeded }) => seeded.oneOf(['red', 'pink', 'orange', 'green', 'blue'])
          }), null, 2)}
        </Sample>
        <style global jsx>{`
          code {
            color: #bd10e0;
            font-family: Menlo,Monaco,Lucida Console,Liberation Mono, DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace, serif;
            font-size: 13px;
            line-height: 20px;
          }
          body {
            font-family: helvetica, arial, sans-serif;
            max-width: 1200px;
            margin: auto;
          }
          p, pre {
            padding: 0 15px;
          }
          .centered {
            text-align: center;
          }
          svg {
            width: 800px;
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
            fill: #f00;
          }
          svg path.inner:hover, svg path.outer:hover {
            cursor: pointer;
          }
          svg g.filled path.inner {
            fill: #000;
          }
          svg g.filled.selected path.inner {
            fill: #f00;
          }
          svg path.outer {
            stroke: #000;
            fill: #000;
          }
          svg g.selected path.outer {
            stroke: #f00;
            fill: #f00;
          }
        `}</style>
      </div>
    )
  }
}
