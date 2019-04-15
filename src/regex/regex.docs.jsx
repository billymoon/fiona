import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Regex
      </span>
    }
  >
    <p>
      A very general use, seeded utility to generate a string that matches a
      supplied regular expression. It uses the{' '}
      <a href="http://npmjs.org/packages/randexp">randexp</a> library to expand
      expressions, seeded by the instance of Fiona.
    </p>

    <Sample
      input={`
    Fiona(${seed}).regex(/[01]{8} (ro|cy)bo(rg|t)s/)
    `}
      output={`
    ${Fiona(seed).regex(/[01]{8} (ro|cy)bo(rg|t)s/)}
    `}
    />

    <p>
      When recursing objects, strings and arrays, any regex that's found will be{' '}
    </p>

    <Sample
      input={`
    Fiona(${seed}).object({ army: /[01]{8} (ro|cy)bo(rg|t)s/, luckyNumber: Fiona.Number({ max: 10 }) })
    `}
      output={`
    ${Fiona(seed).json({
      army: /[01]{8} (ro|cy)bo(rg|t)s/,
      luckyNumber: Fiona.Number({ max: 10 })
    })}
    `}
    />

    <Sample
      input={`
    Fiona(${seed}).string\`There is an army of \${/[01]{8} (ro|cy)bo(rg|t)s/} on their way!\`
    `}
      output={`
    ${Fiona(seed)
      .string`There is an army of ${/[01]{8} (ro|cy)bo(rg|t)s/} on their way!`}
    `}
    />

    <Sample
      input={`
    Fiona(${seed}).array(3, /[01]{8} (ro|cy)bo(rg|t)s/)
    `}
      output={`
    ${JSON.stringify(Fiona(seed).array(3, /[01]{8} (ro|cy)bo(rg|t)s/))}
    `}
    />

    <p>
      <b>n.b.</b> the regex method is only available on the main Fiona package
      and is not avaliable on the Fiona core package which focusses on being
      very light so does not include the external libraries required to expand
      regular expressions.
    </p>
  </ApiSection>
)

export default consume(Section)
