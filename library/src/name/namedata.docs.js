import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const originalNameData = JSON.parse(JSON.stringify(Fiona.namedata))

const customNamaData = () => {
  Object.assign(Fiona.namedata, {
    male: {
      firstname: ['Austin', 'Ambrose', 'Andre', 'Arturo'],
      title: ['Lord', 'Baron', 'Count']
    },
    female: {
      firstname: ['Antonietta', 'Antonina', 'Marian', 'Antonetta'],
      title: ['Madam', 'Madame', 'Maid']
    }
  })
}

const defaultNamaData = () => {
  Object.assign(Fiona.namedata, {
    male: originalNameData.male,
    female: originalNameData.female
  })
}

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>namedata
      </span>
    }
  >
    <p>
      The data used to generate names and salutations is exposed as{' '}
      <code>Fiona.namedata</code> which can be inspected, and modified. The data
      is based on Scottish census records and is structured like this sample:
    </p>

    <Sample>{`
    Fiona.namedata = {
      male: {
        firstname: ['Jack', 'James', /* etc... */ 'Hunter', 'Zachary'],
        title: ['Mr', 'Dr', 'Sir', 'Lord']
      },
      female: {
        firstname: ['Fiona', 'Aria', 'Mia', /* etc... */ 'Matilda', 'Lauren'],
        title: ['Miss', 'Mrs', 'Dr', 'Ms', 'Dame']
      },
      lastname: ['Moon', 'Smith', 'Brown', /* etc... */ 'Mitchell', 'Fraser']
    }
    `}</Sample>

    <p>
      To change the namedata, you can assign new values to the properties of{' '}
      <code>Fiona.namedata</code> but not the object itself.
    </p>

    <Sample
      input={`
    Fiona(${seed}).fullname()

    Object.assign(Fiona.namedata, {
      male: {
        firstname: ['Austin', 'Ambrose', 'Andre', 'Arturo'],
        title: ['Lord', 'Baron', 'Count']
      },
      female: {
        firstname: ['Antonietta', 'Antonina', 'Marian', 'Antonetta'],
        title: ['Madam', 'Madame', 'Maid']
      }
    })

    Fiona(${seed}).fullname()
    `}
      output={`
    ${Fiona(seed).fullname()}
    ${customNamaData() || ''}${Fiona(seed).fullname()}${defaultNamaData() || ''}
    `}
    />
  </ApiSection>
)

export default consume(Section)
