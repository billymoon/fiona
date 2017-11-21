import React from 'react'
import { injectState, provideState } from 'freactal'
import { mergeDeep } from '..'

const defaults = {
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

export const PureCol = ({ children, state: { theme }, ...props }) => {
  return (
    <div className='grid-col' {...props}>
      {children}
      <style jsx>{`
        box-sizing: border-box;
        margin: 0;
        padding: 0 ${theme.grid.unit}px;
        float: left;
        position: relative;
      `}</style>
      {/* TODO: why can't I dynamically create media queries? */}
      <style jsx>{`
        @media screen and (min-width: ${theme.grid.breakpoints.xs}px) {
          ${queryMapper(props, 'xs')}
        }
        @media screen and (min-width: ${theme.grid.breakpoints.sm}px) {
          ${queryMapper(props, 'sm')}
        }
        @media screen and (min-width: ${theme.grid.breakpoints.md}px) {
          ${queryMapper(props, 'md')}
        }
        @media screen and (min-width: ${theme.grid.breakpoints.lg}px) {
          ${queryMapper(props, 'lg')}
        }
        @media screen and (min-width: ${theme.grid.breakpoints.xl}px) {
          ${queryMapper(props, 'xl')}
        }
        @media screen and (min-width: ${theme.grid.breakpoints.xxl}px) {
          ${queryMapper(props, 'xxl')}
        }
      `}</style>
    </div>
  )
}

export const Col = injectState(PureCol)

Col.defaultProps = {
  xs: 1
}

Col.displayName = 'Col'

export const PureRow = ({ state: { theme }, children, ...props }) => {
  const lastBreakpoint = getLastBreakpoint(theme.grid.breakpoints)
  return (
    <div className='grid-row' {...props}>
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
        ${(theme.grid.equalized && `
        margin: 0 -${2 * theme.grid.unit}px;
        padding: 0 ${1 * theme.grid.unit}px;
        `) || ''}
        ${(!theme.grid.equalized && `
        margin: 0 -${1 * theme.grid.unit}px;
        padding: 0;
        `) || ''}
      `}</style>
      <style jsx>{`
        @media screen and (min-width: ${lastBreakpoint}px) {
          ${(theme.grid.fluidish && `
          max-width: ${lastBreakpoint}px;
          margin: auto;
          ${(theme.grid.equalized && `
          padding: 0 ${1 * theme.grid.unit}px;
          `) || ''}
          `) || ''}
        }
      `}</style>
      {/* TODO: how to better handle nested rows/cols? */}
      <style global jsx>{`
        .grid-col .grid-row {
          margin: 0 -${1 * theme.grid.unit}px;
          padding: 0;
        }
      `}</style>
    </div>
  )
}

export const Row = injectState(PureRow)

Row.displayName = 'Row'

export const PureContainer = ({ state: { theme }, children, ...props }) =>
  <div {...props}>
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
      padding: 0 ${(theme.grid.equalized ? 2 : 1) * theme.grid.unit}px;
    `}</style>
  </div>

export const Container = provideState({ initialState: (props, { freactal }) => ({
  theme: mergeDeep({}, { grid: defaults }, freactal.state.theme)
}) })(injectState(PureContainer))

Container.displayName = 'Container'
