import { Fiona, consume, ApiSection, Sample } from '../../../../docs/app'

const Section = ({ seed }) => (
  <span>
    <ApiSection
      heading={
        <span>
          <small>Fiona.</small>
          Object
        </span>
      }
    >
      <p>
        A method that recurses a passed data structure to resolve it's values.
      </p>

      <Sample
        input={`
        Fiona(${seed}).object({
          fullname: Fiona.Fullname,
          age: Fiona.Number({ max: 100 }),
          luckyNumber: seeded => seeded.number({ max: 10 })
        })
        `}
        output={`\n${JSON.stringify(
          Fiona(seed).object({
            fullname: Fiona.Fullname,
            age: Fiona.Number({ max: 100 }),
            luckyNumber: seeded => seeded.number({ max: 10 })
          }),
          null,
          2
        )}`}
      />

      <p>
        Data from prior values can be accessed on <code>data</code> attribute of
        seeded value passed to function values.
      </p>

      <Sample
        input={`
        Fiona(${seed}).object({
          luckyNumber: seeded => seeded.number({ max: 10 }),
          unluckyNumber: seeded => 10 - seeded.data
        })
        `}
        output={`\n${JSON.stringify(
          Fiona(seed).object({
            luckyNumber: seeded => seeded.number({ max: 10 }),
            unluckyNumber: seeded => 10 - seeded.data.luckyNumber
          }),
          null,
          2
        )}`}
      />

      <p>Objects can be nested</p>

      <Sample
        input={`
        Fiona(${seed}).object({
            name: {
              gender: Fiona.Gender,
              title: seeded => seeded.title({ gender: seeded.data.name.gender }),
              firstname: seeded => seeded.firstname({ gender: seeded.data.name.gender }),
              middlenames: seeded => seeded.array(3, Fiona.Firstname({ gender: seeded.data.name.gender }), ' '),
              lastname: seeded => seeded.surname({ gender: seeded.data.name.gender })
            }
        })
        `}
        output={`\n${JSON.stringify(
          Fiona(seed).object({
            name: {
              gender: Fiona.Gender,
              title: seeded =>
                seeded.title({ gender: seeded.data.name.gender }),
              firstname: seeded =>
                seeded.firstname({ gender: seeded.data.name.gender }),
              middlenames: seeded =>
                seeded.array(
                  3,
                  Fiona.Firstname({ gender: seeded.data.name.gender }),
                  ' '
                ),
              lastname: seeded =>
                seeded.surname({ gender: seeded.data.name.gender })
            },
            age: Fiona.Number({ max: 100 })
          }),
          null,
          2
        )}`}
      />
    </ApiSection>
  </span>
)

export default consume(Section)
