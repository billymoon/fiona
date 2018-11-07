import { Provider, connect } from "react-redux";
import { createStore } from "redux";

import config from "./config";

const reducer = (state, action) => {
  if (action.type === "SET_SEED") {
    const newseed = action.payload;
    return {
      ...state,
      seed: newseed ? Math.floor(Math.random() * 33) : newseed
    };
  } else if (action.type === "SET_API_FILTER") {
    return { ...state, apiFilter: action.payload };
  } else if (action.type === "TOGGLE_THEME") {
    const theme = { ...state.theme };
    if (action.payload % 2) {
      theme.clr = {
        ...config.theme.clr,
        primary: config.theme.clr.secondary,
        secondary: config.theme.clr.primary,
        accent: config.theme.clr.secondaryAccent,
        highlight: config.theme.clr.secondaryHighlight,
        secondaryAccent: config.theme.clr.accent,
        secondaryHighlight: config.theme.clr.highlight
      };
    } else {
      theme.clr = Object.assign({}, config.theme.clr);
    }

    return { ...state, theme: theme };
  } else if (action.type === "TOGGLE_BLINK") {
    const blink = state.blink === null ? null : !state.blink;
    return { ...state, blink: blink };
  } else if (action.type === "CANCEL_BLINK") {
    clearInterval(state.blinkInterval);
    return { ...state, blink: false, blinkInterval: null };
  } else if (action.type === "CLICK_SEED") {
    const index = action.payload;
    const seed = state.seed;
    const newSeed =
      (index === 24 ? config.magicNumber : index) === seed
        ? Math.floor(Math.random() * 33)
        : index === 24
          ? config.magicNumber
          : index;
    // TODO: redux compose this instead of duplicating logic
    clearInterval(state.blinkInterval);
    return { ...state, seed: newSeed, blink: false, blinkInterval: null };
  } else {
    return state;
  }
};

const blinkIntervalID = setInterval(() => {
  store.dispatch({ type: "TOGGLE_BLINK" });
}, 750);

const store = createStore(
  reducer,
  {
    blink: false,
    blinkInterval: blinkIntervalID,
    apiFilter: "",
    seed: config.magicNumber,
    theme: Object.assign({}, config.theme)
  },
  process.browser &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

// store.subscribe(() => {
//   console.log("subscribed", store.getState());
// });

export const provide = Component => {
  const Thing = () => (
    <Provider store={store}>
      <Component />
    </Provider>
  );
  return Thing;
};

// TODO: be selective about what state is consumed per component, especially the blinking
export const consume = Component => {
  return connect(
    state => ({
      seed: state.seed,
      apiFilter: state.apiFilter,
      blink: state.blink,
      blinkInterval: state.blinkInterval,
      theme: state.theme
    }),
    dispatch => ({
      toggleBlink: () => dispatch({ type: "TOGGLE_BLINK" }),
      cancelBlink: () => dispatch({ type: "CANCEL_BLINK" }),
      setApiFilter: newfilter =>
        dispatch({ type: "SET_API_FILTER", payload: newfilter }),
      setSeed: newseed => dispatch({ type: "SET_SEED", payload: newseed }),
      clickSeed: index => dispatch({ type: "CLICK_SEED", payload: index }),
      toggleTheme: index => dispatch({ type: "TOGGLE_THEME", payload: index })
    })
  )(Component);
};

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
