import { Component } from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import { Layout, Article } from "../src/docs/app";
import { provide } from "../src/docs/app/state";
import fiona from "../src";

const reducer = (state, action) => {
  if (action.type === "SET") {
    return action.payload;
  }
};

const store = createStore(
  reducer,
  process.browser &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  console.log("subscribed", store.getState());
});

setInterval(() => {
  store.dispatch({ type: "SET", payload: fiona().number() })
}, 2000)

class Inner extends Component {
  render() {
    const { reseed, set123, set456 } = this.props;
    return (
      <Article>
        <button onClick={set123}>set cycleseed to 123</button>
        <button onClick={set456}>set cycleseed to 456</button>
        <p>{fiona(reseed).paragraph()}</p>
      </Article>
    );
  }
}

// const InnerState = connect(
//   state => ({ reseed: state }),
//   dispatch => ({
//     set123: () => dispatch({ type: "SET", payload: 123 }),
//     set456: () => dispatch({ type: "SET", payload: 456 })
//   })
// )(Inner);
const App = ({ reseed, set123, set456 }) =>
  <Layout>
    <Inner reseed={reseed} set123={set123} set456={set456} />
  </Layout>

const AppState = connect(
  state => ({ reseed: state }),
  dispatch => ({
    set123: () => dispatch({ type: "SET", payload: 123 }),
    set456: () => dispatch({ type: "SET", payload: 456 })
  })
)(App)

class Page extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppState />
      </Provider>
    );
  }
}

export default provide(Page);
