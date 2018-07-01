import Head from 'next/head'
import { withRouter } from 'next/router'

import { Theme, Ribbon, withTheme } from '../components'
import { Shelf, Article } from '../app'
import { Logo, Nav, fiona, injectState, config, fonts } from './'

const MainContent = withTheme(withRouter(({ router, seed, theme, children }) =>
  <section>
    <Ribbon href='https://github.com/billymoon/fiona' color={theme.clr.primary} breakAt768 />
    <Article style={{ textAlign: 'center' }}><Logo /></Article>
    <Article style={{ textAlign: 'center' }}><h1>{fiona(seed).regex(/(The )?(Seeded )?((Pseudo )?Random )?Data Generator/)}</h1></Article>
    <Article style={{ textAlign: 'center' }}><Nav /></Article>
    <style global jsx>{fonts}</style>
    <style global jsx>{`
      html {
        background-color: ${theme.clr.accent};
      }

      body {
        margin: 0;
        padding: 0 0 5em 0;
        color: ${theme.fg};
        background-color: ${theme.bg};
        font-family: 'Gentium Basic', serif;
        font-size: 17px;

        background: -moz-linear-gradient(top, ${theme.clr.accent} 0, ${theme.bg} 160px);
        background: -webkit-linear-gradient(top, ${theme.clr.accent} 0,${theme.bg} 160px);
        background: linear-gradient(to bottom, ${theme.clr.accent} 0,${theme.bg} 160px);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${theme.clr.accent}', endColorstr='${theme.bg}',GradientType=0 );
      }

      code {
        color: ${theme.clr.secondary};
        font-family: Menlo,Monaco,Lucida Console,Liberation Mono, DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace, serif;
        font-size: 14px;
      }

      code.secondary {
        color: ${theme.clr.light};
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: Tangerine, cursive;
        color: ${theme.clr.primary};
        font-weight: bold;
        margin-bottom: 10px;
      }

      h1 small, h2 small, h3 small, h4 small, h5 small, h6 small {
        color: ${theme.clr.light};
        font-size: 0.75em;
      }

      h1 { font-size: 48px; margin-top: 0px; margin-bottom: 20px; }
      h2 { font-size: 40px; }
      h3 { font-size: 36px; }
      h4 { font-size: 30px; }
      h5 { font-size: 24px; }
      h6 { font-size: 20px; }
    `}</style>
    {children}
  </section>
))

// TODO: simpify and tidy this section, perhaps this whole layout file
const MainLayout = ({ state: { seed }, children }) =>
  <div>
    <Head>
      <title>Fiona</title>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <link rel='icon' href='/static/favicon.png' sizes='16x16' type='image/png' />
      {/*<script src='https://cdn.ravenjs.com/3.26.2/raven.min.js' crossorigin='anonymous'></script>*/}
      {/*<script>Raven.config('https://cbe5f0dcbb0b4d488ca750f1b7f7ac11@sentry.io/1226793').install()</script>*/}
    </Head>
    <Theme.Dynamic config={seed % 2 ? {
      clr: {
        primary: config.theme.clr.secondary,
        accent: config.theme.clr.secondaryAccent,
        secondary: config.theme.clr.primary,
        secondaryAccent: config.theme.clr.accent
      }
    } : {}}>
      <MainContent seed={seed}>
        {children}
      </MainContent>
    </Theme.Dynamic>
  </div>

export default injectState(MainLayout)
