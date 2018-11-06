import { Component } from "react";
import { connect } from "react-redux";

import { Layout, Article } from "../src/docs/app";
import { provide } from "../src/docs/app/state";
import fiona from "../src";

const Inner = ({ reseed, setReseed }) => (
  <Article>
    <button onClick={() => setReseed(123)}>set cycleseed to 123</button>
    <button onClick={() => setReseed(456)}>set cycleseed to 456</button>
    <p>{fiona(reseed).paragraph()}</p>
  </Article>
);

const App = connect(
  state => ({ reseed: state.reseed }),
  dispatch => ({
    setReseed: newseed => dispatch({ type: "SET", payload: newseed })
  })
)(Inner);

class Page extends Component {
  render() {
    return (
      <Layout>
        <App />
      </Layout>
    );
  }
}

export default provide(Page);
