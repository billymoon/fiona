// App wide config, can be overriden per page by adding config prop to Layout

// const clr = {
//   blue: '#112',
//   purple: '#222',
//   black: '#000',
//   darkGray: '#333',
//   lightGray: '#bbb',
//   white: '#fff',
//   lightPink: '#666',
//   lightBlue: '#999'
// }

// const clr = {
//   blue: '#2a35d8',
//   purple: '#e11bea',
//   darkPink: '#de3968',
//   black: '#505050',
//   darkGray: '#333',
//   lightGray: '#bbb',
//   white: '#fff',
//   lightPink: '#fe6d96',
//   lightBlue: '#e0f0ff'
// }

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
  // seed that creates data with name 'Miss Fiona Moon' and age '0'
  // Fiona.find(
  //   ({ name, age }) => name === 'Miss Fiona Moon' && age === 0,
  //   seeded => seeded.data({
  //     name: Fiona.call('name'),
  //     age: Fiona.call('number', { max: 100 })
  //   }),
  //   { startseed: 950000 }
  // ).info()
  magicNumber: 2983938, // 3482749 211502
  theme: {
    bg: clr.white,
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
    grid: {
      unit: 21,
      equalized: false,
      fluidish: false,
      breakpoints: { xs: 0, sm: 768, md: 992, lg: 1200, xl: 1400, xxl: 1400 }
    },
    font: {
      body: 'Raleway, sans-serif',
      heading: 'Andika, sans-serif',
      code: 'Cousine, monospace'
    }
  }
}
