import { fiona, consume, ApiSection, Sample } from '../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.</small>Regex</span>}>
    <p>A very general use, seeded utility to generate a string that matches a supplied regular expression. It uses the <a href='http://npmjs.org/packages/randexp'>randexp</a> library to expand expressions, seeded by the instance of fiona.</p>

    <Sample input={`
    fiona(${seed}).regex(/[01]{8} (ro|cy)bo(rg|t)s/)
    `} output={`
    ${fiona(seed).regex(/[01]{8} (ro|cy)bo(rg|t)s/)}
    `} />

    <p>When recursing objects, strings and arrays, any regex that's found will be </p>

    <Sample input={`
    fiona(${seed}).object({ army: /[01]{8} (ro|cy)bo(rg|t)s/, luckyNumber: fiona.Number({ max: 10 }) })
    `} output={`
    ${fiona(seed).json({ army: /[01]{8} (ro|cy)bo(rg|t)s/, luckyNumber: fiona.Number({ max: 10 }) })}
    `} />

    <Sample input={`
    fiona(${seed}).string\`There is an army of \${/[01]{8} (ro|cy)bo(rg|t)s/} on their way!\`
    `} output={`
    ${fiona(seed).string`There is an army of ${/[01]{8} (ro|cy)bo(rg|t)s/} on their way!`}
    `} />

    <Sample input={`
    fiona(${seed}).array(3, /[01]{8} (ro|cy)bo(rg|t)s/)
    `} output={`
    ${JSON.stringify(fiona(seed).array(3, /[01]{8} (ro|cy)bo(rg|t)s/))}
    `} />

    <p><b>n.b.</b> the regex method is only available on the main fiona package and is not avaliable on the fiona core package which focusses on being very light so does not include the external libraries required to expand regular expressions.</p>
  </ApiSection>

export default consume(Section)
