// App wide config, can be overriden per page by adding config prop to Layout

const clr = {
  // black: '#222',
  // white: '#eee'
  red: '#bd1000',
  // blue: '#2e38dc',
  blue: '#2a35d8',
  // purple: '#bd10e0',
  purple: '#e11bea',
  black: '#000',
  darkGray: '#333',
  lightGray: '#bbb',
  white: '#fff',
  lightPink: '#ffe0fc',
  lightBlue: '#e0f0ff'
}

export default {
  theme: {
    // fg: clr.white,
    // bg: clr.black,
    clr: {
      primary: clr.purple,
      secondary: clr.blue,
      accent: clr.lightPink,
      secondaryAccent: clr.lightBlue,
      black: clr.black,
      dark: clr.darkGray,
      light: clr.lightGray,
      white: clr.white
    },
    fontFamily: 'helvetica, tahoma, verdana, sans-serif',
    grid: {
      unit: 10
    }
  }
}
