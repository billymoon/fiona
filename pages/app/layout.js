import Head from 'next/head'
import { provideState, injectState } from 'freactal'

import { Config, Theme, mergeDeep } from '../components'
import defaultConfig from './config'

const Main = injectState(({ state: { theme }, children }) =>
  <div>
    {children}
    <style global jsx>{`
      @font-face {
        font-family: 'Tangerine';
        font-style: normal;
        font-weight: 700;
        src: local('Tangerine Bold'), local('Tangerine-Bold'), url(static/Tangerine-Bold.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }
      @font-face {
        font-family: 'Gentium Basic';
        font-style: italic;
        font-weight: 400;
        src: local('Gentium Basic Italic'), local('GentiumBasic-Italic'), url(static/qoFz4NSMaYC2UmsMAG3lyT3CkWnOatWqbxbsW-lx0RI.woff2) format('woff2');
        unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
      }
      @font-face {
        font-family: 'Gentium Basic';
        font-style: italic;
        font-weight: 400;
        src: local('Gentium Basic Italic'), local('GentiumBasic-Italic'), url(static/qoFz4NSMaYC2UmsMAG3lyfW6l725fX_gAamouZ3UJkI.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }
      @font-face {
        font-family: 'Gentium Basic';
        font-style: normal;
        font-weight: 400;
        src: local('Gentium Basic'), local('GentiumBasic'), url(static/KCktj43blvLkhOTolFn-MV1kloJpB9ltLGZVEjypZuA.woff2) format('woff2');
        unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
      }
      @font-face {
        font-family: 'Gentium Basic';
        font-style: normal;
        font-weight: 400;
        src: local('Gentium Basic'), local('GentiumBasic'), url(static/KCktj43blvLkhOTolFn-MQgYcthoNQJTwaSsmU2sQE0.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }
      @font-face {
        font-family: 'Gentium Basic';
        font-style: normal;
        font-weight: 700;
        src: local('Gentium Basic Bold'), local('GentiumBasic-Bold'), url(static/2qL6yulgGf0wwgOp-UqGyG2GhMM5yOiPnWVIa_KtDmE.woff2) format('woff2');
        unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
      }
      @font-face {
        font-family: 'Gentium Basic';
        font-style: normal;
        font-weight: 700;
        src: local('Gentium Basic Bold'), local('GentiumBasic-Bold'), url(static/2qL6yulgGf0wwgOp-UqGyFc83mKf7Tja_b7RWIVSP7Q.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }

      body {
        margin: 0;
        padding: 0;
        color: ${theme.fg};
        background-color: ${theme.bg};
        font-family: 'Gentium Basic', serif;
        font-size: 17px;

        // background: #ffe0fc;
        background: -moz-linear-gradient(top, #ffe0fc 0, ${theme.bg} 160px);
        background: -webkit-linear-gradient(top, #ffe0fc 0,${theme.bg} 160px);
        background: linear-gradient(to bottom, #ffe0fc 0,${theme.bg} 160px);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffe0fc', endColorstr='${theme.bg}',GradientType=0 );
      }

      code {
        color: ${theme.clr.primary};
        font-family: Menlo,Monaco,Lucida Console,Liberation Mono, DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace, serif;
        font-size: 14px;
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: Tangerine, cursive;
        color: ${theme.clr.secondary};
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
  </div>
)

export default provideState({ initialState: () => ({ auth: false }) })(({ url, config, children }) =>
  <Config config={mergeDeep({}, defaultConfig, config)}>
    <Head>
      <title>Fiona</title>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <link rel='icon' href='/static/favicon.png' sizes='16x16' type='image/png' />
    </Head>
    <Theme.Default>
      <Main>
        {children}
      </Main>
    </Theme.Default>
  </Config>
)
