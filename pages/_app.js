import "./_app.css";
import data from "~/cms/production-data.json";

const App = ({ Component, pageProps }) => {
  const { options } = Component;

  return (
    <Layout data={data} {...options}>
      <Component {...pageProps} data={data[5]} />
    </Layout>
  );
};

export default App;
