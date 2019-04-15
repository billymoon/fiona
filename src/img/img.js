const RGB = (r, g, b) =>
  '#' + [r, g, b].map(i => `0${i.toString(16)}`.slice(-2)).join('')

const getme = clr => {
  return clr
    .slice(1)
    .match(/(..)/g)
    .map(i => parseInt(i, 16))
}

const mapper = (lows, highs) => i => {
  return lows.reduce((memo, value, index) => {
    const low = Math.min(highs[index], lows[index])
    const high = Math.max(highs[index], lows[index])
    const diff = high - low
    return `${memo}${(low + Math.ceil(diff * i)).toString(16)}`
  }, '#')
}

const colorMapperFactory = clrs => {
  const fns = clrs.map(({ start, end }) => mapper(getme(start), getme(end)))
  return i => {
    const index = Math.floor(clrs.length * i)
    // const index = Math.floor(i * 100) % clrs.length
    return fns[index](i)
  }
}

const img = (seeded, opts) => {
  const { seed, width, height, contrast, bg, colors } = Object.assign(
    seeded.object({
      seed: seeded.number(),
      width: 1000,
      height: 1000,
      // width: seeded.number({ min: 100, max: 1000 }),
      // height: seeded.number({ min: 100, max: 1000 }),
      contrast: seeded.number({ max: 1000 }),
      bg: RGB(
        seeded.number({ max: 255 }),
        seeded.number({ max: 255 }),
        seeded.number({ max: 255 })
      ),
      colors: seeded.array({ min: 1, max: 10 }, seeded => ({
        start: RGB(
          seeded.number({ max: 255 }),
          seeded.number({ max: 255 }),
          seeded.number({ max: 255 })
        ),
        end: RGB(
          seeded.number({ max: 255 }),
          seeded.number({ max: 255 }),
          seeded.number({ max: 255 })
        )
      }))
    }),
    opts
  )

  const colorMapper = colorMapperFactory(colors)

  const parts = []
  for (let i = 0; i < 100; i++) {
    const fillStyle = colorMapper(i / 100)
    const rotate = (seed * i) % 360
    const [x, y, w, h] = [5 * i, 5 / seed, i * seed, i]
      .map(Math.floor)
      .map(i => i % (Math.max(width, height) * 3))
    parts.push(
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" transform="rotate(${rotate})" fill="${fillStyle}" />`
    )
  }
  const svgwrapper = inner =>
    encodeURIComponent(`
    <svg width="${width}" height="${height}" viewBox="${-1 * width} ${-1 *
      height} ${width * 2} ${height *
      2}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <style>svg { background-color: ${bg}; }</style>
      ${inner}
    </svg>
  `)
  return `data:image/svg+xml;utf8,${svgwrapper(parts.join('\n'))}`
}

export default img
