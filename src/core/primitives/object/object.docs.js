import { fiona, consume, ApiSection, Sample } from "../../../../docs/app";

const Section = ({ seed }) => (
  <span>
    <ApiSection
      heading={
        <span>
          <small>fiona.</small>
          Object
        </span>
      }
    >
      <p>
        A method that recurses a passed data structure to resolve it's values.
      </p>

      <Sample
        input={`
        fiona(${seed}).object({
          fullname: fiona.Fullname,
          age: fiona.Number({ max: 100 }),
          luckyNumber: seeded => seeded.number({ max: 10 })
        })
        `}
        output={`\n${JSON.stringify(
          fiona(seed).object({
            fullname: fiona.Fullname,
            age: fiona.Number({ max: 100 }),
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
        fiona(${seed}).object({
          luckyNumber: seeded => seeded.number({ max: 10 }),
          unluckyNumber: seeded => 10 - seeded.data
        })
        `}
        output={`\n${JSON.stringify(
          fiona(seed).object({
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
        fiona(${seed}).object({
            name: {
              gender: fiona.Gender,
              title: seeded => seeded.title({ gender: seeded.data.name.gender }),
              firstname: seeded => seeded.firstname({ gender: seeded.data.name.gender }),
              middlenames: seeded => seeded.array(3, fiona.Firstname({ gender: seeded.data.name.gender }), ' '),
              lastname: seeded => seeded.surname({ gender: seeded.data.name.gender })
            }
        })
        `}
        output={`\n${JSON.stringify(
          fiona(seed).object({
            name: {
              gender: fiona.Gender,
              title: seeded =>
                seeded.title({ gender: seeded.data.name.gender }),
              firstname: seeded =>
                seeded.firstname({ gender: seeded.data.name.gender }),
              middlenames: seeded =>
                seeded.array(
                  3,
                  fiona.Firstname({ gender: seeded.data.name.gender }),
                  " "
                ),
              lastname: seeded =>
                seeded.surname({ gender: seeded.data.name.gender })
            },
            age: fiona.Number({ max: 100 })
          }),
          null,
          2
        )}`}
      />
    </ApiSection>
  </span>
);

export default consume(Section);
