import { connect } from '.'

const recurser = item => typeof item === 'string' ? item : recurser(item.props.children)

const extractText = ({ props: { children } }) => children.map(recurser).join('')

const ApiSection = ({ heading, apiFilter, children, ...props }) =>
  <section {...props} style={{ display: extractText(heading).indexOf(apiFilter) === -1 ? 'none' : 'block' }}>
    <h3>{heading}</h3>
    {children}
  </section>

export default connect(ApiSection)
