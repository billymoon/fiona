import Head from 'next/head'
import Highlight from 'react-highlight/lib/optimized'

const Code = ({ bgColor = '#fff6f8', special = [], lang, children }) => (
  <div className={special.concat(['f5', 'editor']).join(' ')}>
    <style jsx>{`
      .editor {
        background-color: ${bgColor};
        background: linear-gradient(
          90deg,
          white 0%,
          ${bgColor} 5%,
          ${bgColor} 95%,
          white 100%
        );
      }

      .mobile-no-bg {
        background: none;
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

      .mobile-no-bg code {
        font-size: 14px;
      }
      @media screen and (min-width: 400px) {
        .mobile-no-bg code {
          font-size: 18px;
        }
      }
    `}</style>
    {lang === 'none' ? (
      <pre className="hljs">
        <code>{children}</code>
      </pre>
    ) : (
      <Highlight
        className={lang || 'javascript'}
        languages={['json', 'xml', 'javascript']}
      >
        {children}
      </Highlight>
    )}
  </div>
)

export default Code
