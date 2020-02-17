import Fiona from "~/library/src";

const evaluate = code => {
  const globalFiona = global.Fiona;
  global.Fiona = Fiona;
  const result = eval(code);
  global.Fiona = globalFiona;
  return JSON.stringify(result, null, 2);
};

const Codeblock = ({ input }) => (
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

const Page = ({ data }) => (
  <div>
    <Codeblock input={data.shelves[0].content} />
  </div>
);

export default Page;
