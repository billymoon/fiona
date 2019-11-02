import Router from 'next/router'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

import config from './config'
import Fiona from './fiona-loader'

// TODO: find better place to initialise window.Fiona
if (process.browser) {
  window.seeded = Fiona(config.magicNumber)
}

const reducer = (state, action) => {
  if (action.type === 'SET_API_FILTER') {
    return { ...state, apiFilter: action.payload }
  } else if (action.type === 'TOGGLE_THEME') {
    const theme = { ...state.theme }
    if (action.payload % 2) {
      theme.clr = {
        ...config.theme.clr,
        primary: config.theme.clr.secondary,
        secondary: config.theme.clr.primary,
        accent: config.theme.clr.secondaryAccent,
        highlight: config.theme.clr.secondaryHighlight,
        secondaryAccent: config.theme.clr.accent,
        secondaryHighlight: config.theme.clr.highlight
      }
    } else {
      theme.clr = Object.assign({}, config.theme.clr)
    }

    return { ...state, theme: theme }
  } else if (action.type === 'TOGGLE_NAV') {
    return {
      ...state,
      closed:
        typeof action.payload === 'undefined' ? !state.closed : action.payload
    }
  } else if (action.type === 'TOGGLE_BLINK') {
    const blink = state.blink === null ? null : !state.blink
    return { ...state, blink: blink }
  } else if (action.type === 'CANCEL_BLINK') {
    clearInterval(state.blinkInterval)
    return { ...state, blink: false, blinkInterval: null }
  } else if (action.type === 'CLICK_SEED') {
    const index = action.payload
    const seed = state.seed
    const newSeed =
      (index === 24 ? config.magicNumber : index) === seed
        ? Math.floor(Math.random() * 33)
        : index === 24
        ? config.magicNumber
        : index
    if (process.browser) {
      window.seeded.reset(newSeed)
    }
    // TODO: redux compose this instead of duplicating logic
    clearInterval(state.blinkInterval)
    return { ...state, seed: newSeed, blink: false, blinkInterval: null }
  } else {
    return state
  }
}

const blinkIntervalID = setInterval(() => {
  store.dispatch({ type: 'TOGGLE_BLINK' })
}, 750)

const store = createStore(
  reducer,
  {
    blink: false,
    blinkInterval: blinkIntervalID,
    apiFilter: 'Fiona.Random',
    closed: true,
    seed: config.magicNumber,
    theme: Object.assign({}, config.theme)
  }
  // TODO: get redux dev tools working with next 7
)

// store.subscribe(() => {
//   console.log("subscribed", store.getState());
// });

export const provide = Component => {
  const Thing = () => (
    <Provider store={store}>
      <Component />
    </Provider>
  )

  Thing.getInitialProps = Component.getInitialProps

  return Thing
}

// TODO: be selective about what state is consumed per component, especially the blinking
export const withBlink = Component => {
  return connect(
    state => ({
      blink: state.blink,
      blinkInterval: state.blinkInterval
    }),
    dispatch => ({
      toggleBlink: () => dispatch({ type: 'TOGGLE_BLINK' }),
      cancelBlink: () => dispatch({ type: 'CANCEL_BLINK' })
    })
  )(Component)
}

export const withApi = Component => {
  return connect(
    state => ({
      apiFilter: state.apiFilter
    }),
    dispatch => ({
      setApiFilter: newfilter =>
        dispatch({ type: 'SET_API_FILTER', payload: newfilter })
    })
  )(Component)
}

export const withNav = Component => {
  return connect(
    state => ({
      closed: state.closed
    }),
    dispatch => ({
      toggleNav: () => dispatch({ type: 'TOGGLE_NAV' })
    })
  )(Component)
}

export const withThemeState = Component => {
  return connect(
    state => ({
      theme: state.theme
    }),
    dispatch => ({
      toggleTheme: index => dispatch({ type: 'TOGGLE_THEME', payload: index })
    })
  )(Component)
}

export const consume = Component => {
  return connect(
    state => ({
      seed: state.seed,
      theme: state.theme
    }),
    dispatch => ({
      clickSeed: index => dispatch({ type: 'CLICK_SEED', payload: index }),
      toggleTheme: index => dispatch({ type: 'TOGGLE_THEME', payload: index })
    })
  )(Component)
}

const handleRouteChange = url => {
  store.dispatch({ type: 'TOGGLE_NAV', payload: true })
}

Router.events.on('routeChangeComplete', handleRouteChange)

// // TODO: when toggle blink and navigate away, can try to set state in interval when component already destroyed
// const initialize = ({ toggleBlink }) => {
//   if (process.browser) {
//     const blinkInterval = setInterval(toggleBlink, 500)
//     return {
//       blinkInterval
//     }
//   } else {
//     return {}
//   }
// }
