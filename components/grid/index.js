export const gridDefaults = {
  equalized: true,
  unit: 15,
  fluidish: true,
  breakpoints: { xs: 0, sm: 768, md: 992, lg: 1200, xl: 1200, xxl: 1200 }
}

const getLastBreakpoint = breakpoints => {
  const breakpointNames = Object.keys(breakpoints)
  return breakpoints[breakpointNames[breakpointNames.length - 1]]
}

const queryMapper = (props, name) => `
  ${(props[name] && `width: ${props[name] * 100}%;`) || ''}
  ${(props['offset-' + name] && `
  margin-left: ${props['offset-' + name] * 100}%;
  `) || ''}
  ${(props['push-' + name] && `
  left: ${props['push-' + name] * 100}%;
  `) || ''}
  ${(props['pull-' + name] && `
  right: ${props['pull-' + name] * 100}%;
  `) || ''}
`

export const Col = ({ config = gridDefaults, children, style, ...props }) =>
  <div className='grid-col' style={style}>
    {children}
    <style jsx>{`
      box-sizing: border-box;
      margin: 0;
      padding: 0 ${config.unit}px;
      float: left;
      position: relative;
    `}</style>
    <style jsx>{`
      @media screen and (min-width: ${config.breakpoints.xs}px) {
        ${queryMapper(props, 'xs')}
      }
      @media screen and (min-width: ${config.breakpoints.sm}px) {
        ${queryMapper(props, 'sm')}
      }
      @media screen and (min-width: ${config.breakpoints.md}px) {
        ${queryMapper(props, 'md')}
      }
      @media screen and (min-width: ${config.breakpoints.lg}px) {
        ${queryMapper(props, 'lg')}
      }
      @media screen and (min-width: ${config.breakpoints.xl}px) {
        ${queryMapper(props, 'xl')}
      }
      @media screen and (min-width: ${config.breakpoints.xxl}px) {
        ${queryMapper(props, 'xxl')}
      }
    `}</style>
  </div>

Col.defaultProps = {
  xs: 1
}

Col.displayName = 'Col'

export const Row = ({ config = gridDefaults, children, style }) => {
  const lastBreakpoint = getLastBreakpoint(config.breakpoints)
  return (
    <div className='grid-row' style={style}>
      {children}
      <style jsx>{`
        :before, :after {
          box-sizing: border-box;
          content: " ";
          display: table;
        }
        :after {
          clear: both;
        }
        ${(config.equalized && `
        margin: 0 -${2 * config.unit}px;
        padding: 0 ${1 * config.unit}px;
        `) || ''}
        ${(!config.equalized && `
        margin: 0 -${1 * config.unit}px;
        padding: 0;
        `) || ''}
      `}</style>
      <style jsx>{`
        @media screen and (min-width: ${lastBreakpoint}px) {
          ${(config.fluidish && `
          max-width: ${lastBreakpoint}px;
          margin: auto;
          ${(config.equalized && `
          padding: 0 ${1 * config.unit}px;
          `) || ''}
          `) || ''}
        }
      `}</style>
      {/* TODO: how to better handle nested rows/cols? */}
      <style global jsx>{`
        .grid-col .grid-row {
          margin: 0 -${1 * config.unit}px;
          padding: 0;
        }
      `}</style>
    </div>
  )
}

Row.displayName = 'Row'

export const Container = ({ config = gridDefaults, children, style }) =>
  <div style={style}>
    {children}
    <style jsx>{`
      :before, :after {
        box-sizing: border-box;
        content: " ";
        display: table;
      }
      :after {
        clear: both;
      }
      margin: 0;
      padding: 0 ${(config.equalized ? 2 : 1) * config.unit}px;
    `}</style>
  </div>

Container.displayName = 'Container'
