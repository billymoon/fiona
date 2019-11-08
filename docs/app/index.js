// Seems to be overridden by explicitly exported components
export * from '../../components'

export { default as config } from './config'
export {
  provide,
  consume,
  withBlink,
  withApi,
  withThemeState,
  withNav
} from './state'
export { default as Fiona } from './fiona-loader'
export { withTheme, Theme } from './theme'

export { default as Layout } from './layout'
export { default as Logo } from './logo'
export { default as Nav } from './nav'
export { default as ApiSection } from './api-section'
export { default as Code } from './code'
import Code from './code'
// TODO: re-instate configurable grid
// export { Container, Row, Col, Article, Shelf } from './grid'

import config from './config'
import { Sample as VanillaSample } from '../../components'
// TODO: improve code sample component
// export const Sample = ({ ...props }) => <VanillaSample breakpoint={`${config.theme.grid.breakpoints.lg}px`} {...props} />

const formatCode = code => {
  const lines = code.split('\n')
  const lastline = lines[lines.length - 1]
  const indent = (/^ +$/.test(lastline) && lastline.length) || 0
  return lines
    .map(line => line.slice(indent))
    .join('\n')
    .replace(/\n\n+/gm, '\n\n')
    .replace(/^\s*\s\s*/m, '')
}

export const Sample = ({
  input,
  output,
  special,
  children,
  lang,
  ...props
}) => (
  <div>
    {input && (
      <Code
        special={special}
        lang={lang}
        bgColor={config.theme.clr.highlight}
      >{`// input\n\n${formatCode(input)}`}</Code>
    )}
    {output && (
      <Code
        special={special}
        lang="none"
        bgColor={config.theme.clr.secondaryHighlight}
      >{`// output\n\n${formatCode(output)}`}</Code>
    )}
    {children && (
      <Code special={special} lang={lang}>
        {formatCode(children)}
      </Code>
    )}
  </div>
)
