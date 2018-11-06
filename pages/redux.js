import { Component } from "react";
import { createStore } from "redux";

import { Layout, Article } from "../src/docs/app";
import { provide } from "../src/docs/app/state";

class Page extends Component {
  render() {
    const reducer = (state, action) => {
      if (action.type === "SET") {
        return action.payload
      }
    }

    const store = createStore(reducer, "seedcycle", process.browser && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

    store.subscribe(() => {
      console.log('subscribed', store.getState())
    })

    store.dispatch({ type: 'SET', payload: 123 })
    store.dispatch({ type: 'SET', payload: 456 })
  
    return (
      <Layout>
        <Article>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
            aut cupiditate voluptatem voluptates iure eaque dolor laborum
            exercitationem dolores atque suscipit autem neque in dolore ab
            dignissimos repellat natus rem!
          </p>
        </Article>
      </Layout>
    );
  }
}

export default provide(Page);
