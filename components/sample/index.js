const formatCode = code => {
  const lines = code.split('\n')
  const lastline = lines[lines.length - 1]
  const indent = (/^ +$/.test(lastline) && lastline.length) || 0
  return lines.map(line => line.slice(indent)).join('\n')
}

// TODO: simpify and tidy this section, perhaps this whole sample file
// TODO: trim leading newlines at xs breakpoint
// TODO: why can't I use withTheme around this component!!?
export default ({ input, output, title, breakpoint = '1400px', children, style }) =>
  <div style={style} className='outer'>
    <div className='inner'>
      {input && <pre><code><b>// input</b><br />{formatCode(input)}</code></pre>}
      {output && <pre><code className='secondary'><b>// output</b><br />{formatCode(output)}</code></pre>}
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
      @media screen and (min-width: ${breakpoint}) {
        .inner {
          // width: 333.333333%;
        }
      }
   `}</style>
  </div>
