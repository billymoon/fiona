import Head from 'next/head'
import { withRouter } from 'next/router'

import { Ribbon } from 'jsx-components'
import { Theme, Shelf, Article, withTheme } from '../app'
import { Logo, Nav, fiona, injectState, config, consume } from './'

const MainContent = withTheme(withRouter(({ router, seed, theme, toggleBlink, blinkInterval, setBlinkInterval, children }) =>
  <section>
    {process.browser &! blinkInterval && setBlinkInterval(setInterval(toggleBlink, 500)) && '' || ''}
    <Ribbon href='https://github.com/billymoon/fiona' color={theme.clr.primary} />
    <Article style={{ textAlign: 'center' }}><Logo /></Article>
    <Article style={{ textAlign: 'center' }}><h1>{fiona(seed).regex(/(Make Believe|Simulated|Immitation|Substitute|Pretend|Fake|Spurious|Mock) Data/)}</h1></Article>
    <Article style={{ textAlign: 'center' }}><Nav /></Article>
    <style global jsx>{`
      @import url('https://fonts.googleapis.com/css?family=Raleway|Andika|Cousine');
    `}</style>
    <style global jsx>{`
      html {
        background-color: ${theme.clr.accent};
      }

      body {
        margin: 0;
        padding: 0 0 5em 0;
        color: ${theme.fg};
        background-color: ${theme.bg};
        font-family: ${theme.font.body};
        font-size: 17px;

        background: -moz-linear-gradient(top, ${theme.clr.accent} 0, ${theme.bg} 160px);
        background: -webkit-linear-gradient(top, ${theme.clr.accent} 0,${theme.bg} 160px);
        background: linear-gradient(to bottom, ${theme.clr.accent} 0,${theme.bg} 160px);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${theme.clr.accent}', endColorstr='${theme.bg}',GradientType=0 );
      }

      code {
        color: ${theme.clr.secondary};
        font-family: ${theme.font.code};
        font-size: 14px;
      }

      code.secondary {
        color: ${theme.clr.primary};
      }

      .outer {
        margin: 10px -10px;
        padding: 10px;
        border: 1px solid ${theme.clr.light};
        background-color: ${theme.clr.highlight};
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: ${theme.font.heading};
        color: ${theme.clr.primary};
        font-weight: normal;
        margin-bottom: 10px;
        margin-top: 10px;
      }

      h1 small, h2 small, h3 small, h4 small, h5 small, h6 small {
        color: ${theme.clr.light};
        font-size: 0.75em;
      }

      h1 { font-size: 40px; margin-top: 0px; margin-bottom: 10px; }
      h2 { font-size: 32px; }
      h3 { font-size: 24px; }
      h4 { font-size: 22px; }
      h5 { font-size: 18px; }
      h6 { font-size: 16px; }      
      @media screen and (min-width: 768px) {
        h1 { margin-top: 20px; margin-bottom: 40px; }
      }
    `}</style>
    {children}
  </section>
))

// TODO: simpify and tidy this section, perhaps this whole layout file
// TODO: re-implement dynamic theme switcher
const MainLayout = ({ seed, children }) =>
  <div>
    <Head>
      <title>Fiona</title>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <link rel='icon' href='/static/favicon.png' sizes='16x16' type='image/png' />
      {/* TODO: re-enable error tracking if can disable locally
      <script src='https://cdn.ravenjs.com/3.26.2/raven.min.js' crossorigin='anonymous'></script>
      <script>Raven.config('https://cbe5f0dcbb0b4d488ca750f1b7f7ac11@sentry.io/1226793').install()</script>
      */}
    </Head>    
    <MainContent seed={seed}>
      {children}
    </MainContent>
  </div>

export default consume(MainLayout)
