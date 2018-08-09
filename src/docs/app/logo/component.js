import { fiona } from '../'

const pos = index => ({ x: (index % 11) * 40 + 10, y: Math.floor(index / 11) * 40 + 10 })

fiona.fn.getLines = function () {
  const out = []

  for (let i = 0; i < 33; i++) {
    if (((i + 1) % 11) && this.bool()) {
      out.push([i, i + 1])
    }

    if (i < 22 && this.bool()) {
      out.push([i, i + 11])
    }
  }

  return out
}

fiona.fn.getDots = function () {
  const out = []

  for (let i = 0; i < 33; i++) {
    out.push(this.bool({ chance: 0.2 }))
  }

  return out
}

const fionaLines = [
  [1, 2], [1, 23], [12, 13],
  [3, 25],
  [4, 26], [5, 27], [4, 5], [26, 27],
  [6, 28], [6, 29], [7, 29],
  [8, 30], [8, 9], [9, 31], [19, 20]
]

const fionaDots = [
  false, false, true, true, true, false, false, true, false, false, false,
  false, false, true, false, false, false, false, false, false, false, false,
  false, true, false, true, false, false, true, false, true, true, false
]

// TODO: simpify and tidy this section, perhaps this whole logo file
export default ({ seed, blink, theme, clickSeed }) =>
  <div className='root'>
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0, 0, 420, 100'>
      <g>
        {(seed === 952684 ? fionaLines : fiona(seed).getLines()).map(([p1, p2], index) =>
          <line key={index} x1={pos(p1).x} y1={pos(p1).y} x2={pos(p2).x} y2={pos(p2).y} strokeWidth='2' />
        )}
      </g>
      <g>
        {(seed === 952684 ? fionaDots : fiona(seed).getDots()).map((filled, index) =>
          <circle key={index} cx={pos(index).x} cy={pos(index).y} r={filled ? 10 : 8} strokeWidth={filled ? 0 : 2} className={[
            filled ? 'filled' : '',
            ((index === 24 ? 952684 : index) === seed && (blink ? 'blink selected' : 'selected')) || ''
          ].join(' ')} onClick={() => clickSeed(index)} />
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
      circle, line {
        fill: ${theme.clr.white};
        stroke: ${theme.clr.black};
      }
      circle:hover {
        cursor: pointer;
      }
      circle.filled {
        fill: ${theme.clr.black};
        stroke: ${theme.clr.white};
      }
      circle.selected {
        stroke: ${theme.clr.primary};
      }
      circle.blink {
        fill: ${theme.clr.primary};
      }
      circle.filled.selected {
        fill: ${theme.clr.primary};
      }
      @media screen and (min-width: 768px) {
        .root {
          margin: 60px auto 20px auto;
        }
      }
    `}</style>
  </div>
