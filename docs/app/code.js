import Head from 'next/head'
import Highlight from "react-highlight/lib/optimized";

export default ({ bgColor='#fff6f8' , lang, children }) => (
  <div className="f5 editor">
    <style jsx>{`
      .editor {
        background-color: ${bgColor};
        background: linear-gradient(90deg, white 0%, ${bgColor} 5%, ${bgColor} 95%, white 100%);
      }
    `}</style>
    <style global jsx>{`
      .editor pre {
        margin: 0;
        white-space: pre-wrap;
      }
      .editor .hljs {
        // border: 1px solid silver;
        margin-bottom: 10px;
        background-color: transparent;
      }
      .editor .hljs .hljs-keyword,
      .editor .hljs .hljs-tag,
      .editor .hljs .hljs-attr,
      .editor .hljs .hljs-number {
        color: #5056a9;
        font-weight: 600;
      }
      .editor .hljs .hljs-comment {
        color: #d24188;
      }
      .editor .hljs-string {
        font-weight: 400;
      }
    `}</style>
    {lang === "none" ? (
      <pre className="hljs">
        <code>{children}</code>
      </pre>
    ) : (
      <Highlight
        className={lang || "javascript"}
        languages={["json", "xml", "javascript"]}
      >
        {children}
      </Highlight>
    )}
  </div>
);
