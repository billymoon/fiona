import { connect } from '.'

const recurser = item => typeof item === 'string' ? item : recurser(item.props.children)

const extractText = ({ props: { children } }) => children.map(recurser).join('')

const shouldDisplay = (heading, apiFilter) => extractText(heading).toLowerCase().indexOf((apiFilter || '').toLowerCase()) === -1 ? 'none' : 'block'

const ApiSection = ({ heading, apiFilter, children }) =>
  <section style={{ display: shouldDisplay(heading, apiFilter) }}>
    <h3>{heading}</h3>
    {children}
  </section>

export default connect(ApiSection)
