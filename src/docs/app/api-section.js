import { injectState } from 'freactal'

const recurser = item => typeof item === 'string' ? item : recurser(item.props.children)

const extractText = ({ props: { children } }) => children.map(recurser).join('')

const ApiSection = ({ heading, state: { apiFilter }, children, ...props }) =>
  <section {...props} style={{ display: extractText(heading).indexOf(apiFilter) === -1 ? 'none' : 'block' }}>
    <h3>{heading}</h3>
    {children}
  </section>

export default injectState(ApiSection)
