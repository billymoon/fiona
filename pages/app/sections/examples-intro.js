import React from 'react'
import { injectState } from 'freactal'

import { ExamplesTemplateString, ExamplesTemplatePlugin } from './'

const Section = ({ state: { seed } }) =>
  <section>
    <h2>Examples</h2>
    <ExamplesTemplateString />
    <ExamplesTemplatePlugin />
  </section>

export default injectState(Section)
