const formatCode = code => {
  const lines = code.split('\n')
  const lastline = lines[lines.length - 1]
  const indent = (/^ +$/.test(lastline) && lastline.length) || 0
  return lines.map(line => line.slice(indent)).join('\n')
}

export default ({ input, output, title, children, ...props }) => {
  return (
    <div className='root' {...props}>
      {input && <pre><code><b>// input</b><br />{formatCode(input)}</code></pre>}
      {output && <pre><code><b>// output</b><br />{formatCode(output)}</code></pre>}
      {children && <pre><code>{title && <b>// {title}<br /></b>}{formatCode(children)}</code></pre>}
      <div className='clearfix' />
      <style jsx>{`
        code {
          float: left;
          white-space: pre-wrap;
          max-width: 100%;
          padding-right: 30px;
          margin-bottom: 15px;
        }
        .clearfix {
          clear: both;
        }
      `}</style>
    </div>
  )
}
