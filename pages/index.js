import { Component } from 'react'

import fiona from '../src/fiona'
import '../plugins'

import { Logo } from '../components/Svg.js'

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
        <div className='centered'>
          <Logo selected={selected} className={blink && !clicked ? 'blink' : ''} clickHandler={index => evt => this.setState({ clicked: true, selected: selected === index ? Math.floor(Math.random() * 33) : index })} />
        </div>
        {[
          `Fiona is a (helper|tool|library) for (creating|generating) (large)? (chunks|sets) of (seeded|pseudo|mock) random data\\.`,
          `(At it's core it uses|It is based around) a (Xorshift(256)? )?(PRNG|pseudo random number generator) that (enables|assists with|makes a mockery of) (generating|creating) (repeatable|predictable) (seemingly|apparently|authentic (feeling|looking)) random data\\.`
        ].map((item, index) => <p key={index}>{fiona(selected).regex(item)}</p>)}
        <style global jsx>{`
          body {
            font-family: helvetica, arial, sans-serif;
            max-width: 1200px;
            margin: auto;
          }
          p {
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
