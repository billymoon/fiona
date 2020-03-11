import Fiona from "~/library/src";

const evaluate = code => {
  const globalFiona = global.Fiona;
  const globalSeed = global.seed;
  global.Fiona = Fiona;
  global.seed = 123;
  const result = eval(code);
  global.Fiona = globalFiona;
  global.seed = globalSeed;
  return JSON.stringify(result, null, 2);
};

const Codeblock = ({ input, ...props }) => (
  <div>
    // input
    <pre>
      <code>{input}</code>
    </pre>
    // output
    <pre>
      <code>{evaluate(input)}</code>
    </pre>
  </div>
);

const Page = (...props) => (
  <div log={console.log(22, props)}>
    <Codeblock input={`Fiona(seed).array(5, Fiona.Fullname)`} />
  </div>
);

// export const getStaticProps = async () => {
//   console.log(11);
//   return {
//     props: {
//       a: 3
//     }
//   };
// };

export default Page;
