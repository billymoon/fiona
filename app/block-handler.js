import Fiona from "~/library/src";
import _ from "lodash";
import BlockContent from "@sanity/block-content-to-react";

const evaluateCode = code => {
  const globalFiona = global.Fiona;
  const globalSeed = global.seed;
  const global_ = global._;
  global.Fiona = Fiona;
  global.seed = 123;
  global._ = _;
  const result = eval(code);
  global.Fiona = globalFiona;
  global.seed = globalSeed;
  global._ = global_;
  return typeof result === "string" ? result : JSON.stringify(result, null, 2);
};

const CodeBlock = ({ node: { content, evaluate, render, syntaxOff } }) => {
  return evaluate ? (
    <Fragment>
      <div>// input</div>
      <pre>
        <code>{content}</code>
      </pre>
      <div>// output</div>
      <pre>
        <code>{evaluateCode(content)}</code>
      </pre>
    </Fragment>
  ) : (
    <pre>
      <code>{content}</code>
    </pre>
  );
};

const serializers = {
  types: {
    codeBlock: CodeBlock
  },
  container: Fragment
};

const blockHandler = ({ _type, _id, ...props }) => {
  if (_type === "richBlock") {
    return <BlockContent blocks={props.content} serializers={serializers} />;
  } else if (_type === "section") {
    return (
      <section key={_id}>
        <h3>{props.title}</h3>
        {blockHandler(props.content)}
      </section>
    );
  } else {
    return <div>default</div>;
  }
};

export default blockHandler;
