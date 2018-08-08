// App wide config, can be overriden per page by adding config prop to Layout

const clr = {
  blue: '#5056a9',
  purple: '#e11bea',
  darkPink: '#d24188',
  black: '#444',
  darkGray: '#666',
  lightGray: '#bbb',
  white: '#fff',
  lightPink: '#ffe0e0',
  lighterPink: '#fff6f8',
  lightBlue: '#d4e1ec',
  lighterBlue: '#edf1f7'
}

export default {
  theme: {
    clr: {
      primary: clr.darkPink,
      secondary: clr.blue,
      accent: clr.lightPink,
      highlight: clr.lighterPink,
      secondaryAccent: clr.lightBlue,
      secondaryHighlight: clr.lighterBlue,
      black: clr.black,
      dark: clr.darkGray,
      light: clr.lightGray,
      white: clr.white
    },
    // grid: {
    //   unit: 1,
    //   breakpoints: { xs: 0, sm: 768, md: 992, lg: 1200, xl: 1400, xxl: 1400 }
    // },
    font: {
      body: 'Raleway, sans-serif',
      heading: 'Andika, sans-serif',
      code: 'Cousine, monospace'
    }
  }
}
