export default ({ title, children, ...props }) => {
  const lines = children.split('\n')
  const lastline = lines[lines.length - 1]
  const indent = (/^ +$/.test(lastline) && lastline.length) || 0
  const code = lines.map(line => line.slice(indent)).join('\n')
  return (
    <div {...props}>
      <pre>
        <code>{title && <b>// {title}</b>}{code}</code>
      </pre>
      <style jsx>{`
        float: left;
        pre, code {
          white-space: pre-wrap;
          max-width: 100%;
        }
      `}</style>
    </div>
  )
}
