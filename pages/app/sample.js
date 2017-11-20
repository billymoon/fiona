import { injectState } from 'freactal'

const formatCode = code => {
  const lines = code.split('\n')
  const lastline = lines[lines.length - 1]
  const indent = (/^ +$/.test(lastline) && lastline.length) || 0
  return lines.map(line => line.slice(indent)).join('\n')
}

export default injectState(({ input, output, title, state: { theme }, effects: {}, children, ...props }) => {
  return (
    <div className='root' {...props}>
      <div className='inner'>
        {input && <pre><code><b>// input</b><br />{formatCode(input)}</code></pre>}
        {output && <pre><code><b>// output</b><br />{formatCode(output)}</code></pre>}
        {output && <div className='clearfix' />}
        {children && <pre><code>{title && <b>// {title}<br /></b>}{formatCode(children)}</code></pre>}
        {children && <div className='clearfix' />}
      </div>
      <style jsx>{`
        pre {
          padding-top: 0;
          margin-top: 0;
        }
        code {
          float: left;
          white-space: pre-wrap;
          max-width: 100%;
          padding-right: 30px;
          margin-bottom: 15px;
          font-size: 14px;
          line-height: 20px;
        }
        .clearfix {
          clear: both;
        }
        @media screen and (min-width: ${theme.grid.breakpoints.md}px) {
          .inner {
            margin-top: -20px;
            margin-bottom: -20px;
          }
          .root {
            margin: 40px 0 80px -${2 / 12 * 100}%;
            width: ${133.3333}%;
            position: relative;
            border: 8px solid ${theme.bg};
          }
          .root:before, .root:after {
            position: absolute;
            content: '';
            // border: solid ${theme.clr.primary};
            border: solid ${theme.clr.light};
            z-index: -1;
          }
          .root:before {
            top: -16px; bottom: -16px;
            left: -1px; right: -1px;
            border-width: 0 1px;
          }
          .root:after {
            left: -16px; right: -16px;
            top: -1px; bottom: -1px;
            border-width: 1px 0;
          }
        }
     `}</style>
    </div>
  )
})
