import { Fiona, config, consume, withBlink } from '.'

const pos = index => ({
  x: (index % 11) * 40 + 10,
  y: Math.floor(index / 11) * 40 + 10
})

const getLines = seeded => {
  const out = []

  for (let i = 0; i < 33; i++) {
    if ((i + 1) % 11 && seeded.bool()) {
      out.push([i, i + 1])
    }

    if (i < 22 && seeded.bool()) {
      out.push([i, i + 11])
    }
  }

  return out
}

const getDots = seeded => {
  const out = []

  for (let i = 0; i < 33; i++) {
    out.push(seeded.bool({ chance: 0.2 }))
  }

  return out
}

Fiona.register(['getLines', getLines], ['getDots', getDots])

// prettier-ignore
const fionaLines = [
  [1, 2], [1, 23], [12, 13],
  [3, 25],
  [4, 26], [5, 27], [4, 5], [26, 27],
  [6, 28], [6, 29], [7, 29],
  [8, 30], [8, 9], [9, 31], [19, 20]
]

// prettier-ignore
const fionaDots = [
  0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0,
  0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0
]

// TODO: simpify and tidy this section, perhaps this whole logo file
const Logo = ({
  seed,
  blink,
  blinkInterval,
  theme,
  clickSeed,
  toggleTheme
}) => (
  <div className="root">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0, 0, 420, 100">
      <g>
        {(seed === config.magicNumber
          ? fionaLines
          : Fiona(seed).getLines()
        ).map(([p1, p2], index) => (
          <line
            key={index}
            x1={pos(p1).x}
            y1={pos(p1).y}
            x2={pos(p2).x}
            y2={pos(p2).y}
            strokeWidth="2"
          />
        ))}
      </g>
      <g>
        {(seed === config.magicNumber ? fionaDots : Fiona(seed).getDots()).map(
          (filled, index) => (
            <circle
              key={index}
              cx={pos(index).x}
              cy={pos(index).y}
              r={8}
              strokeWidth={2}
              className={[
                !blinkInterval &&
                (index === 24 ? config.magicNumber : index) === seed
                  ? 'filled'
                  : '',
                ((index === 24 ? config.magicNumber : index) === seed &&
                  (blink ? 'blink selected' : 'selected')) ||
                  ''
              ].join(' ')}
              onClick={() => {
                // TODO: move this into clickSeed action
                toggleTheme(index)
                return clickSeed(index)
              }}
            />
          )
        )}
      </g>
    </svg>
    <style jsx>{`
      .root {
        margin: 20px auto 0px auto;
        max-width: 400px;
      }
      circle {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      circle {
        stroke: ${theme.clr.secondary};
        fill: ${theme.clr.white};
      }
      line {
        stroke: ${theme.clr.primary};
        stroke-width: 10px;
        fill: ${theme.clr.white};
      }
      circle:hover {
        cursor: pointer;
      }
      circle.filled {
        fill: ${theme.clr.secondary};
        stroke: ${theme.clr.white};
      }
      circle.selected {
        stroke: ${theme.clr.secondary};
      }
      circle.blink {
        fill: ${theme.clr.secondary};
      }
      circle.filled.selected {
        fill: ${theme.clr.secondary};
      }
      @media screen and (min-width: 768px) {
        .root {
          margin: 60px auto 20px auto;
        }
      }
    `}</style>
  </div>
)

export default withBlink(consume(Logo))
