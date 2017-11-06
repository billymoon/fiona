import Head from 'next/head'
import { provideState, injectState } from 'freactal'

import { Config, Theme, mergeDeep } from '../components'
import defaultConfig from './config'

// export default ({ children }) => <div>{children}</div>

const Main = injectState(({ children, state: { theme } }) =>
  <div>
    {children}
    <style global jsx>{`
      body {
        margin: 0;
        padding: 0;
        color: ${theme.fg};
        background-color: ${theme.bg};
        font-family: ${theme.fontFamily};
      }
    `}</style>
  </div>
)

export default provideState({ initialState: () => ({ auth: false }) })(({ url, config, children }) =>
  <Config config={mergeDeep({}, defaultConfig, config)}>
    <Head>
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
