import Component from '@reach/component-component'
import jQuery from 'jquery'
import './waterpipe'

import { Fiona, consume, Sample, withTheme } from '../../app'

const color = seeded =>
  '#' +
  [
    seeded.number({ max: 255 }),
    seeded.number({ max: 255 }),
    seeded.number({ max: 255 })
  ]
    .map(i => ('0' + i.toString(16)).slice(-2))
    .join('')
Fiona.register(color)

const didMount = (
  seed,
  { clr: { primary, accent, secondary, secondaryAccent } }
) => ({ refs }) => {
  const fiona = Fiona(seed)

  const target = jQuery(refs.smokey).html(`
    <div style="height: 500px; width: 100%; position: fixed; bottom: -50px; left: 0px;">
      <canvas>Your browser does not support HTML5 canvas.</canvas>
    </div>
  `)

  // const target = jQuery(refs.smokey).html(`
  //   <div style="height: 500px; width: 100%; position: fixed; bottom: -250px; left: 0px;">
  //     <canvas>Your browser does not support HTML5 canvas.</canvas>
  //   </div>
  // `)

  jQuery('div', target).waterpipe({
    seed,

    // gradientStart: fiona.color(),
    // gradientEnd: fiona.color(),
    // bgColorInner: fiona.color(),
    // bgColorOuter: fiona.color(),
    gradientStart: primary,
    gradientEnd: accent,
    bgColorInner: secondary,
    bgColorOuter: secondaryAccent,

    smokeOpacity: fiona.random(),
    numCircles: 1,
    maxMaxRad: 'auto',
    minMaxRad: 'auto',
    minRadFactor: 0,
    iterations: 8,
    drawsPerFrame: 1e2,
    lineWidth: 1,
    speed: 1
  })

  const target2 = jQuery(refs.smokey2).html(`
    <div style="height: 500px; width: 100%; position: fixed; bottom: -150px; left: 0px;">
      <canvas>Your browser does not support HTML5 canvas.</canvas>
    </div>
  `)

  true &&
    jQuery('div', target2).waterpipe({
      seed: seed + 1,

      // gradientStart: fiona.color(),
      // gradientEnd: fiona.color(),
      // bgColorInner: fiona.color(),
      // bgColorOuter: fiona.color(),
      gradientStart: secondary,
      gradientEnd: secondaryAccent,
      bgColorInner: primary,
      bgColorOuter: accent,

      smokeOpacity: fiona.random(),
      numCircles: 1,
      maxMaxRad: 'auto',
      minMaxRad: 'auto',
      minRadFactor: 0,
      iterations: 8,
      drawsPerFrame: 1e2,
      lineWidth: 1,
      speed: 1
    })

  const target3 = jQuery(refs.smokey3).html(`
    <div style="height: 500px; width: 100%; position: fixed; bottom: -250px; left: 0px;">
      <canvas>Your browser does not support HTML5 canvas.</canvas>
    </div>
  `)

  true &&
    jQuery('div', target3).waterpipe({
      seed: seed + 2,

      // gradientStart: fiona.color(),
      // gradientEnd: fiona.color(),
      // bgColorInner: fiona.color(),
      // bgColorOuter: fiona.color(),
      gradientStart: primary,
      gradientEnd: accent,
      bgColorInner: secondary,
      bgColorOuter: secondaryAccent,

      smokeOpacity: fiona.random(),
      numCircles: 1,
      maxMaxRad: 'auto',
      minMaxRad: 'auto',
      minRadFactor: 0,
      iterations: 8,
      drawsPerFrame: 1e2,
      lineWidth: 1,
      speed: 1
    })
}

const Section = ({ seed, theme }) => (
  <Component didMount={didMount(seed, theme)} didUpdate={didMount(seed, theme)}>
    {({ refs }) => (
      <section>
        <div ref={node => (refs.smokey = node)} />
        <div ref={node => (refs.smokey2 = node)} />
        <div ref={node => (refs.smokey3 = node)} />
        {/*
         */}
      </section>
    )}
  </Component>
)

export default consume(Section)
