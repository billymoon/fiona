import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Duplicable
      </span>
    }
  >
    <p>
      A seeded utility to help to produce duplicated data sometimes. By default,
      the seed will be picked from a pool of 10 possibilities, 10 per cent of
      the time.
    </p>

    <p>
      In this example, the pool is 2, and the frequency is <b>0.6</b> so the
      numbers will be <b>373260</b> or <b>153925</b>, 60% of the time, and the
      other numbers will be pseudo random according to the input seed.
    </p>

    <Sample
      input={`
    Fiona(${seed}).duplicable({ frequency: 0.6, pool: 2 }).number()
    Fiona(${seed + 1}).duplicable({ frequency: 0.6, pool: 2 }).number()
    Fiona(${seed + 2}).duplicable({ frequency: 0.6, pool: 2 }).number()
    Fiona(${seed + 3}).duplicable({ frequency: 0.6, pool: 2 }).number()
    Fiona(${seed + 4}).duplicable({ frequency: 0.6, pool: 2 }).number()
    Fiona(${seed + 5}).duplicable({ frequency: 0.6, pool: 2 }).number()
    Fiona(${seed + 6}).duplicable({ frequency: 0.6, pool: 2 }).number()
    Fiona(${seed + 7}).duplicable({ frequency: 0.6, pool: 2 }).number()
    Fiona(${seed + 8}).duplicable({ frequency: 0.6, pool: 2 }).number()
    Fiona(${seed + 9}).duplicable({ frequency: 0.6, pool: 2 }).number()
    Fiona(${seed + 10}).duplicable({ frequency: 0.6, pool: 2 }).number()
    `}
      output={`
    ${Fiona(seed)
      .duplicable({ frequency: 0.6, pool: 2 })
      .number()}
    ${Fiona(seed + 1)
      .duplicable({ frequency: 0.6, pool: 2 })
      .number()}
    ${Fiona(seed + 2)
      .duplicable({ frequency: 0.6, pool: 2 })
      .number()}
    ${Fiona(seed + 3)
      .duplicable({ frequency: 0.6, pool: 2 })
      .number()}
    ${Fiona(seed + 4)
      .duplicable({ frequency: 0.6, pool: 2 })
      .number()}
    ${Fiona(seed + 5)
      .duplicable({ frequency: 0.6, pool: 2 })
      .number()}
    ${Fiona(seed + 6)
      .duplicable({ frequency: 0.6, pool: 2 })
      .number()}
    ${Fiona(seed + 7)
      .duplicable({ frequency: 0.6, pool: 2 })
      .number()}
    ${Fiona(seed + 8)
      .duplicable({ frequency: 0.6, pool: 2 })
      .number()}
    ${Fiona(seed + 9)
      .duplicable({ frequency: 0.6, pool: 2 })
      .number()}
    ${Fiona(seed + 10)
      .duplicable({ frequency: 0.6, pool: 2 })
      .number()}
    `}
    />
  </ApiSection>
)

export default consume(Section)
