import Link from 'next/link'
import { withRouter } from 'next/router'

import { withTheme } from '../app'

const ButtonLink = withTheme(({ href, selected, label, theme, ...props }) =>
  <div>
    <Link prefetch href={href}><a className={['action-button'].concat(selected ? ['selected'] : []).join(' ')}>{label}</a></Link>
    <style jsx>{`
    .animate {
      transition: all 0.05s;
      -webkit-transition: all 0.05s;
    }

    .action-button {
      padding: 10px 0px;
      width: 100%;
      position: relative;
      margin: 0px 10px 10px 0px;
      float: left;
      border-radius: 10px;
      font-family: Tangerine, cursive;
      font-size: 25px;
      text-decoration: none;
      color: ${theme.clr.primary};
      background-color: ${theme.clr.accent};
      border-bottom: 5px solid ${theme.clr.primary};
      text-shadow: 0px -2px ${theme.clr.white};
    }

    .action-button.selected {
      color: ${theme.clr.secondary};
      background-color: ${theme.clr.secondaryAccent};
      border-bottom: 5px solid ${theme.clr.secondary};
      text-shadow: 0px -2px ${theme.clr.white};
    }

    .action-button:active {
      border-bottom: 1px solid;
      margin-top: 4px;
    }

    @media screen and (min-width: 768px) {
      .action-button {
        padding: 10px 40px;
        width: auto;
      }
      
      .action-button:active {
        transform: translate(0px, 4px);
        -webkit-transform: translate(0px, 4px);
        margin-top: 0px;
      }
    }
  `}</style>
  </div>
)

// TODO: simpify and tidy this section, perhaps this whole nav file
const Nav = ({ router }) =>
  <div>
    <ButtonLink label='Overview' selected={router.pathname === '/'} href='/' />
    <ButtonLink label='API' selected={router.pathname === '/api'} href='/api' />
    <ButtonLink label='Examples' selected={router.pathname === '/examples'} href='/examples' />
  </div>

export default withRouter(Nav)
