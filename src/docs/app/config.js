// App wide config, can be overriden per page by adding config prop to Layout

const clr = {
  blue: '#2a35d8',
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
    // grid: {
    //   unit: 1,
    //   breakpoints: { xs: 0, sm: 768, md: 992, lg: 1200, xl: 1400, xxl: 1400 }
    // },
    fontFamily: 'helvetica, tahoma, verdana, sans-serif'
  }
}
