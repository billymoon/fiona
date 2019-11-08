import Link from 'next/link'
import { withRouter } from 'next/router'

import { withTheme, config, withNav } from '../app'

const radius = 6
const underline = 3
const underlinePressed = 1

const Menu = ({ closed }) => (
  <div className="menu">
    <div className="wrap">
      <div className="line top" />
      <div className="line bottom" />
    </div>
    <style jsx>{`
      .menu {
        display: flex;
        width: 40px;
        height: 40px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        transition: transform 0.2s ease;
        fill: #000;
      }

      .wrap {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      .line {
        height: 2px;
        width: 22px;
        transition: transform 0.15s ease;
      }

      .line.top {
        background-color: #d24188;
        transform: ${closed
          ? `translateY(-4px) rotate(0deg)`
          : `translateY(2px) rotate(45deg)`};
      }

      .line.bottom {
        background-color: #5056a9;
        transform: ${closed
          ? `translateY(4px) rotate(0deg)`
          : `translateY(0px) rotate(-45deg)`};
      }
    `}</style>
  </div>
)

const ButtonLink = withTheme(({ href, selected, label, theme, ...props }) => (
  <div>
    <Link prefetch href={href}>
      <a
        className={['action-button']
          .concat(selected ? ['selected'] : [])
          .join(' ')}
      >
        {label}
      </a>
    </Link>
    <style jsx>{`
      .animate {
        transition: all 0.05s;
        -webkit-transition: all 0.05s;
      }

      .action-button {
        padding: ${radius}px 0px;
        width: 100%;
        position: relative;
        margin: 0px 10px 10px 0px;
        float: left;
        border-radius: ${radius}px;
        font-family: ${theme.font.heading};
        font-size: 16px;
        text-decoration: none;
        color: ${theme.clr.primary};
        background-color: ${theme.clr.accent};
        box-shadow: 0px 1px 1px 0px ${theme.clr.accent},
          0px 1px 1px 0px #00000066;
      }

      .action-button:hover {
        box-shadow: 0px 3px 3px 0px ${theme.clr.accent},
          0px 3px 3px 0px #00000066;
      }

      .action-button:active {
        box-shadow: 0px 2px 2px 0px ${theme.clr.accent},
          0px 2px 2px 0px #00000066;
      }

      .action-button.selected {
        color: ${theme.clr.secondary};
        background-color: ${theme.clr.secondaryAccent};
        box-shadow: 0px 2px 2px 0px ${theme.clr.secondaryAccent},
          0px 2px 2px 0px #00000066;
      }

      .action-button.selected:active {
        box-shadow: 0px 2px 2px 0px ${theme.clr.secondaryAccent},
          0px 2px 2px 0px #00000066;
      }

      @media screen and (min-width: ${config.theme.grid.breakpoints.sm}px) {
        .action-button {
          padding: ${radius}px 20px;
          width: auto;
        }

        .action-button:active {
          margin-top: 0px;
        }
      }
    `}</style>
  </div>
))

const getHeading = pathname => {
  if (pathname === '/') {
    return 'Overview'
  } else if (pathname.match(/^\/api(\/|$)/)) {
    return 'API'
  } else if (pathname.match(/^\/examples(\/|$)/)) {
    return 'Examples'
  }
}

// TODO: simpify and tidy this section, perhaps this whole nav file
const Nav = ({ router, closed, toggleNav }) => (
  <div>
    <div className="menu-toggle">
      <h4 style={{ margin: 0 }}>{getHeading(router.pathname)}</h4>
      <a
        href="#"
        onClick={evt => {
          evt.preventDefault()
          toggleNav(!closed)
        }}
      >
        <Menu closed={closed} />
      </a>
    </div>
    <div className="menu-items">
      <ButtonLink
        label="Overview"
        selected={router.pathname === '/'}
        href="/"
      />
      <ButtonLink
        label="API Docs"
        selected={router.pathname.match(/^\/api-docs(\/|$)/)}
        href="/api-docs"
      />
      <ButtonLink
        label="Examples"
        selected={router.pathname.match(/^\/examples(\/|$)/)}
        href="/examples"
      />
    </div>
    <div className="heading-container">
      <h2 style={{ margin: 0 }}>{getHeading(router.pathname)}</h2>
    </div>
    <style jsx>{`
      .menu-items {
        display: ${closed ? 'none' : 'block'};
      }

      .menu-toggle {
        display: flex;
        justify-content: space-between;
      }

      .heading-container {
        clear: both;
        display: none;
        text-align: left;
      }

      @media screen and (min-width: ${config.theme.grid.breakpoints.sm}px) {
        .heading-container {
          display: block;
        }

        .menu-items {
          display: block;
        }

        .menu-toggle {
          display: none;
        }
      }
    `}</style>
  </div>
)

export default withRouter(withNav(Nav))
