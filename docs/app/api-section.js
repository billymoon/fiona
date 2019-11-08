import { withApi } from './state'

const recurser = item =>
  typeof item === 'string' ? item : recurser(item.props.children)

const extractText = ({ props: { children } }) => children.map(recurser).join('')

// const shouldDisplay = (heading, apiFilter) => extractText(heading).toLowerCase().indexOf((apiFilter.toLowerCase() || '').toLowerCase()) === -1 ? 'none' : 'block'
const shouldDisplay = (heading, apiFilter) =>
  extractText(heading) === apiFilter ? 'block' : 'none'

const ApiSection = ({ heading, apiFilter, children }) => (
  <section style={{ display: shouldDisplay(heading, apiFilter) }}>
    <h3>{heading}</h3>
    {children}
  </section>
)

export default withApi(ApiSection)
