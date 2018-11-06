import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import { CreateContext, update } from "jsx-components";

import config from "./config";

const globalState = {
  theme: Object.assign({}, config.theme),
  blink: false,
  apiFilter: "",
  blinkInterval: null
};

const actions = {
  setApiFilter: update("apiFilter", () => newValue => newValue),
  // TODO: why is each click creating new blink state?
  toggleBlink: update("blink", blink => (blink === null ? null : !blink)),
  toggleTheme: update("theme", theme => index => {
    if (index % 2) {
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
    return theme;
  }),
  cancelBlink: update("blinkInterval", blink => {
    clearInterval(blinkInterval);
    return null;
  })
};

const { provide: oldProvide, consume: oldConsume } = CreateContext(
  globalState,
  actions
);

const reducer = (state, action) => {
  if (action.type === "SET_SEED") {
    return { ...state, seed: action.payload };
  } else if (action.type === "CLICK_SEED") {
    const index = action.payload;
    const seed = state.seed;
    const newSeed =
      (index === 24 ? config.magicNumber : index) === seed
        ? Math.floor(Math.random() * 33)
        : index === 24
          ? config.magicNumber
          : index;
    return { ...state, seed: newSeed };
  } else {
    return state;
  }
};

const store = createStore(
  reducer,
  {
    seed: config.magicNumber
  },
  process.browser &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

// store.subscribe(() => {
//   console.log("subscribed", store.getState());
// });

// setInterval(() => {
//   store.dispatch({ type: "SET", payload: fiona().number() })
// }, 2000)

export const provide = Component => {
  const Provided = oldProvide(Component);
  const Thing = () => (
    <Provider store={store}>
      <Provided />
    </Provider>
  );
  return Thing;
};

export const consume = Component => {
  return connect(
    state => ({ seed: state.seed }),
    dispatch => ({
      setSeed: newseed =>
        dispatch({
          type: "SET_SEED",
          payload: newseed ? Math.floor(Math.random() * 33) : newseed
        }),
      clickSeed: index => dispatch({ type: "CLICK_SEED", payload: index })
    })
  )(oldConsume(Component));
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
